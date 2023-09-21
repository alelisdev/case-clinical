export class DataDogOptions {
    logs!: {
        clientToken: string,
        forwardErrorsToLogs: boolean,
        sampleRate: number
        site: string,
    };
    realUserMonitoring!: {
        applicationId: string,
        clientToken: string,
        defaultPrivacyLevel: string;
        env: string,
        premiumSampleRate: number,
        sampleRate: number,
        service: string,
        site: string,
        trackInteractions: boolean,
        version: string,
    }
}
