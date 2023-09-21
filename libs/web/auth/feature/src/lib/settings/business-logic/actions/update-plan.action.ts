import { SettingsBusinessActionBase } from './settings.business-action-base'
import { IsNotNullOrUndefined } from '@schema-driven/rules-engine';
import { catchError, of, EMPTY, switchMap } from 'rxjs'
import { Course } from '@case-clinical/web/core/data-access'

export class UpdatePlanAction extends SettingsBusinessActionBase<Course> {
  constructor(private planId: string) {
    super('UpdatePlanAction')
  }

  preValidateAction() {
    this.validationContext.addRule(
      new IsNotNullOrUndefined('planId', 'planId should not be null', this.planId, true)
    )
  }

  performAction() {
    // this.response = this.businessProvider.data.userUpdateAcademyCategory({academyCategoryId: this.categoryId, input: this.input }).pipe
    // (
    //     catchError((error) => {
    //       console.log('catChError')
    //         this.response = this.createFailResponse();
    //         return EMPTY;
    //     }),
    //     switchMap((result) => {
    //         return of(result.data.updated)
    //     })
    // )
  }
}
