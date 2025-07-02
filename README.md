# XOXLabs Frontend

<p align="center">
  <a href="https://xoxnet.io">
      <img src="https://xoxnet.io/logo.png" height="128">
  </a>
</p>

This project contains the main features of the pancake application.

If you want to contribute, please refer to the [contributing guidelines](./CONTRIBUTING.md) of this project.

## Documentation

- [Info](doc/Info.md)
- [Cypress tests](doc/Cypress.md)

> Install dependencies using **yarn**

## `apps/web`
<details>
<summary>
How to start
</summary>

```sh
yarn
```

start the development server
```sh
yarn dev
```

build with production mode
```sh
yarn build

# start the application after build
yarn start
```

### Deploy fe: 
- ls
- cd test/LoopX-frontend or test/clone-FE
- git pull
- yarn build 
- pm2 ls
- pm2 delete ui
- pm2 start "yarn run start" --name  "ui"
<!-- - pm2 restart ui (nếu chứ có service ui thì run pm2 start yarn --name ui -- dev) -->

</details>
