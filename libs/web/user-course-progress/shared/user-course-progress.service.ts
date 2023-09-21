
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { UserCourseProgress, UserCreateUserCourseProgressInput, UserUpdateUserCourseProgressInput, UpdateResult, User, Course } from "@case-clinical/shared/util/sdk";
import { UserCourseProgressBusinessProviderService } from "./user-course-progress.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
export class UserCourseProgressService extends ServiceBase {
 constructor(
  @Inject(UserCourseProgressBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: UserCourseProgressBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("UserCourseProgressService", loggingService, serviceContext);
 }

    createUserCourseProgress(input: UserCreateUserCourseProgressInput): Observable<UserCourseProgress> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createUserCourseProgress(filteredObj);
    }

    updateUserCourseProgress(input: UserUpdateUserCourseProgressInput, userCourseProgressId: string): Observable<UserCourseProgress> {
        return this.businessProvider.updateUserCourseProgress(input, userCourseProgressId);
    }

    importUserCourseProgresses(userCourseProgresses: UserUpdateUserCourseProgressInput[]): Observable<UpdateResult> {
        return this.businessProvider.importUserCourseProgresses(userCourseProgresses);
    }

    validateUserCourseProgressExcelData(excelData: any[], users: User[], courses: Course[]) {
      return this.businessProvider.validateUserCourseProgressExcelData(excelData, users, courses);
    }
}

