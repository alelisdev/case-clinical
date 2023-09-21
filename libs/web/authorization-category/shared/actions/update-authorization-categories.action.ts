
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {AuthorizationCategoryBusinessActionBase} from './authorization-category.business-action-base'
import {AuthorizationCategoryNameIsValidRule} from '../rules/authorization-category-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateAuthorizationCategoryInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateAuthorizationCategoriesAction extends AuthorizationCategoryBusinessActionBase<UpdateResult> {

    constructor(private authorizationCategories: UserUpdateAuthorizationCategoryInput[]) {
        super('UpdateAuthorizationCategoriesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.authorizationCategories,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateAuthorizationCategories({ input: { authorizationCategories: this.authorizationCategories} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateAuthorizationCategoryAction extends AuthorizationCategoryBusinessActionBase<boolean> {

    constructor(private authorizationCategory: UserUpdateAuthorizationCategoryInput, private authorizationCategoryId: string) {
        super('UpdateAuthorizationCategoryAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.authorizationCategory,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.authorizationCategoryId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateAuthorizationCategory({authorizationCategoryId: this.authorizationCategoryId, input: this.authorizationCategory }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
