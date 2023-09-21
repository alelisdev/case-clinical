
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { Gender, UserCreateGenderInput, UserUpdateGenderInput, UpdateResult,  } from "@case-clinical/shared/util/sdk";
import { GenderBusinessProviderService } from "./gender.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class GenderService extends ServiceBase {
 constructor(
  @Inject(GenderBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: GenderBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("GenderService", loggingService, serviceContext);
 }

    createGender(input: UserCreateGenderInput): Observable<Gender> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createGender(filteredObj);
    }

    updateGender(input: UserUpdateGenderInput, genderId: string): Observable<Gender> {
        return this.businessProvider.updateGender(input, genderId);
    }

    importGenders(genders: UserUpdateGenderInput[]): Observable<UpdateResult> {
        return this.businessProvider.importGenders(genders);
    }

    validateGenderExcelData(excelData: any[] ) {
      return this.businessProvider.validateGenderExcelData(excelData );
    }
}

