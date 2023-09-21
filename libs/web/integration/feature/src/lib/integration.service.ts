
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { Integration, UserCreateIntegrationInput, UserUpdateIntegrationInput } from "@case-clinical/shared/util/sdk";
import { IntegrationBusinessProviderService } from "./business/integration.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
export class IntegrationService extends ServiceBase {
 constructor(
  @Inject(IntegrationBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: IntegrationBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("IntegrationService", loggingService, serviceContext);
 }

    createIntegration(input: UserCreateIntegrationInput): Observable<Integration> {
        return this.businessProvider.createIntegration(input);
    }

    updateIntegration(input: UserUpdateIntegrationInput, integrationId: string): Observable<Integration> {
        return this.businessProvider.updateIntegration(input, integrationId);
    }

    importIntegrations(integrations: UserUpdateIntegrationInput[]): Observable<boolean> {
        return this.businessProvider.importIntegrations(integrations);
    }
}

