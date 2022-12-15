import { setCookie } from 'cookies-next';

async function handler(req, res) {
  const { user, session } = req.body;
  setCookie('session_token', session.token, {
    req,
    res,
    domain: 'idealy.io'
  });
  delete user.notifications;
  delete user.savedFilters;
  setCookie('user', user, {
    req,
    res,
    domain: 'idealy.io'
  });
  setCookie('session', session, {
    req,
    res,
    domain: 'idealy.io'
  });
  return res.status(200).json({ message: 'ok' });
}
export default handler;
