
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { ProcedureVendorStatus, UserCreateProcedureVendorStatusInput, UserUpdateProcedureVendorStatusInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateProcedureVendorStatusExcelDataAction } from './actions/validate-procedure-vendor-status-excel-data.action'
import { CreateProcedureVendorStatusAction } from './actions/create-procedure-vendor-status.action'
import { UpdateProcedureVendorStatusesAction, UpdateProcedureVendorStatusAction } from './actions/update-procedure-vendor-statuses.action'


@Injectable({providedIn: 'root'})
export class ProcedureVendorStatusBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.ProcedureVendorStatusBusinessProviderService', logger, serviceContext)
  }

  createProcedureVendorStatus(input: UserCreateProcedureVendorStatusInput): Observable<ProcedureVendorStatus> {
    const action = new CreateProcedureVendorStatusAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateProcedureVendorStatus(input: UserUpdateProcedureVendorStatusInput, procedureVendorStatusId: string): Observable<ProcedureVendorStatus> {
    const action = new UpdateProcedureVendorStatusAction(input, procedureVendorStatusId); 
    action.Do(this);
    return action.response;   
  }
  
  importProcedureVendorStatuses(procedureVendorStatuses: UserUpdateProcedureVendorStatusInput[]): Observable<UpdateResult> {
    const updateProcedureVendorStatusesAction = new UpdateProcedureVendorStatusesAction(procedureVendorStatuses);
    updateProcedureVendorStatusesAction.Do(this)
    return updateProcedureVendorStatusesAction.response;
  }

  validateProcedureVendorStatusExcelData(excelData: any[] ) {
    const validateProcedureVendorStatusExcelDataAction = new ValidateProcedureVendorStatusExcelDataAction(excelData );
    validateProcedureVendorStatusExcelDataAction.Do(this)
    return validateProcedureVendorStatusExcelDataAction.response;
  }
}

