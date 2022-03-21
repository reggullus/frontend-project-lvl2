import stylish from './stylish.js';
import plain from './plain.js';

const formatData = (data, formatType) => {
  if (formatType === 'stylish') {
    return stylish(data);
  }
  if (formatType === 'plain') {
    return plain(data);
  }
  if (formatType === 'json') {
    return JSON.stringify(data);
  }
  throw new Error('Unknown format type');
};
export default formatData;
