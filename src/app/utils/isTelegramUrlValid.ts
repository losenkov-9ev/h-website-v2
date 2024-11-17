export function isTelegramUrlValid(url: string): boolean {
  const baseUrl = 'https://t.me/';
  return url.startsWith(baseUrl) && url.length > baseUrl.length;
}
