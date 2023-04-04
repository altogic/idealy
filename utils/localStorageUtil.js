class LocalStorageUtil {
  set = (key, value) => {
    if (window) {
      const jsonValue = JSON.stringify(value);
      window.localStorage.setItem(key, jsonValue);
    }
  };

  get = (key) => {
    if (window) {
      const jsonValue = window.localStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    }
    return null;
  };

  remove = (key) => {
    if (window) {
      window.localStorage.removeItem(key);
    }
  };
}

export default new LocalStorageUtil();
