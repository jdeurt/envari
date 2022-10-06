import { readFileSync } from "node:fs";

enum QuoteType {
    NONE = "",
    SINGLE = "'",
    DOUBLE = '"',
}

const escapeChar = (char: string) => {
    const map: Record<string, string> = {
        "0": "\0",
        n: "\n",
        r: "\r",
        v: "\v",
        t: "\t",
        b: "\b",
        f: "\f",
    };

    return map[char] ?? char;
};

export function parseEnvironmentFile(path: string) {
    const lines = readFileSync(path, "utf8").split("\n");

    const entries: {
        key: string;
        value: string;
    }[] = [];

    let currentEntryProperty: "key" | "value" = "key";
    let valueQuotes: QuoteType = QuoteType.NONE;
    let shouldEscapeNextChar = false;

    for (const line of lines) {
        const currentEntry = { key: "", value: "" };
        currentEntryProperty = "key";
        valueQuotes = QuoteType.NONE;
        shouldEscapeNextChar = false;

        for (const char of line) {
            if (currentEntryProperty === "key") {
                if (char === "=") {
                    currentEntryProperty = "value";

                    continue;
                }

                // Invalidate entry if invalid characters are found
                if (!/\w/.test(char)) {
                    currentEntry.key = "";

                    break;
                }
            } else if (currentEntryProperty === "value") {
                if (shouldEscapeNextChar) {
                    currentEntry.value += escapeChar(char);

                    shouldEscapeNextChar = false;

                    continue;
                }

                // Handle quotes
                if (char === QuoteType.SINGLE || char === QuoteType.DOUBLE) {
                    // Start quoted value if quote is the first value char
                    if (
                        valueQuotes === QuoteType.NONE &&
                        currentEntry.value.length === 0
                    ) {
                        valueQuotes = char;

                        continue;
                    }

                    // End quoted value if second matching quote found
                    if (
                        valueQuotes !== QuoteType.NONE &&
                        char === valueQuotes
                    ) {
                        break;
                    }
                }

                // Handle comments
                if (char === "#" && valueQuotes === QuoteType.NONE) {
                    break;
                }

                // Handle escaping
                if (char === "\\" && valueQuotes !== QuoteType.NONE) {
                    shouldEscapeNextChar = true;

                    continue;
                }
            }

            currentEntry[currentEntryProperty] += char;
        }

        if (currentEntry.key.length > 0) {
            entries.push(currentEntry);
        }
    }

    return entries;
}
