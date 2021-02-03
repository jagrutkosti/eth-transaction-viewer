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

## Comments

### Things not implemented

1. A component to show last 5 used address.
2. The transactions are sorted with time, but the time displayed is in milliseconds. Didn't convert to Date.
3. Basic test only (which come by default in create-react-script).

Reason: The email asked to spend no more than 5 hours. I couldn't do it in that time.

### Future extensibility

I made an assumption to keep it simple. I could have used state management libraries or gone with Context API from React, but that seemed like an overkill to me. But to extend this project, the initial structure is good enough to build on top of it. A minor refactoring is expected.

I hope this was enough for now. Would love to have a talk about the code!
