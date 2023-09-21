
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { SurgicalPosition, UserCreateSurgicalPositionInput, UserUpdateSurgicalPositionInput, UpdateResult,  } from "@case-clinical/shared/util/sdk";
import { SurgicalPositionBusinessProviderService } from "./surgical-position.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class SurgicalPositionService extends ServiceBase {
 constructor(
  @Inject(SurgicalPositionBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: SurgicalPositionBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("SurgicalPositionService", loggingService, serviceContext);
 }

    createSurgicalPosition(input: UserCreateSurgicalPositionInput): Observable<SurgicalPosition> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createSurgicalPosition(filteredObj);
    }

    updateSurgicalPosition(input: UserUpdateSurgicalPositionInput, surgicalPositionId: string): Observable<SurgicalPosition> {
        return this.businessProvider.updateSurgicalPosition(input, surgicalPositionId);
    }

    importSurgicalPositions(surgicalPositions: UserUpdateSurgicalPositionInput[]): Observable<UpdateResult> {
        return this.businessProvider.importSurgicalPositions(surgicalPositions);
    }

    validateSurgicalPositionExcelData(excelData: any[] ) {
      return this.businessProvider.validateSurgicalPositionExcelData(excelData );
    }
}

