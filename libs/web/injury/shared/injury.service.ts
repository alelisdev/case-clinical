
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { Injury, UserCreateInjuryInput, UserUpdateInjuryInput, UpdateResult,  } from "@case-clinical/shared/util/sdk";
import { InjuryBusinessProviderService } from "./injury.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class InjuryService extends ServiceBase {
 constructor(
  @Inject(InjuryBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: InjuryBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("InjuryService", loggingService, serviceContext);
 }

    createInjury(input: UserCreateInjuryInput): Observable<Injury> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createInjury(filteredObj);
    }

    updateInjury(input: UserUpdateInjuryInput, injuryId: string): Observable<Injury> {
        return this.businessProvider.updateInjury(input, injuryId);
    }

    importInjuries(injuries: UserUpdateInjuryInput[]): Observable<UpdateResult> {
        return this.businessProvider.importInjuries(injuries);
    }

    validateInjuryExcelData(excelData: any[] ) {
      return this.businessProvider.validateInjuryExcelData(excelData );
    }
}

