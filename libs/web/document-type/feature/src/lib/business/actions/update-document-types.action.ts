
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {DocumentTypeBusinessActionBase} from './document-type.business-action-base'
import {DocumentTypeNameIsValidRule} from '../rules/document-type-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateDocumentTypeInput} from '@case-clinical/shared/util/sdk';

export class UpdateDocumentTypesAction extends DocumentTypeBusinessActionBase<boolean> {

    constructor(private documentTypes: UserUpdateDocumentTypeInput[]) {
        super('UpdateDocumentTypesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.documentTypes,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateDocumentTypes({ input: { documentTypes: this.documentTypes} }).pipe(
                switchMap(() => of(true))
            )
    }
}

export class UpdateDocumentTypeAction extends DocumentTypeBusinessActionBase<boolean> {

    constructor(private documentType: UserUpdateDocumentTypeInput, private documentTypeId: string) {
        super('UpdateDocumentTypeAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.documentType,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.documentTypeId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateDocumentType({documentTypeId: this.documentTypeId, input: this.documentType }).pipe(
                switchMap(() => of(true))
            )
    }
}
