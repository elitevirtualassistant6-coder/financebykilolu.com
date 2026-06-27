import crypto from 'crypto';

// Utility helper to safely hash personal user data using SHA-256 (required by Meta)
function hashValue(value: string): string {
  if (!value) return '';
  const cleaned = value.trim().toLowerCase();
  return crypto.createHash('sha256').update(cleaned).digest('hex');
}

/**
 * Vercel Serverless Function for Meta Conversions API (CAPI) Proxy
 * Handles POST requests to secure user tracking data and proxies to Meta Graph API.
 */
export default async function handler(req: any, res: any) {
  // CORS support
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    const { eventName, email, name, pixelId, accessToken, sourceUrl } = req.body || {};

    // Determine target Meta Pixel ID
    const activePixelId = pixelId || process.env.META_PIXEL_ID || process.env.VITE_META_PIXEL_ID;
    if (!activePixelId) {
      console.warn('[Meta CAPI Serverless] Missing Pixel ID');
      return res.status(400).json({ error: 'Meta Pixel ID is required. Please pass it or set META_PIXEL_ID on Vercel.' });
    }

    // Determine target Conversions API Access Token
    const activeAccessToken = accessToken || process.env.META_CAPI_ACCESS_TOKEN || process.env.META_ACCESS_TOKEN;
    if (!activeAccessToken) {
      console.warn('[Meta CAPI Serverless] Missing Access Token');
      return res.status(400).json({ 
        error: 'Meta Conversions API Access Token is required. Please set META_CAPI_ACCESS_TOKEN on Vercel.' 
      });
    }

    console.log(`[Meta CAPI Serverless] Processing "${eventName || 'Lead'}" event for Pixel: ${activePixelId}`);

    // Parse first name
    const firstName = name ? name.split(' ')[0] : '';

    // Prepare SHA-256 hashed user identifiers
    const hashedEmail = hashValue(email);
    const hashedFirstName = hashValue(firstName);

    // Extract client network parameters
    const clientUserAgent = req.headers['user-agent'] || '';
    const rawIp = (req.headers['x-forwarded-for'] as string) || req.socket?.remoteAddress || '';
    const clientIp = rawIp.split(',')[0].replace(/^::ffff:/, '').trim();

    // Build the Meta event payload
    const payload = {
      data: [
        {
          event_name: eventName || 'Lead',
          event_time: Math.floor(Date.now() / 1000),
          action_source: 'website',
          event_source_url: sourceUrl || 'https://joshua-credit.co.uk/',
          user_data: {
            em: hashedEmail ? [hashedEmail] : [],
            fn: hashedFirstName ? [hashedFirstName] : [],
            client_ip_address: clientIp || undefined,
            client_user_agent: clientUserAgent || undefined
          },
          custom_data: {
            content_name: 'Joshua Credit Masterclass Opt-In',
            status: 'success'
          },
          opt_out: false
        }
      ]
    };

    const metaUrl = `https://graph.facebook.com/v19.0/${activePixelId}/events?access_token=${activeAccessToken}`;
    
    const response = await fetch(metaUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const responseData: any = await response.json();

    if (response.ok) {
      console.log('[Meta CAPI Serverless] Successfully dispatched to Meta:', responseData);
      return res.status(200).json({ success: true, response: responseData });
    } else {
      console.error('[Meta CAPI Serverless] Graph API error response:', responseData);
      return res.status(response.status).json({ 
        success: false, 
        error: responseData.error?.message || 'Meta API request failed' 
      });
    }
  } catch (err: any) {
    console.error('[Meta CAPI Serverless] Critical failure in route:', err);
    return res.status(500).json({ success: false, error: err.message || 'Internal Server Error' });
  }
}