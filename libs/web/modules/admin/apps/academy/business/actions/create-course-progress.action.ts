import { StringIsNotNullEmptyRange, IsNotNullOrUndefined, IsNumber, Max, Min } from '@schema-driven/rules-engine';
import { AcademyBusinessActionBase } from './academy.business-action-base'
import { UserCreateUserCourseProgressInput, Course } from '@case-clinical/web/core/data-access'
import { catchError, of, EMPTY, switchMap } from 'rxjs'

export class CreateCourseProgressAction extends AcademyBusinessActionBase<Course> {
  constructor(private input: UserCreateUserCourseProgressInput) {
    super('CreateCourseProgressAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
        new IsNotNullOrUndefined('courseId', 'CourseId is required', this.input.courseId, true)
    )
  }

  performAction() {
    console.log(this.input)
    this.response = this.businessProvider.data.userCreateUserCourseProgress({ input: this.input }).pipe
    (
        catchError(() => {
            this.response = this.createFailResponse();
            return EMPTY;
        }),
        switchMap((result) => {
            return of(result.data.created)
        })
    )
  }
}
