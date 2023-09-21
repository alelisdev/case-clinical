
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { VisitKind, UserCreateVisitKindInput, UserUpdateVisitKindInput, UpdateResult,  } from "@case-clinical/shared/util/sdk";
import { VisitKindBusinessProviderService } from "./visit-kind.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class VisitKindService extends ServiceBase {
 constructor(
  @Inject(VisitKindBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: VisitKindBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("VisitKindService", loggingService, serviceContext);
 }

    createVisitKind(input: UserCreateVisitKindInput): Observable<VisitKind> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createVisitKind(filteredObj);
    }

    updateVisitKind(input: UserUpdateVisitKindInput, visitKindId: string): Observable<VisitKind> {
        return this.businessProvider.updateVisitKind(input, visitKindId);
    }

    importVisitKinds(visitKinds: UserUpdateVisitKindInput[]): Observable<UpdateResult> {
        return this.businessProvider.importVisitKinds(visitKinds);
    }

    validateVisitKindExcelData(excelData: any[] ) {
      return this.businessProvider.validateVisitKindExcelData(excelData );
    }
}

