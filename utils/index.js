/* eslint-disable no-param-reassign */
/* eslint-disable no-bitwise */
export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export async function setSessionCookie(session, user) {
  console.log(process.env.NEXT_PUBLIC_DOMAIN);
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
export function LightenDarkenColor(col, amt) {
  let usePound = false;

  if (col[0] === '#') {
    col = col.slice(1);
    usePound = true;
  }

  const num = parseInt(col, 16);

  let r = (num >> 16) + amt;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  let b = ((num >> 8) & 0x00ff) + amt;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  let g = (num & 0x0000ff) + amt;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
}
