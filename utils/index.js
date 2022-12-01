export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export async function setSessionCookie(token) {
  fetch('/api/login', {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({ token }),
    headers: { 'Content-Type': 'application/json' }
  });
}
