import { CreateAcademyCategoryAction } from './actions/create-academy-category.action';
import { CreateCourseAction } from './actions/create-course.action';
import { CreateCourseProgressAction } from './actions/create-course-progress.action';
import { CreateCourseStepAction } from './actions/create-step.action';
import { Injectable } from '@angular/core'
import { LoggingService } from '@schema-driven/logging'
import { Observable } from 'rxjs'
import { ServiceBase, ServiceContext } from '@schema-driven/foundation'
import { UpdateAcademyCategoryAction } from './actions/update-academy-category.action';
import { UpdateCourseAction } from './actions/update-course.action';
import { UpdateCourseProgressAction } from './actions/update-course-progress.action';
import { UpdateCourseStepAction } from './actions/update-course-step.action';
import { UserCreateCourseInput, UserCourseProgress, UserUpdateCourseInput, Course } from '@case-clinical/web/core/data-access';
import { UserCreateStepInput, UserCreateAcademyCategoryInput, UserUpdateAcademyCategoryInput, AcademyCategory, UserUpdateStepInput, UserCreateUserCourseProgressInput, UserUpdateUserCourseProgressInput, Step } from '@case-clinical/web/core/data-access'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'

@Injectable({
  providedIn: 'root',
})
export class AcademyBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.AcademyBusinessProviderService', logger, serviceContext)
  }

  createAcademyCategory(input: UserCreateAcademyCategoryInput): Observable<AcademyCategory> {
    const action = new CreateAcademyCategoryAction(input);
    action.Do(this)
    return action.response;
  }

  updateAcademyCategory(categoryId: string, input: UserUpdateAcademyCategoryInput): Observable<AcademyCategory> {
    const action = new UpdateAcademyCategoryAction(categoryId, input);
    action.Do(this)
    return action.response;
  }

  createCourse(input: UserCreateCourseInput): Observable<Course> {
    const action = new CreateCourseAction(input)
    action.Do(this)
    console.log(action.response)
    return action.response;
  }

  updateCourse(courseId: string, input: UserUpdateCourseInput): Observable<Course> {
    const action = new UpdateCourseAction(courseId, input)
    action.Do(this)
    return action.response;
  }

  createCourseStep(input: UserCreateStepInput): Observable<Step> {
      const action = new CreateCourseStepAction(input)
      action.Do(this)
      return action.response
  }

  updateCourseStep(stepId: string, input: UserUpdateStepInput) {
    console.log('business-provider, stepId = ', stepId)
    const action = new UpdateCourseStepAction(stepId, input)
    action.Do(this)
    return action.response;
  }

  createCourseProgress(input: UserCreateUserCourseProgressInput): Observable<UserCourseProgress> {
    const action = new CreateCourseProgressAction(input)
    action.Do(this)
    return action.response;
  }

  updateCourseProgress(courseProgressId: string, input: UserUpdateUserCourseProgressInput): Observable<UserCourseProgress> {
    const action = new UpdateCourseProgressAction(courseProgressId, input)
    action.Do(this)
    return action.response
  }
}
