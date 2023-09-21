
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { Severity, UserCreateSeverityInput, UserUpdateSeverityInput, UpdateResult,  } from "@case-clinical/shared/util/sdk";
import { SeverityBusinessProviderService } from "./severity.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class SeverityService extends ServiceBase {
 constructor(
  @Inject(SeverityBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: SeverityBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("SeverityService", loggingService, serviceContext);
 }

    createSeverity(input: UserCreateSeverityInput): Observable<Severity> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createSeverity(filteredObj);
    }

    updateSeverity(input: UserUpdateSeverityInput, severityId: string): Observable<Severity> {
        return this.businessProvider.updateSeverity(input, severityId);
    }

    importSeverities(severities: UserUpdateSeverityInput[]): Observable<UpdateResult> {
        return this.businessProvider.importSeverities(severities);
    }

    validateSeverityExcelData(excelData: any[] ) {
      return this.businessProvider.validateSeverityExcelData(excelData );
    }
}

