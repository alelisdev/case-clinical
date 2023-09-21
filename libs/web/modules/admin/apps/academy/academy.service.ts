import { of, switchMap } from 'rxjs'
import {
  AcademyCategory,
  Course,
  Step,
  UserCourseProgress,
  UserCreateAcademyCategoryInput,
  UserCreateCourseInput,
  UserCreateStepInput,
  UserCreateUserCourseProgressInput,
  UserUpdateAcademyCategoryInput,
  UserUpdateCourseInput,
  UserUpdateStepInput,
  UserUpdateUserCourseProgressInput,
  WebCoreDataAccessService,
} from '@case-clinical/web/core/data-access'
import { AcademyBusinessProviderService } from "./business/academy.business-provider.service";
import { Inject, Injectable, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
export class AcademyService extends ServiceBase {
  /**
   * Constructor
   */
  constructor(
    @Inject(AcademyBusinessProviderService)
    @Optional() serviceContext: ServiceContext,
    private businessProvider: AcademyBusinessProviderService,
    loggingService: LoggingService,
    private data: WebCoreDataAccessService,
   ) {
      super("AcademyService", loggingService, serviceContext);
  }

  createAcademyCategory(input: UserCreateAcademyCategoryInput): Observable<AcademyCategory> {
    return this.businessProvider.createAcademyCategory(input);
   }

  updateAcademyCategory(categoryId: string, input: UserUpdateAcademyCategoryInput) {
    return this.businessProvider.updateAcademyCategory(categoryId, input)
   }

  createCourse(input: UserCreateCourseInput): Observable<Course> {
    return this.businessProvider.createCourse(input);
  }

  updateCourse(courseId: string, input: UserUpdateCourseInput): Observable<Course> {
    return this.businessProvider.updateCourse(courseId, input);
  }

  createCourseStep(input: UserCreateStepInput): Observable<Step> {
    return this.businessProvider.createCourseStep(input)
  }

  updateCourseStep(stepId: string, input: UserUpdateStepInput): Observable<Step> {
    return this.businessProvider.updateCourseStep(stepId, input)
  }

  updateStepOrder(stepId: string, order: number): Observable<Step> {
    return this.data.userUpdateStepOrder({ stepId, order }).pipe(
      switchMap((response) => of(response.data.result))
    )
  }

  createCourseProgress(input: UserCreateUserCourseProgressInput): Observable<UserCourseProgress> {
    return this.businessProvider.createCourseProgress(input)
  }

  updateCourseProgress(courseProgressId: string, input: UserUpdateUserCourseProgressInput): Observable<UserCourseProgress> {
    return this.businessProvider.updateCourseProgress(courseProgressId, input)
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Get categories
   */
  getCategories(): Observable<AcademyCategory[]> {
    return this.data.userAcademyCategories({ input: {} }).pipe(
      switchMap((response: any) => of(response.data.items)),
    )
  }

  /**
   * Get courses
   */
  getCourses(): Observable<Course[]> {
    return this.data.userCourses({ input: {} }).pipe(
      switchMap((response: any) => of(response.data.items))
    )
  }

  /**
   * Get course by id
   */
  getCourseById(id: string): Observable<Course> {
    return this.data.userCourse({ courseId: id }).pipe(
      switchMap((response: any) => of(response.data.course))
    )
  }
}
