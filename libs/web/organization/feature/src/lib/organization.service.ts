
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { Organization, UserCreateOrganizationInput, UserUpdateOrganizationInput } from "@case-clinical/shared/util/sdk";
import { OrganizationBusinessProviderService } from "./business/organization.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
export class OrganizationService extends ServiceBase {
 constructor(
  @Inject(OrganizationBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: OrganizationBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("OrganizationService", loggingService, serviceContext);
 }

    createOrganization(input: UserCreateOrganizationInput): Observable<Organization> {
        return this.businessProvider.createOrganization(input);
    }

    updateOrganization(input: UserUpdateOrganizationInput, organizationId: string): Observable<Organization> {
        return this.businessProvider.updateOrganization(input, organizationId);
    }

    importOrganizations(organizations: UserUpdateOrganizationInput[]): Observable<boolean> {
        return this.businessProvider.importOrganizations(organizations);
    }
}

