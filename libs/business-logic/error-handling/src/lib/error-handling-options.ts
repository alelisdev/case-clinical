import { IErrorHandingConfig } from "./i-error-handling-config";

export class ErrorHandlingOptions implements IErrorHandingConfig {
    applicationName!: string;
    includeDefaultErrorHandling = false;
}