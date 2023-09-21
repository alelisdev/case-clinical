
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { AccidentType, UserCreateAccidentTypeInput, UserUpdateAccidentTypeInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateAccidentTypeExcelDataAction } from './actions/validate-accident-type-excel-data.action'
import { CreateAccidentTypeAction } from './actions/create-accident-type.action'
import { UpdateAccidentTypesAction, UpdateAccidentTypeAction } from './actions/update-accident-types.action'


@Injectable({providedIn: 'root'})
export class AccidentTypeBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.AccidentTypeBusinessProviderService', logger, serviceContext)
  }

  createAccidentType(input: UserCreateAccidentTypeInput): Observable<AccidentType> {
    const action = new CreateAccidentTypeAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateAccidentType(input: UserUpdateAccidentTypeInput, accidentTypeId: string): Observable<AccidentType> {
    const action = new UpdateAccidentTypeAction(input, accidentTypeId); 
    action.Do(this);
    return action.response;   
  }
  
  importAccidentTypes(accidentTypes: UserUpdateAccidentTypeInput[]): Observable<UpdateResult> {
    const updateAccidentTypesAction = new UpdateAccidentTypesAction(accidentTypes);
    updateAccidentTypesAction.Do(this)
    return updateAccidentTypesAction.response;
  }

  validateAccidentTypeExcelData(excelData: any[] ) {
    const validateAccidentTypeExcelDataAction = new ValidateAccidentTypeExcelDataAction(excelData );
    validateAccidentTypeExcelDataAction.Do(this)
    return validateAccidentTypeExcelDataAction.response;
  }
}

