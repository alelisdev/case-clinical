
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { Procedure, UserCreateProcedureInput, UserUpdateProcedureInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateProcedureExcelDataAction } from './actions/validate-procedure-excel-data.action'
import { CreateProcedureAction } from './actions/create-procedure.action'
import { UpdateProceduresAction, UpdateProcedureAction } from './actions/update-procedures.action'


@Injectable({providedIn: 'root'})
export class ProcedureBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.ProcedureBusinessProviderService', logger, serviceContext)
  }

  createProcedure(input: UserCreateProcedureInput): Observable<Procedure> {
    const action = new CreateProcedureAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateProcedure(input: UserUpdateProcedureInput, procedureId: string): Observable<Procedure> {
    const action = new UpdateProcedureAction(input, procedureId); 
    action.Do(this);
    return action.response;   
  }
  
  importProcedures(procedures: UserUpdateProcedureInput[]): Observable<UpdateResult> {
    const updateProceduresAction = new UpdateProceduresAction(procedures);
    updateProceduresAction.Do(this)
    return updateProceduresAction.response;
  }

  validateProcedureExcelData(excelData: any[] ) {
    const validateProcedureExcelDataAction = new ValidateProcedureExcelDataAction(excelData );
    validateProcedureExcelDataAction.Do(this)
    return validateProcedureExcelDataAction.response;
  }
}

