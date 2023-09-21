
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {CostCategoryBusinessActionBase} from './cost-category.business-action-base'
import {CostCategoryNameIsValidRule} from '../rules/cost-category-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateCostCategoryInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateCostCategoriesAction extends CostCategoryBusinessActionBase<UpdateResult> {

    constructor(private costCategories: UserUpdateCostCategoryInput[]) {
        super('UpdateCostCategoriesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.costCategories,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateCostCategories({ input: { costCategories: this.costCategories} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateCostCategoryAction extends CostCategoryBusinessActionBase<boolean> {

    constructor(private costCategory: UserUpdateCostCategoryInput, private costCategoryId: string) {
        super('UpdateCostCategoryAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.costCategory,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.costCategoryId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateCostCategory({costCategoryId: this.costCategoryId, input: this.costCategory }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
