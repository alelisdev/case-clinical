
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { User, UserCreateUserInput, UserUpdateUserInput, UpdateResult, Patient, ClinicalProvider, Attorney } from "@case-clinical/shared/util/sdk";
import { UserBusinessProviderService } from "./user.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
export class UserService extends ServiceBase {
 constructor(
  @Inject(UserBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: UserBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("UserService", loggingService, serviceContext);
 }

    createUser(input: UserCreateUserInput): Observable<User> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createUser(filteredObj);
    }

    updateUser(input: UserUpdateUserInput, userId: string): Observable<User> {
        return this.businessProvider.updateUser(input, userId);
    }

    importUsers(users: UserUpdateUserInput[]): Observable<UpdateResult> {
        return this.businessProvider.importUsers(users);
    }

    validateUserExcelData(excelData: any[], patients: Patient[], providers: ClinicalProvider[], attorneys: Attorney[]) {
      return this.businessProvider.validateUserExcelData(excelData, patients, providers, attorneys);
    }
}

