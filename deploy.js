const fs = require('fs');

const makeTemplateJsonFile = () => {
  const packageJson = JSON.parse(fs.readFileSync('./development/package.json'));
  const { scripts, dependencies, devDependencies, eslintConfig, jest } =
    packageJson;
  const templateJson = {
    package: {
      scripts,
      dependencies,
      devDependencies,
      eslintConfig,
      jest,
    },
  };

  fs.writeFileSync(
    './template.json',
    JSON.stringify(templateJson, null, 2) + '\n'
  );
};

const copyAllFilesToTemplateFolder = () => {
  fs.rmSync('./development/node_modules', { recursive: true, force: true });
  fs.rmSync('./template', { recursive: true, force: true });
  fs.cpSync('./development', './template', { recursive: true });

  fs.unlinkSync('./template/package.json');
  fs.unlinkSync('./template/package-lock.json');
  fs.renameSync('./template/.gitignore', './template/gitignore');
};

makeTemplateJsonFile();
copyAllFilesToTemplateFolder();
