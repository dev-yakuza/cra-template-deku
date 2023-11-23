# DeKu template for create-react-app

This project uses the followings:

- React UI library: [MUI](https://mui.com/), [Emotion](https://emotion.sh/)
- Component driven development: [Storybook](https://storybook.js.org/)
- Calling API: [Axios](https://axios-http.com/), [React Query](https://tanstack.com/query/v4/)
- State management: [Recoil](https://recoiljs.org/)
- Routing: [React Router](https://reactrouter.com/)
- i18n: [react-i18next](https://github.com/i18next/react-i18next)

## Contents

- [Development](#development)
  - [Node Version Manager](#node-version-manager)
  - [Lefthook](#lefthook)
  - [Linters](#linters)
    - [ESLint](#eslint)
    - [Stylelint](#stylelint)
    - [remark-lint](#remark-lint)
    - [Prettier](#prettier)
    - [CSpell](#cspell)
    - [Test](#test)
  - [Storybook](#storybook)

## Development

### Node Version Manager

This project is based on `NodeJS`, so you need the `NodeJS` environment. The [nvm](https://github.com/nvm-sh/nvm) is a `Node Version Manager`. you can manage the `NodeJS` environment with `nvm`.

First, install `nvm` on your system.

- macOS: `brew install nvm`
- windows: [https://github.com/coreybutler/nvm-windows](https://github.com/coreybutler/nvm-windows)

And, execute the following command to install `NodeJS`.

```bash
nvm install
```

The version written in the `.nvmrc` file of `NodeJS` will be installed.

### env file

You can copy the `.env.development` to `.env.development.local` for local development.

```
cp .env.development .env.development.local
```

### Lefthook

There are some linters to check the code style. And they will be executed when the pull request is created.

So, if you want to pass `CI/CD` faster, it's better to use [Lefthook](https://github.com/evilmartians/lefthook) to execute the linters on the local machine.

Execute the following command to configure `Lefthook`.

```bash
lefthook install
```

After it, the linters will be executed every time you commit on the local.

### Linters

We use many linters to check the code style and make the clean code. If you want to check them on your machine, try to the following instructions.

#### ESLint

You can execute the [ESLint](https://eslint.org/) by the following command to check `JavaScript` or `TypeScript`.

```bash
npm run lint
```

#### Stylelint

You can execute the [Stylelint](https://stylelint.io/) by the following command to check `CSS` or `CSS-in-JS`.

```bash
npm run lint:css
```

#### remark-lint

You can execute the [remark-lint](https://github.com/remarkjs/remark-lint) by the following command to check `Markdown`.

```bash
npm run lint:md
```

#### Prettier

You can execute [Prettier](https://prettier.io/) to check and format the code by executing the following command.

```bash
npm run format
npm run format:fix
```

#### CSpell

You can execute the [CSpell](https://cspell.org/) by the following command to check `Typo`.

```bash
npm run check:spell
```

#### Test

You can run the test code by the following command.

```bash
npm test
```

### Storybook

This project uses [Storybook](https://storybook.js.org/) for the component-driven development.

You can see `Storybook` by the following command.

```bash
npm run storybook
```

And, open [http://localhost:6006/](http://localhost:6006/) in your browser.

### Generate code by template

This project uses `Hygen` to generate code automatically with the template.

- Hygen: [https://www.hygen.io/](https://www.hygen.io/)

You can generate the code by the following commands.

#### Component

You can generate the component by the following command.

```bash
npx hygen component create
```
