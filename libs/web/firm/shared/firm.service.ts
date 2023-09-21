
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { Firm, UserCreateFirmInput, UserUpdateFirmInput, UpdateResult, FirmStatus, Document } from "@case-clinical/shared/util/sdk";
import { FirmBusinessProviderService } from "./firm.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class FirmService extends ServiceBase {
 constructor(
  @Inject(FirmBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: FirmBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("FirmService", loggingService, serviceContext);
 }

    createFirm(input: UserCreateFirmInput): Observable<Firm> {
        input.firmStatusNote = (input.firmStatusNote?.length > 1000 ? input.firmStatusNote?.substring(0,999):input.firmStatusNote )
        input.reductionNotes = (input.reductionNotes?.length > 1000 ? input.reductionNotes?.substring(0,999):input.reductionNotes )
        input.notes = (input.notes?.length > 1000 ? input.notes?.substring(0,999):input.notes )
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createFirm(filteredObj);
    }

    updateFirm(input: UserUpdateFirmInput, firmId: string): Observable<Firm> {
        input.firmStatusNote = (input.firmStatusNote?.length > 1000 ? input.firmStatusNote?.substring(0,999):input.firmStatusNote )
        input.reductionNotes = (input.reductionNotes?.length > 1000 ? input.reductionNotes?.substring(0,999):input.reductionNotes )
        input.notes = (input.notes?.length > 1000 ? input.notes?.substring(0,999):input.notes )
        
        return this.businessProvider.updateFirm(input, firmId);
    }

    importFirms(firms: UserUpdateFirmInput[]): Observable<UpdateResult> {
        return this.businessProvider.importFirms(firms);
    }

    validateFirmExcelData(excelData: any[], firmStatuses: FirmStatus[], eulas: Document[]) {
      return this.businessProvider.validateFirmExcelData(excelData, firmStatuses, eulas);
    }
}

