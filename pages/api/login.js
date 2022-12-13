import { setCookie } from 'cookies-next';

async function handler(req, res) {
  const { user, session } = req.body;
  setCookie('session_token', session.token, {
    req,
    res,
    maxAge: 60 * 60 * 24 * 365,
    domain: process.env.NEXT_PUBLIC_DOMAIN
  });
  setCookie('user', user, {
    req,
    res,
    maxAge: 60 * 60 * 24 * 365,
    domain: process.env.NEXT_PUBLIC_DOMAIN
  });
  setCookie('session', session, {
    req,
    res,
    maxAge: 60 * 60 * 24 * 365,
    domain: process.env.NEXT_PUBLIC_DOMAIN
  });
  return res.status(200).json({ message: 'ok' });
}
export default handler;
