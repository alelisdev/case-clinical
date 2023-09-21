
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { MedLevel, UserCreateMedLevelInput, UserUpdateMedLevelInput } from "@case-clinical/shared/util/sdk";
import { MedLevelBusinessProviderService } from "./business/med-level.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
export class MedLevelService extends ServiceBase {
 constructor(
  @Inject(MedLevelBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: MedLevelBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("MedLevelService", loggingService, serviceContext);
 }

    createMedLevel(input: UserCreateMedLevelInput): Observable<MedLevel> {
        return this.businessProvider.createMedLevel(input);
    }

    updateMedLevel(input: UserUpdateMedLevelInput, medLevelId: string): Observable<MedLevel> {
        return this.businessProvider.updateMedLevel(input, medLevelId);
    }

    importMedLevels(medLevels: UserUpdateMedLevelInput[]): Observable<boolean> {
        return this.businessProvider.importMedLevels(medLevels);
    }
}

