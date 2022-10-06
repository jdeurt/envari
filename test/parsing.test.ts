import { parseEnvironmentFile } from "../src/util/parse-environment-file";

describe("Parsing utilities", () => {
    it("Should correctly parse a .env file", () => {
        // eslint-disable-next-line unicorn/prefer-module
        const environmentFilePath = `${__dirname}/vendor/example.env`;

        const results = parseEnvironmentFile(environmentFilePath);

        expect(results).toEqual([
            { key: "SIMPLE", value: "Hello" },
            { key: "QUOTED", value: "Hello World" },
            { key: "COMMENT", value: "Hello World" },
            { key: "COMMENT_INSIDE_QUOTES", value: "Hello # World" },
            { key: "BAD_QUOTES", value: "Hello " },
            { key: "ESCAPED_QUOTES", value: '\\"Hello"' },
            { key: "ESCAPED_NESTED_QUOTES", value: 'Hello " World' },
            { key: "SINGLE_QUOTES", value: "Hello" },
        ]);
    });
});
