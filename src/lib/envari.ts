import { resolve } from "node:path";
import { EnvariEnvironment } from "../types/environment";

import type { EnvariConfigurationOptions } from "../types/configuration-options";
import { parseEnvironmentFile } from "../util/parse-environment-file";

export function load<
    T extends EnvariConfigurationOptions = EnvariConfigurationOptions,
    P extends EnvariEnvironment = {
        [K in keyof T["properties"]]: string;
    }
>(options: T): P {
    const missingProperties = Object.keys(options.properties ?? {});
    const missingPropertyBehavior = options.missingPropertyBehavior ?? "THROW";
    const filePath = options.filePath ?? resolve(process.cwd(), ".env");

    const environment: {
        [K in keyof T["properties"]]?: string;
    } = {};

    const entries = parseEnvironmentFile(filePath);

    for (const entry of entries) {
        const missingPropertyIndex = missingProperties.indexOf(entry.key);

        if (missingPropertyIndex >= 0) {
            missingProperties.splice(missingPropertyIndex, 1);

            environment[entry.key as keyof T["properties"]] = entry.value;
        }
    }

    if (missingProperties.length > 0) {
        switch (missingPropertyBehavior) {
            case "THROW":
                throw new Error(
                    `Missing required configuration properties: ${missingProperties.toString()}`
                );
            case "FALLBACK":
                for (const property of missingProperties) {
                    environment[property as keyof T["properties"]] = "";
                }
        }
    }

    for (const property in environment) {
        process.env[property] = environment[property];
    }

    return environment as P;
}
