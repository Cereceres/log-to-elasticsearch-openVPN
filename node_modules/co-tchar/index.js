const slice = Array.prototype.slice;

const cotchar = function(gen, ...args) {
  if (typeof gen.next !== 'function' && typeof gen === 'function') gen = gen.apply(this, args);

  if (typeof gen.next !== 'function') return Promise.all(gen);

  return new Promise((resolve, reject) => {
    let onError = null
    let next = null
    let onFull = null
    onError = (error) => {
      try {
        gen.throw(error)
      } catch (e) {
        reject(e)
      }
    }

    onFull = (value) => {
      if (value instanceof Promise) return value.then(next).catch((error) => next({ error }));
      if (value && value.then) return value.then(next);
      process.nextTick(onFull, cotchar(value));
    }

    next = (response) => {
      try {
        const result = gen.next(response);

        if (!result.done) return process.nextTick(onFull, result.value)

        resolve(response);
      } catch (error) {
        process.nextTick(onError, error)
      }
    };
    return process.nextTick(next);
  });
};

module.exports = cotchar;
