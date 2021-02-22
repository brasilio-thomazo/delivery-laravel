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
}