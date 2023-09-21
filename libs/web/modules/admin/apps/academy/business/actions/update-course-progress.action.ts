import { StringIsNotNullEmptyRange, IsNotNullOrUndefined, IsNumber, Max, Min } from '@schema-driven/rules-engine';
import { AcademyBusinessActionBase } from './academy.business-action-base'
import { UserUpdateUserCourseProgressInput, Course } from '@case-clinical/web/core/data-access'
import { catchError, of, EMPTY, switchMap } from 'rxjs'

export class UpdateCourseProgressAction extends AcademyBusinessActionBase<Course> {
  constructor(private courseProgressId: string, private input: UserUpdateUserCourseProgressInput) {
    super('UpdateCourseProgressAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
        new IsNotNullOrUndefined('courseProgressId', 'CourseProgressId is required', this.courseProgressId, true)
    ).addRule(
        new IsNumber('currentStep', 'curretStep should be number', this.input.currentStep, true)
    )
  }

  performAction() {
    console.log(this.input)
    this.response = this.businessProvider.data.userUpdateUserCourseProgress({ userCourseProgressId: this.courseProgressId, input: this.input }).pipe
    (
        catchError(() => {
            this.response = this.createFailResponse();
            return EMPTY;
        }),
        switchMap((result) => {
            return of(result.data.updated)
        })
    )
  }
}
