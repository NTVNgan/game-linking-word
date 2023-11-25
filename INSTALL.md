# Installation Note

## Prerequisites
**Xebus Admin Console** requires:

- [Node.js](https://nodejs.org/en/) (at least v10.13): A JavaScript runtime built on Chrome's V8 JavaScript engine
- [npm](https://www.npmjs.com/) (at least v6.1): A package manager for the JavaScript programming language.

Make sure that `/usr/local/bin` is in your `$PATH` .

```shell
$ node --version
v16.15.1
$ npm --version
9.6.1
```

You can install [Node Version Manager](https://github.com/nvm-sh/nvm) to quickly install and use different versions of `node` via the command line.

```shell
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```

Then, install the required version of node:

```shell
nvm use 16
```

You can install the latest version of `npm` with the following command:

```shell
npm install -g npm@latest
```

## Project Creation
**Xebus Admin Console** is built on [Vue.js](https://vuejs.org/) 3.0. You will need to install `Vue.js` and Vue CLI (a toolkit for working with Vue.js in your terminal). :

```shell
npm install vue
npm install -g @vue/cli
```

**Xebus Admin Console** application has been created with the command:

```shell
$ vue create xebus-web-admin-console

Vue CLI v5.0.8
? Please pick a preset: Manually select features
? Check the features needed for your project: Babel, TypeScript, Router, Vuex, Linter / Formatter
? Choose a version of Vue.js that you want to start the project with 3.x
? Use class-style component syntax? No
? Use Babel alongside TypeScript (required for modern mode, auto-detected polyfills, transpiling JSX)? Yes
? Use history mode for router? (Requires proper server setup for index fallback in production) Yes
? Pick a linter / formatter config: Prettier
? Pick additional lint features: Lint on save
? Where do you prefer placing config for Babel, ESLint, etc.? In dedicated
config files
? Save this as a preset for future projects? No
```

Once the project create in the new directory `xebus-web-admin-console`, install the following Node.js packages:

```shell
npm install axios
npm install sass
npm install sass-loader
npm install mitt
```

Add file `.prettierrc.json` to the root folder to configure how to format the code:

```json
{
  "endOfLine": "auto",
  "newline-before-return": true,
  "no-duplicate-variable": [
    true,
    "check-parameters"
  ],
  "no-var-keyword": true,
  "printWidth": 120,
  "semi": true,
  "singleQuote": true,
  "tabWidth": 4,
  "trailingComma": "all"
}
```

## Project Installation & Build
To install and build the project, run the following commands:

```shell
npm install
npm run serve
```
