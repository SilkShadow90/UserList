let modelName;
let modelFabricName;

process.argv.forEach((val, index, array) => {
  if (val?.includes('model') || index === 2) {
    modelName = val?.replace(/^model=(\S)|^(\S)/, ($0, $1) => ($1 ?? $0)?.toUpperCase());
    modelFabricName = `${modelName}Fabric`;
  }

  if ((index === 2 && (!modelName || modelName.match(/model=/i))) || array.length <= 2) {
    console.log('Укажите название модели');
    process.exit(1);
  }
});

const fs = require('fs');
const { getModelTemplate } = require('./modelTemplate');
const { getModelFabricTemplate } = require('./modelFabricTemplate');

const getPath = name => `./src/models/${name}.ts`;

/**
 * @param fileName {string}
 * @return Promise<boolean>
 */
const checkAvailableFile = fileName => {
  return new Promise(resolve => {
    fs.access(getPath(fileName), function (error) {
      if (error) {
        if (error.message.includes('no such file or directory')) {
          resolve(true);
        } else {
          console.log('Что-то пошло не так');
        }
      } else {
        console.log(`Файл ${fileName} уже существует`);
      }
      resolve(false);
    });
  });
};

/**
 * @param fileName {string}
 * @param template {string}
 * @return Promise<boolean>
 */
const writeFile = (fileName, template) => {
  return new Promise(resolve => {
    fs.writeFile(getPath(fileName), template, function (error) {
      resolve(!error);
    });
  });
};

(async () => {
  const isModelAvailable = await checkAvailableFile(modelName);
  const isModelFabricAvailable = await checkAvailableFile(modelFabricName);

  if (!isModelAvailable && !isModelFabricAvailable) {
    return;
  }

  let isModelCreated = await writeFile(modelName, getModelTemplate(modelName));
  let isModelFabricCreated = await writeFile(modelFabricName, getModelFabricTemplate(modelName));

  if (isModelFabricCreated || isModelCreated) {
    console.log('Модель успешно создана');
  }
})();
