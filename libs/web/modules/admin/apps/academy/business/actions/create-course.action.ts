import { AcademyBusinessActionBase } from './academy.business-action-base'
import { StringIsNotNullEmptyRange, IsNotNullOrUndefined, IsNumber, Max, Min } from '@schema-driven/rules-engine';
import { catchError, of, EMPTY, switchMap } from 'rxjs'
import { UserCreateCourseInput, Course } from '@case-clinical/web/core/data-access'

export class CreateCourseAction extends AcademyBusinessActionBase<Course> {
  constructor(private input: UserCreateCourseInput) {
    super('CreateCourseAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new IsNotNullOrUndefined('categoryId', 'You have to choose one of the category', this.input.categoryId, true)
    ).addRule(
        new StringIsNotNullEmptyRange('title', 'Title should be more than 2 characters', this.input.title, 2, 100000, true)
    ).addRule(
        new StringIsNotNullEmptyRange('slug', 'Slug should be more than 2 characters', this.input.slug, 2, 100000, true)
    ).addRule(
        new StringIsNotNullEmptyRange('description', 'Description should be more than 2 characters', this.input.description, 2, 100000, true)
    ).addRule(
        new IsNumber('duration', 'Duration should be integer', this.input.duration, true)
    ).addRule(
        new Min('duration', 'Duration should be greater than 1', this.input.duration, 1, true)
    ).addRule(
        new Max('duration', 'Duration should be smaller than 1000', this.input.duration, 1000, true)
    )
  }

  performAction() {
    console.log('performAction')
    this.response = this.businessProvider.data.userCreateCourse({ input: this.input }).pipe
    (
        catchError((error) => {
          console.log('catChError')
            this.response = this.createFailResponse();
            return EMPTY;
        }),
        switchMap((result) => {
            return of(result.data.created)
        })
    )
  }
}
