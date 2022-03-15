import yaml from 'js-yaml';

const parsersFilter = (data, ext) => {
  if (ext === '.json') {
    return JSON.parse(data);
  }
  if (ext === '.yaml' || ext === '.yml') {
    return yaml.load(data);
  }
  throw new Error(`Unknown extension:${ext}!`);
};
export default parsersFilter;
