import { StringIsNotNullEmptyRange, IsNotNullOrUndefined, IsNumber, Max, Min } from '@schema-driven/rules-engine';
import { AcademyBusinessActionBase } from './academy.business-action-base'
import { UserUpdateStepInput, Course } from '@case-clinical/web/core/data-access'
import { catchError, of, EMPTY, switchMap } from 'rxjs'

export class UpdateCourseStepAction extends AcademyBusinessActionBase<Course> {
  constructor(private stepId: string, private input: UserUpdateStepInput) {
    super('UpdateCourseStepAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
       new IsNotNullOrUndefined('id', 'CourseStep id is required', this.stepId, true)
    ).addRule(
      new IsNotNullOrUndefined('courseId', 'CourseId is required', this.input.courseId, true)
    ).addRule(
        new StringIsNotNullEmptyRange('title', 'Title should be more than 2 characters', this.input.title, 2, 1000, true)
    ).addRule(
        new StringIsNotNullEmptyRange('subtitle', 'Subtitle should be more than 2 characters', this.input.subtitle, 2, 1000, true)
    ).addRule(
        new StringIsNotNullEmptyRange('content', 'Content should be more than 2 characters', this.input.content, 2, 1000000, true)
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userUpdateStep({ stepId: this.stepId, input: this.input }).pipe
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
