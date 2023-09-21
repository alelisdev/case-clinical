
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { User, UserCreateUserInput, UserUpdateUserInput, UpdateResult, Patient, ClinicalProvider, Attorney } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateUserExcelDataAction } from './actions/validate-user-excel-data.action'
import { CreateUserAction } from './actions/create-user.action'
import { UpdateUsersAction, UpdateUserAction } from './actions/update-users.action'


@Injectable({providedIn: 'root',
})
export class UserBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.UserBusinessProviderService', logger, serviceContext)
  }

  createUser(input: UserCreateUserInput): Observable<User> {
    const action = new CreateUserAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateUser(input: UserUpdateUserInput, userId: string): Observable<User> {
    const action = new UpdateUserAction(input, userId); 
    action.Do(this);
    return action.response;   
  }
  
  importUsers(users: UserUpdateUserInput[]): Observable<UpdateResult> {
    const updateUsersAction = new UpdateUsersAction(users);
    updateUsersAction.Do(this)
    return updateUsersAction.response;
  }

  validateUserExcelData(excelData: any[], patients: Patient[], providers: ClinicalProvider[], attorneys: Attorney[]) {
    const validateUserExcelDataAction = new ValidateUserExcelDataAction(excelData, patients, providers, attorneys);
    validateUserExcelDataAction.Do(this)
    return validateUserExcelDataAction.response;
  }
}

