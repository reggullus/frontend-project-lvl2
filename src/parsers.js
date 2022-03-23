import yaml from 'js-yaml';

const parsersFilter = (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
      return yaml.load(data);
    default:
      throw new Error(`Unknown extension:${format}!`);
  }
};
export default parsersFilter;
