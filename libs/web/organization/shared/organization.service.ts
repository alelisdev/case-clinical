
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { Organization, UserCreateOrganizationInput, UserUpdateOrganizationInput, UpdateResult,  } from "@case-clinical/shared/util/sdk";
import { OrganizationBusinessProviderService } from "./organization.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
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
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createOrganization(filteredObj);
    }

    updateOrganization(input: UserUpdateOrganizationInput, organizationId: string): Observable<Organization> {
        return this.businessProvider.updateOrganization(input, organizationId);
    }

    importOrganizations(organizations: UserUpdateOrganizationInput[]): Observable<UpdateResult> {
        return this.businessProvider.importOrganizations(organizations);
    }

    validateOrganizationExcelData(excelData: any[] ) {
      return this.businessProvider.validateOrganizationExcelData(excelData );
    }
}

