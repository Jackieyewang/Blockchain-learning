export function getQueryString(name: string, url: string) {
  const res = (url || location.href).match(new RegExp(`[?&]${name}=([^&#]+)`, 'i'));

  if (res == null || res.length < 1) {
    return null;
  }

  return decodeURIComponent(res[1]);
}

export function setStorage(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}
