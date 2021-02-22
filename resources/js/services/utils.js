export default {
  select(src, dest, index) {
    _.forEach(src[index], (v, k) => {
      dest[k] = v;
    });
  },

  clear(obj) {
    _.forEach(obj, (v, k) => {
      obj[k] = null;
    });
  },

  replaceBlank(data) {
    _.forEach(data, (k, v) => {
      data[k] = v === "" ? null : v;
    });
    return data;
  },

  replaceClient(data) {
    _.forEach(data, (k, v) => {
      if (k === "phone") {
        data[k] = v.replace(/[^0-9]/g, "");
      }
      data[k] = v === "" ? null : v;
    });
    return data;
  }
};
