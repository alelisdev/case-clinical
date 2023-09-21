import { AcademyBusinessActionBase } from './academy.business-action-base'
import { StringIsNotNullEmptyRange, IsNotNullOrUndefined, IsNumber, Max, Min } from '@schema-driven/rules-engine';
import { catchError, of, EMPTY, switchMap } from 'rxjs'
import { UserCreateAcademyCategoryInput, Course } from '@case-clinical/web/core/data-access'

export class CreateAcademyCategoryAction extends AcademyBusinessActionBase<Course> {
  constructor(private input: UserCreateAcademyCategoryInput) {
    super('CreateAcademyCategoryAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
        new StringIsNotNullEmptyRange('title', 'Title should be more than 2 characters', this.input.title, 2, 100000, true)
    ).addRule(
        new StringIsNotNullEmptyRange('slug', 'Slug should be more than 2 characters', this.input.slug, 2, 100000, true)
    )
  }

  performAction() {
    this.response = this.businessProvider.data.userCreateAcademyCategory({ input: this.input }).pipe
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
