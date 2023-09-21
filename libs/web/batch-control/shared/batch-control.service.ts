
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { BatchControl, UserCreateBatchControlInput, UserUpdateBatchControlInput, UpdateResult,  } from "@case-clinical/shared/util/sdk";
import { BatchControlBusinessProviderService } from "./batch-control.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
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
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createBatchControl(filteredObj);
    }

    updateBatchControl(input: UserUpdateBatchControlInput, batchControlId: string): Observable<BatchControl> {
        return this.businessProvider.updateBatchControl(input, batchControlId);
    }

    importBatchControls(batchControls: UserUpdateBatchControlInput[]): Observable<UpdateResult> {
        return this.businessProvider.importBatchControls(batchControls);
    }

    validateBatchControlExcelData(excelData: any[] ) {
      return this.businessProvider.validateBatchControlExcelData(excelData );
    }
}

