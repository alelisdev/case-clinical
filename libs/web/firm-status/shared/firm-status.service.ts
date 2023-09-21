
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { FirmStatus, UserCreateFirmStatusInput, UserUpdateFirmStatusInput, UpdateResult,  } from "@case-clinical/shared/util/sdk";
import { FirmStatusBusinessProviderService } from "./firm-status.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class FirmStatusService extends ServiceBase {
 constructor(
  @Inject(FirmStatusBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: FirmStatusBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("FirmStatusService", loggingService, serviceContext);
 }

    createFirmStatus(input: UserCreateFirmStatusInput): Observable<FirmStatus> {
        input.name = (input.name?.length > 256 ? input.name?.substring(0,255): input.name)
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createFirmStatus(filteredObj);
    }

    updateFirmStatus(input: UserUpdateFirmStatusInput, firmStatusId: string): Observable<FirmStatus> {
        input.name = (input.name?.length > 256 ? input.name?.substring(0,255): input.name)
        
        return this.businessProvider.updateFirmStatus(input, firmStatusId);
    }

    importFirmStatuses(firmStatuses: UserUpdateFirmStatusInput[]): Observable<UpdateResult> {
        return this.businessProvider.importFirmStatuses(firmStatuses);
    }

    validateFirmStatusExcelData(excelData: any[] ) {
      return this.businessProvider.validateFirmStatusExcelData(excelData );
    }
}

