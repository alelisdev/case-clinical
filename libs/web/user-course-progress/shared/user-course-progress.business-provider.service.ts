
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { UserCourseProgress, UserCreateUserCourseProgressInput, UserUpdateUserCourseProgressInput, UpdateResult, User, Course } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateUserCourseProgressExcelDataAction } from './actions/validate-user-course-progress-excel-data.action'
import { CreateUserCourseProgressAction } from './actions/create-user-course-progress.action'
import { UpdateUserCourseProgressesAction, UpdateUserCourseProgressAction } from './actions/update-user-course-progresses.action'


@Injectable({providedIn: 'root',
})
export class UserCourseProgressBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.UserCourseProgressBusinessProviderService', logger, serviceContext)
  }

  createUserCourseProgress(input: UserCreateUserCourseProgressInput): Observable<UserCourseProgress> {
    const action = new CreateUserCourseProgressAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateUserCourseProgress(input: UserUpdateUserCourseProgressInput, userCourseProgressId: string): Observable<UserCourseProgress> {
    const action = new UpdateUserCourseProgressAction(input, userCourseProgressId); 
    action.Do(this);
    return action.response;   
  }
  
  importUserCourseProgresses(userCourseProgresses: UserUpdateUserCourseProgressInput[]): Observable<UpdateResult> {
    const updateUserCourseProgressesAction = new UpdateUserCourseProgressesAction(userCourseProgresses);
    updateUserCourseProgressesAction.Do(this)
    return updateUserCourseProgressesAction.response;
  }

  validateUserCourseProgressExcelData(excelData: any[], users: User[], courses: Course[]) {
    const validateUserCourseProgressExcelDataAction = new ValidateUserCourseProgressExcelDataAction(excelData, users, courses);
    validateUserCourseProgressExcelDataAction.Do(this)
    return validateUserCourseProgressExcelDataAction.response;
  }
}

