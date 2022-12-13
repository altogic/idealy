export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export async function setSessionCookie(session, user) {
  fetch('/api/login', {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({ session, user }),
    headers: { 'Content-Type': 'application/json' }
  });
}
export function randomHexColor() {
  return `#${randomInt(0, 16777214).toString(16)}`;
}
export function generateUrl(link, subdomain = 'app') {
  return `${process.env.NODE_ENV === 'development' ? 'http:' : 'https:'}//${subdomain}.${
    process.env.NEXT_PUBLIC_DOMAIN
  }/${link}`;
}
