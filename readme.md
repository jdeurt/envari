# Envari

A safer way to load .env files

## Installation

```bash
npm i envari
```

or

```bash
yarn add envari
```

## Options

-   `properties`: The properties that should be present in the .env file
-   `missingPropertyBehavior`: The action that should be taken if a required property is missing
    -   `"THROW"` (default): Throw an error
    -   `"FALLBACK"`: Use an empty string for the property instead
-   `filePath`: The file path to the .env file (defaults to the .env file in the project root)

## Usage

```shell
# .env
SECRET_KEY="******"
```

```js
// env.js
import * as Envari from "envari";

export const env = Envari.load({
    properties: {
        SECRET_KEY: true,
    },
});
```

The result of calling `Envari.load` will be an object representation of your `.env` file.
Envari also automatically populates `process.env` with your `.env` values.

```js
// index.js
import { env } from "/env.js";

console.log(env.SECRET_KEY); // "******"
console.log(process.env.SECRET_KEY); // "******"
```

## Example with all options used

```js
import * as Envari from "envari";

const env = Envari.load({
    properties: {
        SECRET_KEY: true,
        SUPER_SECRET_KEY: true,
    },
    missingPropertyBehavior: "FALLBACK",
    filePath: "./some/path/to/.env",
});

console.log(env); // { SECRET_KEY: "******", SUPER_SECRET_KEY: "" }
```

## License

MIT © [Juan de Urtubey](https://jdeurt.xyz)
