import stylish from './stylish.js';

const formatData = (data, formatType) => {
  if (formatType === 'stylish') {
    return stylish(data);
  }
  throw new Error('Unknown format type');
};
export default formatData;
