export interface EnvariConfigurationOptions {
    /**
     * The properties that should be present in the .env file
     */
    properties?: Record<string, true>;

    /**
     * The action that should be taken if a required property is missing
     *
     * - THROW (default): Throw an error
     * - FALLBACK: Use an empty string for the property instead
     */
    missingPropertyBehavior?: "THROW" | "FALLBACK";

    /**
     * The file path to the .env file
     *
     * Defaults to the .env file in the project root
     */
    filePath?: string;
}
