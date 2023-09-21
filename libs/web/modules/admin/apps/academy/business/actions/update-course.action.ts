import { StringIsNotNullEmptyRange, IsNotNullOrUndefined, IsNumber, Max, Min } from '@schema-driven/rules-engine';
import { AcademyBusinessActionBase } from './academy.business-action-base'
import { UserUpdateCourseInput, Course } from '@case-clinical/web/core/data-access'
import { catchError, of, EMPTY, switchMap } from 'rxjs'

export class UpdateCourseAction extends AcademyBusinessActionBase<Course> {
  constructor(private courseId: string, private input: UserUpdateCourseInput) {
    super('UpdateCourseAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
       new IsNotNullOrUndefined('id', 'Course id is required', this.courseId, true)
    ).addRule(
      new IsNotNullOrUndefined('categoryId', 'You have to choose one of the category', this.input.categoryId, true)
    ).addRule(
        new StringIsNotNullEmptyRange('title', 'Title should be more than 2 characters', this.input.title, 2, 100000, true)
    ).addRule(
        new StringIsNotNullEmptyRange('slug', 'Slug should be more than 2 characters', this.input.title, 2, 100000, true)
    ).addRule(
        new StringIsNotNullEmptyRange('description', 'Description should be more than 2 characters', this.input.title, 2, 100000, true)
    ).addRule(
        new IsNumber('duration', 'Duration should be integer', this.input.duration, true)
    ).addRule(
        new Min('duration', 'Duration should be greater than 1', this.input.duration, 1, true)
    ).addRule(
        new Max('duration', 'Duration should be smaller than 1000', this.input.duration, 1000, true)
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userUpdateCourse({ courseId: this.courseId, input: this.input }).pipe
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
