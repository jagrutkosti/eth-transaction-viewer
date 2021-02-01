# Ethereum Transaction Viewer

A quick test project to view the balance and last 10 transactions of an ethereum address on either mainnet or rinkeby testnet.
The idea is to see the coding style, project structure and a runnable application.

Tests are configured but not written.

## Setup

Create a `.env` file in the project root directory and add your Etherscan api key with `REACT_APP_ETHERSCAN_API_KEY` as variable name. An example is shown in `.env.example`

After that, run `yarn` from the root to install all dependencies.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn lint`

Runs the typescript-eslint on all files and throws errors/warnings

### `yarn lint --fix`

Runs the linter and fixes all fixable problema automatically.

### `yarn test`

Launches the test runner in the interactive watch mode.\

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
