
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {CategoryBusinessActionBase} from './category.business-action-base'
import {CategoryNameIsValidRule} from '../rules/category-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateCategoryInput} from '@case-clinical/shared/util/sdk';

export class UpdateCategoriesAction extends CategoryBusinessActionBase<boolean> {

    constructor(private categories: UserUpdateCategoryInput[]) {
        super('UpdateCategoriesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.categories,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateCategories({ input: { categories: this.categories} }).pipe(
                switchMap(() => of(true))
            )
    }
}

export class UpdateCategoryAction extends CategoryBusinessActionBase<boolean> {

    constructor(private category: UserUpdateCategoryInput, private categoryId: string) {
        super('UpdateCategoryAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.category,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.categoryId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateCategory({categoryId: this.categoryId, input: this.category }).pipe(
                switchMap(() => of(true))
            )
    }
}
