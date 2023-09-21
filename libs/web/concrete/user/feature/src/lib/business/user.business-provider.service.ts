
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateUserAction} from './actions/create-user.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {User, UserCreateUserInput, UserUpdateUserInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateUsersAction, UpdateUserAction } from './actions/update-users.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class UserBusinessProviderService extends ServiceBase {constructor(
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
  
  importUsers(users: UserUpdateUserInput[]): Observable<boolean> {
    const updateUsersAction = new UpdateUsersAction(users);
    updateUsersAction.Do(this)
    return updateUsersAction.response;
  }
}

