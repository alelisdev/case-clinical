
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { ProcedureStatus, UserCreateProcedureStatusInput, UserUpdateProcedureStatusInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateProcedureStatusExcelDataAction } from './actions/validate-procedure-status-excel-data.action'
import { CreateProcedureStatusAction } from './actions/create-procedure-status.action'
import { UpdateProcedureStatusesAction, UpdateProcedureStatusAction } from './actions/update-procedure-statuses.action'


@Injectable({providedIn: 'root'})
export class ProcedureStatusBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.ProcedureStatusBusinessProviderService', logger, serviceContext)
  }

  createProcedureStatus(input: UserCreateProcedureStatusInput): Observable<ProcedureStatus> {
    const action = new CreateProcedureStatusAction(input);
    action.Do(this);
    return action.response;
  }

  updateProcedureStatus(input: UserUpdateProcedureStatusInput, procedureStatusId: string): Observable<ProcedureStatus> {
    const action = new UpdateProcedureStatusAction(input, procedureStatusId);
    action.Do(this);
    return action.response;
  }

  importProcedureStatuses(procedureStatuses: UserUpdateProcedureStatusInput[]): Observable<UpdateResult> {
    const updateProcedureStatusesAction = new UpdateProcedureStatusesAction(procedureStatuses);
    updateProcedureStatusesAction.Do(this)
    return updateProcedureStatusesAction.response;
  }

  validateProcedureStatusExcelData(excelData: any[] ) {
    const validateProcedureStatusExcelDataAction = new ValidateProcedureStatusExcelDataAction(excelData );
    validateProcedureStatusExcelDataAction.Do(this)
    return validateProcedureStatusExcelDataAction.response;
  }
}

