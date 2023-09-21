
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { Process, UserCreateProcessInput, UserUpdateProcessInput, UpdateResult,  } from "@case-clinical/shared/util/sdk";
import { ProcessBusinessProviderService } from "./process.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class ProcessService extends ServiceBase {
 constructor(
  @Inject(ProcessBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: ProcessBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("ProcessService", loggingService, serviceContext);
 }

    createProcess(input: UserCreateProcessInput): Observable<Process> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createProcess(filteredObj);
    }

    updateProcess(input: UserUpdateProcessInput, processId: string): Observable<Process> {
        return this.businessProvider.updateProcess(input, processId);
    }

    importProcesses(processes: UserUpdateProcessInput[]): Observable<UpdateResult> {
        return this.businessProvider.importProcesses(processes);
    }

    validateProcessExcelData(excelData: any[] ) {
      return this.businessProvider.validateProcessExcelData(excelData );
    }
}

