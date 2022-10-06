# Envari

A safer way to load .env files

## Installation

```bash
yarn add envari
```

## Options

-   `requiredProperties`: The properties that should be present in the .env file
-   `requiredKeys`: Alias for `requiredProperties`
-   `missingPropertyBehavior`: The action that should be taken if a required property is missing
    -   `"THROW"` (default): Throw an error
    -   `"FALLBACK"`: Use an empty string for the property instead
-   `filePath`: The file path to the .env file (defaults to the .env file in the project root)

## Usage

```js
import * as Envari from "envari";

export const env = Envari.load({
    requiredProperties: ["SECRET_KEY"],
    missingPropertyBehavior: "FALLBACK",
    filePath: "/some/path/to/.env",
});
```

With Typescript:

```js
import * as Envari from "envari";

export const env = Envari.load<{
    SECRET_KEY: string;
}>({
    requiredProperties: ["SECRET_KEY"],
    missingPropertyBehavior: "FALLBACK",
    filePath: "/some/path/to/.env",
});
```

The result of calling `Envari.load` will be an object representation of your `.env` file.
Envari also automatically populates `process.env` with your `.env` values.

```js
console.log(env.SECRET_KEY); // "*******"
console.log(process.env.SECRET_KEY); // "*******"
```

## License

MIT © [Juan de Urtubey](https://jdeurt.xyz)
