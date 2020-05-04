const uuids = new Set(['']);

const randChar = () => String.fromCharCode(65 + Math.floor(Math.random() * 26));

const randomString = length => {
  let random = '';
  for (let i = 0; i < length; i += 1) {
    random += randChar();
  }

  return random;
};

module.exports = (length = 4) => {
  let uuid = '';
  while (uuids.has(uuid)) {
    uuid = randomString(length);
  }

  return uuid;
};
