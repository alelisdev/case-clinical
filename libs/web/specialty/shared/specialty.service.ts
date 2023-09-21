
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { Specialty, UserCreateSpecialtyInput, UserUpdateSpecialtyInput, UpdateResult,  } from "@case-clinical/shared/util/sdk";
import { SpecialtyBusinessProviderService } from "./specialty.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class SpecialtyService extends ServiceBase {
 constructor(
  @Inject(SpecialtyBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: SpecialtyBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("SpecialtyService", loggingService, serviceContext);
 }

    createSpecialty(input: UserCreateSpecialtyInput): Observable<Specialty> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createSpecialty(filteredObj);
    }

    updateSpecialty(input: UserUpdateSpecialtyInput, specialtyId: string): Observable<Specialty> {
        return this.businessProvider.updateSpecialty(input, specialtyId);
    }

    importSpecialties(specialties: UserUpdateSpecialtyInput[]): Observable<UpdateResult> {
        return this.businessProvider.importSpecialties(specialties);
    }

    validateSpecialtyExcelData(excelData: any[] ) {
      return this.businessProvider.validateSpecialtyExcelData(excelData );
    }
}

