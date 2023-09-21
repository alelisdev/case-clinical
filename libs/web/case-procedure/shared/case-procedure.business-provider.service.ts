
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { CaseProcedure, UserCreateCaseProcedureInput, UserUpdateCaseProcedureInput, UpdateResult, LegalCase, Appointment, Location } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateCaseProcedureExcelDataAction } from './actions/validate-case-procedure-excel-data.action'
import { CreateCaseProcedureAction } from './actions/create-case-procedure.action'
import { UpdateCaseProceduresAction, UpdateCaseProcedureAction } from './actions/update-case-procedures.action'


@Injectable({providedIn: 'root'})
export class CaseProcedureBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.CaseProcedureBusinessProviderService', logger, serviceContext)
  }

  createCaseProcedure(input: UserCreateCaseProcedureInput): Observable<CaseProcedure> {
    const action = new CreateCaseProcedureAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateCaseProcedure(input: UserUpdateCaseProcedureInput, caseProcedureId: string): Observable<CaseProcedure> {
    const action = new UpdateCaseProcedureAction(input, caseProcedureId); 
    action.Do(this);
    return action.response;   
  }
  
  importCaseProcedures(caseProcedures: UserUpdateCaseProcedureInput[]): Observable<UpdateResult> {
    const updateCaseProceduresAction = new UpdateCaseProceduresAction(caseProcedures);
    updateCaseProceduresAction.Do(this)
    return updateCaseProceduresAction.response;
  }

  validateCaseProcedureExcelData(excelData: any[], legalCases: LegalCase[], appointments: Appointment[], locations: Location[]) {
    const validateCaseProcedureExcelDataAction = new ValidateCaseProcedureExcelDataAction(excelData, legalCases, appointments, locations);
    validateCaseProcedureExcelDataAction.Do(this)
    return validateCaseProcedureExcelDataAction.response;
  }
}

