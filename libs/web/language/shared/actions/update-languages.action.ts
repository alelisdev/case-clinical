
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {LanguageBusinessActionBase} from './language.business-action-base'
import {LanguageNameIsValidRule} from '../rules/language-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateLanguageInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateLanguagesAction extends LanguageBusinessActionBase<UpdateResult> {

    constructor(private languages: UserUpdateLanguageInput[]) {
        super('UpdateLanguagesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.languages,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateLanguages({ input: { languages: this.languages} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateLanguageAction extends LanguageBusinessActionBase<boolean> {

    constructor(private language: UserUpdateLanguageInput, private languageId: string) {
        super('UpdateLanguageAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.language,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.languageId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateLanguage({languageId: this.languageId, input: this.language }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
