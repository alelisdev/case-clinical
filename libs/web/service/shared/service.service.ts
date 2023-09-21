
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { Service, UserCreateServiceInput, UserUpdateServiceInput, UpdateResult,  } from "@case-clinical/shared/util/sdk";
import { ServiceBusinessProviderService } from "./service.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class ServiceService extends ServiceBase {
 constructor(
  @Inject(ServiceBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: ServiceBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("ServiceService", loggingService, serviceContext);
 }

    createService(input: UserCreateServiceInput): Observable<Service> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createService(filteredObj);
    }

    updateService(input: UserUpdateServiceInput, serviceId: string): Observable<Service> {
        return this.businessProvider.updateService(input, serviceId);
    }

    importServices(services: UserUpdateServiceInput[]): Observable<UpdateResult> {
        return this.businessProvider.importServices(services);
    }

    validateServiceExcelData(excelData: any[] ) {
      return this.businessProvider.validateServiceExcelData(excelData );
    }
}

