import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini API client on the server
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // Real-time tracking API endpoint
  app.post('/api/track', async (req, res) => {
    const { trackingId } = req.body;
    if (!trackingId) {
      return res.status(400).json({ error: 'Tracking ID is required' });
    }
    const tid = trackingId.trim().toUpperCase();

    try {
      console.log(`[Server] Real-world tracking request received for: ${tid}`);

      if (!process.env.GEMINI_API_KEY) {
        console.warn('[Server] GEMINI_API_KEY environment variable is not configured. Falling back to simulated tracking.');
        return res.json({ 
          realWorldFound: false,
          trackingId: tid
        });
      }

      const prompt = `Perform a Google Search to track the real-world tracking number: "${tid}".
Identify the carrier (such as DHL, FedEx, UPS, USPS, Maersk, MSC, CMA CGM, Hapag-Lloyd, or any other carrier) and find the actual, current tracking status of this shipment on the web.
Extract the following details:
1. Origin (city, country or port)
2. Destination (city, country or port)
3. Estimated or actual delivery date (format: "Month DD, YYYY")
4. Total cargo weight (if available, e.g., "15,250 KG", or "Unknown")
5. Service type (e.g., "Express Air Cargo", "Ocean Container Freight", "Standard Parcel")
6. Current status (choose one of: "Shipment Booked", "Processing", "In Transit", "Pending", "Customs Clearance", "Out for Delivery", "Delivered")
7. Customer Name or Recipient (if available, otherwise make a plausible commercial one or "Import Operations Manager")
8. Shipment Reference (a unique reference number or the tracking ID)
9. Freight Type (choose one of: "Air Freight", "Sea Freight", "Road Freight" based on the carrier/route)
10. Number of packages (if available, e.g., 1 or 12)
11. Container number or flight/vehicle info (if available)
12. Current location of the shipment
13. Milestones: list chronological milestones representing the cargo journey (from pickup, transit, through delivery) with fields: status, date, location, description, and completed (true/false).
14. History: list reverse-chronological detailed status logs with fields: date, location, status, updatedBy.

If you cannot find ANY real-world tracking information on the web for the tracking number "${tid}", you MUST set the field "realWorldFound" to false. In this case, do NOT make up fake search results; simply return a JSON indicating realWorldFound is false.
Otherwise, set "realWorldFound" to true, and populate all the fields with the real search data you found. Make sure all dates and locations match what was returned in the search results.`;

      const responseSchema = {
        type: Type.OBJECT,
        properties: {
          realWorldFound: {
            type: Type.BOOLEAN,
            description: 'Whether a real-world tracking result was found for this tracking ID on the web.'
          },
          carrierName: {
            type: Type.STRING,
            description: 'The name of the detected shipping carrier (e.g., DHL, FedEx, UPS, Maersk, etc.).'
          },
          trackingId: {
            type: Type.STRING,
            description: 'The requested tracking ID.'
          },
          origin: {
            type: Type.STRING,
            description: 'The place of origin.'
          },
          destination: {
            type: Type.STRING,
            description: 'The destination location.'
          },
          estimatedDelivery: {
            type: Type.STRING,
            description: 'Estimated delivery or arrival date, formatted nicely (e.g., "July 14, 2026").'
          },
          weight: {
            type: Type.STRING,
            description: 'The weight of the shipment.'
          },
          service: {
            type: Type.STRING,
            description: 'The type of service.'
          },
          status: {
            type: Type.STRING,
            description: 'Must be one of: "Shipment Booked", "Processing", "In Transit", "Pending", "Customs Clearance", "Out for Delivery", "Delivered".'
          },
          customerName: {
            type: Type.STRING,
            description: 'The name of the customer, consignee, or importer.'
          },
          shipmentReference: {
            type: Type.STRING,
            description: 'A unique shipment reference code.'
          },
          freightType: {
            type: Type.STRING,
            description: 'Must be one of: "Air Freight", "Sea Freight", "Road Freight".'
          },
          numPackages: {
            type: Type.INTEGER,
            description: 'Number of packages in this cargo shipment.'
          },
          containerNo: {
            type: Type.STRING,
            description: 'The container number or flight/vehicle ID if available.'
          },
          bookingDate: {
            type: Type.STRING,
            description: 'Date when shipment was booked.'
          },
          estimatedArrivalDate: {
            type: Type.STRING,
            description: 'Estimated arrival date.'
          },
          currentLocation: {
            type: Type.STRING,
            description: 'Current physical or transit location of the shipment.'
          },
          deliveryAddress: {
            type: Type.STRING,
            description: 'The delivery address for final delivery.'
          },
          recipientName: {
            type: Type.STRING,
            description: 'The recipient name or title.'
          },
          signatureRequired: {
            type: Type.STRING,
            description: 'Whether a signature is required upon delivery ("Yes" or "No").'
          },
          milestones: {
            type: Type.ARRAY,
            description: 'Chronological milestones representing the cargo journey.',
            items: {
              type: Type.OBJECT,
              properties: {
                status: { type: Type.STRING },
                date: { type: Type.STRING },
                location: { type: Type.STRING },
                description: { type: Type.STRING },
                completed: { type: Type.BOOLEAN }
              },
              required: ['status', 'date', 'location', 'description', 'completed']
            }
          },
          history: {
            type: Type.ARRAY,
            description: 'Detailed reverse-chronological tracking logs.',
            items: {
              type: Type.OBJECT,
              properties: {
                date: { type: Type.STRING },
                location: { type: Type.STRING },
                status: { type: Type.STRING },
                updatedBy: { type: Type.STRING }
              },
              required: ['date', 'location', 'status', 'updatedBy']
            }
          }
        },
        required: [
          'realWorldFound',
          'trackingId',
          'origin',
          'destination',
          'estimatedDelivery',
          'weight',
          'service',
          'status',
          'customerName',
          'shipmentReference',
          'freightType',
          'numPackages',
          'bookingDate',
          'estimatedArrivalDate',
          'currentLocation',
          'deliveryAddress',
          'recipientName',
          'signatureRequired',
          'milestones',
          'history'
        ]
      };

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
          responseMimeType: 'application/json',
          responseSchema: responseSchema,
          systemInstruction: 'You are an advanced cargo logistics data extraction specialist. Your job is to search the live web for real-world cargo/parcel tracking numbers, parse carrier sites, and extract precise tracking telemetry. If a tracking number is not active or real, you must report it.',
        }
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error('Empty response from Gemini API');
      }

      const trackingData = JSON.parse(responseText);
      return res.json(trackingData);

    } catch (err: any) {
      console.warn('[Server] Tracking API error / quota exceeded, falling back to simulated mode:', err.message || err);
      return res.json({ 
        realWorldFound: false, 
        trackingId: tid 
      });
    }
  });

  // Serve static client assets in production, otherwise route through Vite middleware
  if (process.env.NODE_ENV !== 'production') {
    console.log('[Server] Initializing Vite development middleware...');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    console.log('[Server] Running in PRODUCTION mode.');
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Server] Express server actively listening on port ${PORT}`);
  });
}

startServer();
