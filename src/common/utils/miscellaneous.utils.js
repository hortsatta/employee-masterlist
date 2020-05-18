import Jimp from 'jimp';

const convertMapToObj = (list, field, isArray = false) => (
  list.reduce((acc, item) => {
    const key = item[field].toLowerCase();

    if (!acc[key]) {
      acc[key] = isArray ? [] : item;
    } else {
      acc[key] = [...acc[key], item];
    }

    return acc;
  }, {})
);

const convertObjectToMap = (object) => (
  Object.keys(object).reduce((acc, key) => (
    acc.concat(key, object[key])
  ), [])
);

const generateJimp = async (fileURL) => {
  const size = 360;
  // Convert to jimp, and set desired jimp settings to image,
  // get image base64, and return it in jimp object
  const jimp = await Jimp.read(fileURL);
  const value = jimp.bitmap.width >= jimp.bitmap.height
    ? jimp.cover(size, size).quality(75)
    : jimp.resize(size, Jimp.AUTO).crop(0, 0, size, size).quality(75);
  const base64 = await value.getBase64Async(Jimp.MIME_JPEG);
  return { ...value, base64 };
};

export {
  convertMapToObj,
  convertObjectToMap,
  generateJimp
};
