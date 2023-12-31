# DeKu template for create-react-app

This project is a template of create-react-app. You can use this by running the following command.

1. Enable the `legacy-peer-deps` option globally for installing the dependencies.

```bash
npm config set legacy-peer-deps true
```

2. Create the React project with the `DeKu` template.

```bash
npx create-react-app [YOUR_PROJECT_NAME] --template deku
```

3. Enable the `legacy-peer-deps` option locally for installing the dependencies.

```bash
cd [YOUR_PROJECT_NAME]
npm config --location=project set legacy-peer-deps=true
```

4. Disable the `legacy-peer-deps` option globally. (The default of this option is `false`. See the details on the [document](https://docs.npmjs.com/cli/v7/using-npm/config#legacy-peer-deps))

```bash
npm config set legacy-peer-deps false
```

## Contribute

This project uses the followings:

- React UI library: [MUI](https://mui.com/), [Emotion](https://emotion.sh/)
- Component driven development: [Storybook](https://storybook.js.org/)
- Calling API: [Axios](https://axios-http.com/), [React Query](https://tanstack.com/query/v4/)
- State management: [Recoil](https://recoiljs.org/)
- Routing: [React Router](https://reactrouter.com/)
- i18n: [react-i18next](https://github.com/i18next/react-i18next)

If you want more details of the project, see the following document.

- DeKu template for create-react-app: [README](./template/README.md)

You can add libraries or modify the project in the `development` folder. **You don't need to modify in the `template` folder or `template.json` file.**

After contributing, just execute the following command.

```bash
node deploy.js
```

It will copy all contents to the `template` folder and `template.json` file for deployment.

If you use `Lefthook`, it will be executed automatically when you commit the code.
