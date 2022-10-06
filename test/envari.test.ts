import { load } from "../src/";

describe("Envari", () => {
    it("Should correctly load the .env file contents", () => {
        // eslint-disable-next-line unicorn/prefer-module
        const environmentFilePath = `${__dirname}/vendor/example.env`;

        const environment = load<{
            SIMPLE: string;
            QUOTED: string;
            COMMENT_INSIDE_QUOTES: string;
        }>({
            filePath: environmentFilePath,
            requiredKeys: ["SIMPLE", "QUOTED", "COMMENT_INSIDE_QUOTES"],
        });

        expect(environment.SIMPLE).toEqual("Hello");
        expect(environment.QUOTED).toEqual("Hello World");
        expect(environment.COMMENT_INSIDE_QUOTES).toEqual("Hello # World");
        expect(process.env.SIMPLE).toEqual("Hello");
        expect(process.env.QUOTED).toEqual("Hello World");
        expect(process.env.COMMENT_INSIDE_QUOTES).toEqual("Hello # World");
        expect(() => {
            load({
                filePath: environmentFilePath,
                requiredKeys: ["NONEXISTENT"],
            });
        }).toThrow();
    });
});
