type Request = { method?: string };
type Response = { setHeader: (name: string, value: string | string[]) => void; status: (code: number) => Response; json: (body: unknown) => void; end: (body?: string) => void };

export default function handler(req: Request, res: Response) {
  try {
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    if (req.method === 'GET') {
      const data = {
        status: 'Operational',
        message: 'Tanglaw frontend and API are running.',
        timestamp: new Date().toISOString(),
        version: 'FE-04',
      };
      return res.status(200).json(data);
    } else {
      res.setHeader('Allow', ['GET', 'OPTIONS']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Health check failed:', error);
    return res.status(500).json({
      status: 'Error',
      message: 'An error occurred during the health check.',
      timestamp: new Date().toISOString(),
    });
  }
}
