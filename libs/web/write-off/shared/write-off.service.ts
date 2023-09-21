
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { WriteOff, UserCreateWriteOffInput, UserUpdateWriteOffInput, UpdateResult, CaseAccount, WriteOffStatus } from "@case-clinical/shared/util/sdk";
import { WriteOffBusinessProviderService } from "./write-off.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class WriteOffService extends ServiceBase {
 constructor(
  @Inject(WriteOffBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: WriteOffBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("WriteOffService", loggingService, serviceContext);
 }

    createWriteOff(input: UserCreateWriteOffInput): Observable<WriteOff> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createWriteOff(filteredObj);
    }

    updateWriteOff(input: UserUpdateWriteOffInput, writeOffId: string): Observable<WriteOff> {
        return this.businessProvider.updateWriteOff(input, writeOffId);
    }

    importWriteOffs(writeOffs: UserUpdateWriteOffInput[]): Observable<UpdateResult> {
        return this.businessProvider.importWriteOffs(writeOffs);
    }

    validateWriteOffExcelData(excelData: any[], accounts: CaseAccount[], writeOffStatuses: WriteOffStatus[]) {
      return this.businessProvider.validateWriteOffExcelData(excelData, accounts, writeOffStatuses);
    }
}

