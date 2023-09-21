
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { Gender, UserCreateGenderInput, UserUpdateGenderInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateGenderExcelDataAction } from './actions/validate-gender-excel-data.action'
import { CreateGenderAction } from './actions/create-gender.action'
import { UpdateGendersAction, UpdateGenderAction } from './actions/update-genders.action'


@Injectable({providedIn: 'root'})
export class GenderBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.GenderBusinessProviderService', logger, serviceContext)
  }

  createGender(input: UserCreateGenderInput): Observable<Gender> {
    const action = new CreateGenderAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateGender(input: UserUpdateGenderInput, genderId: string): Observable<Gender> {
    const action = new UpdateGenderAction(input, genderId); 
    action.Do(this);
    return action.response;   
  }
  
  importGenders(genders: UserUpdateGenderInput[]): Observable<UpdateResult> {
    const updateGendersAction = new UpdateGendersAction(genders);
    updateGendersAction.Do(this)
    return updateGendersAction.response;
  }

  validateGenderExcelData(excelData: any[] ) {
    const validateGenderExcelDataAction = new ValidateGenderExcelDataAction(excelData );
    validateGenderExcelDataAction.Do(this)
    return validateGenderExcelDataAction.response;
  }
}

