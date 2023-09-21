
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { BatchControl, UserCreateBatchControlInput, UserUpdateBatchControlInput } from "@case-clinical/shared/util/sdk";
import { BatchControlBusinessProviderService } from "./business/batch-control.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
export class BatchControlService extends ServiceBase {
 constructor(
  @Inject(BatchControlBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: BatchControlBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("BatchControlService", loggingService, serviceContext);
 }

    createBatchControl(input: UserCreateBatchControlInput): Observable<BatchControl> {
        return this.businessProvider.createBatchControl(input);
    }

    updateBatchControl(input: UserUpdateBatchControlInput, batchControlId: string): Observable<BatchControl> {
        return this.businessProvider.updateBatchControl(input, batchControlId);
    }

    importBatchControls(batchControls: UserUpdateBatchControlInput[]): Observable<boolean> {
        return this.businessProvider.importBatchControls(batchControls);
    }
}

