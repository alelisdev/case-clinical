
export interface IHttpOptions {
    apiURL: string,
    baseUrl: string;
    csrf: string;
    health: string;
    version: string;
}

export class HttpOptions implements IHttpOptions {
    apiURL!: string;
    baseUrl!: string;
    csrf!: string;
    health!: string;
    version!: string;

}
