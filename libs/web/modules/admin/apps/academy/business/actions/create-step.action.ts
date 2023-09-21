import { StringIsNotNullEmptyRange, IsNotNullOrUndefined, IsNumber, Max, Min } from '@schema-driven/rules-engine';
import { AcademyBusinessActionBase } from './academy.business-action-base'
import { UserCreateStepInput, Course } from '@case-clinical/web/core/data-access'
import { catchError, of, EMPTY, switchMap } from 'rxjs'

export class CreateCourseStepAction extends AcademyBusinessActionBase<Course> {
  constructor(private input: UserCreateStepInput) {
    super('CreateCourseStepAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
        new IsNotNullOrUndefined('courseId', 'CourseId is required', this.input.courseId, true)
    ).addRule(
      new StringIsNotNullEmptyRange('title', 'Title should be more than 2 characters', this.input.title, 2, 1000, true)
    ).addRule(
        new StringIsNotNullEmptyRange('subtitle', 'Subtitle should be more than 2 characters', this.input.subtitle, 2, 100000, true)
    ).addRule(
      new StringIsNotNullEmptyRange('content', 'Content should be more than 2 characters', this.input.content, 2, 100000, true)
    )
  }

  performAction() {
    console.log(this.input)
    this.response = this.businessProvider.data.userCreateStep({ input: this.input }).pipe
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
