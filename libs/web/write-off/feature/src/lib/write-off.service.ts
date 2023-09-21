
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { WriteOff, UserCreateWriteOffInput, UserUpdateWriteOffInput } from "@case-clinical/shared/util/sdk";
import { WriteOffBusinessProviderService } from "./business/write-off.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
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
        return this.businessProvider.createWriteOff(input);
    }

    updateWriteOff(input: UserUpdateWriteOffInput, writeOffId: string): Observable<WriteOff> {
        return this.businessProvider.updateWriteOff(input, writeOffId);
    }

    importWriteOffs(writeOffs: UserUpdateWriteOffInput[]): Observable<boolean> {
        return this.businessProvider.importWriteOffs(writeOffs);
    }
}

