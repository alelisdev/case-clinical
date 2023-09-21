
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { ProcedureType, UserCreateProcedureTypeInput, UserUpdateProcedureTypeInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateProcedureTypeExcelDataAction } from './actions/validate-procedure-type-excel-data.action'
import { CreateProcedureTypeAction } from './actions/create-procedure-type.action'
import { UpdateProcedureTypesAction, UpdateProcedureTypeAction } from './actions/update-procedure-types.action'


@Injectable({providedIn: 'root'})
export class ProcedureTypeBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.ProcedureTypeBusinessProviderService', logger, serviceContext)
  }

  createProcedureType(input: UserCreateProcedureTypeInput): Observable<ProcedureType> {
    const action = new CreateProcedureTypeAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateProcedureType(input: UserUpdateProcedureTypeInput, procedureTypeId: string): Observable<ProcedureType> {
    const action = new UpdateProcedureTypeAction(input, procedureTypeId); 
    action.Do(this);
    return action.response;   
  }
  
  importProcedureTypes(procedureTypes: UserUpdateProcedureTypeInput[]): Observable<UpdateResult> {
    const updateProcedureTypesAction = new UpdateProcedureTypesAction(procedureTypes);
    updateProcedureTypesAction.Do(this)
    return updateProcedureTypesAction.response;
  }

  validateProcedureTypeExcelData(excelData: any[] ) {
    const validateProcedureTypeExcelDataAction = new ValidateProcedureTypeExcelDataAction(excelData );
    validateProcedureTypeExcelDataAction.Do(this)
    return validateProcedureTypeExcelDataAction.response;
  }
}

