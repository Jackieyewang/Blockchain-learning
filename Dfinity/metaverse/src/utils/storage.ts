function deserialize(val: any) {
  try {
    return JSON.parse(val);
  } catch (error) {
    console.log(error);
    return val || undefined;
  }
}

function serialize(val: any) {
  return JSON.stringify(val);
}

const store = {
  setItem(key: string, val: any) {
    localStorage.setItem(key, serialize(val));
  },
  getItem(key: string) {
    return deserialize(localStorage.getItem(key));
  },
  removeItem(key: string) {
    localStorage.removeItem(key);
  },
  clear() {
    localStorage.clear();
  },
}

export default store;