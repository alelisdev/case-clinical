
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {ImplantCategoryBusinessActionBase} from './implant-category.business-action-base'
import {ImplantCategoryNameIsValidRule} from '../rules/implant-category-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateImplantCategoryInput} from '@case-clinical/shared/util/sdk';

export class UpdateImplantCategoriesAction extends ImplantCategoryBusinessActionBase<boolean> {

    constructor(private implantCategories: UserUpdateImplantCategoryInput[]) {
        super('UpdateImplantCategoriesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.implantCategories,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateImplantCategories({ input: { implantCategories: this.implantCategories} }).pipe(
                switchMap(() => of(true))
            )
    }
}

export class UpdateImplantCategoryAction extends ImplantCategoryBusinessActionBase<boolean> {

    constructor(private implantCategory: UserUpdateImplantCategoryInput, private implantCategoryId: string) {
        super('UpdateImplantCategoryAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.implantCategory,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.implantCategoryId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateImplantCategory({implantCategoryId: this.implantCategoryId, input: this.implantCategory }).pipe(
                switchMap(() => of(true))
            )
    }
}
