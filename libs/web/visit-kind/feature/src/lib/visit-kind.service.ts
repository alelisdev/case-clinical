
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { VisitKind, UserCreateVisitKindInput, UserUpdateVisitKindInput } from "@case-clinical/shared/util/sdk";
import { VisitKindBusinessProviderService } from "./business/visit-kind.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
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
        return this.businessProvider.createVisitKind(input);
    }

    updateVisitKind(input: UserUpdateVisitKindInput, visitKindId: string): Observable<VisitKind> {
        return this.businessProvider.updateVisitKind(input, visitKindId);
    }

    importVisitKinds(visitKinds: UserUpdateVisitKindInput[]): Observable<boolean> {
        return this.businessProvider.importVisitKinds(visitKinds);
    }
}

