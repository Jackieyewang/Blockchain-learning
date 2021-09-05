
export function getDid (): string | null {
  return window.localStorage.getItem('did');
}

export function setDid (did: string): void {
  return window.localStorage.setItem('did', did);
}

export function removeDid (): void {
  window.localStorage.removeItem('did');
}
