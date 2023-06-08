const IMAGE_FORMAT = ['jpeg', 'png', 'gif', 'jpg'];
const FILE_FORMAT = ['pdf', 'pptx', 'ppt', 'doc', 'docx'];

export const containsImg = (fileName, type = 'word') => {
  const splitedName = fileName.fileList[0].name.split('.');

  const findOn = type === 'image' ? IMAGE_FORMAT : FILE_FORMAT;

  return findOn.includes(splitedName[splitedName.length - 1]);
};
