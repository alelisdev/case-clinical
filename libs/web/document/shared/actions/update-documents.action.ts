
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {DocumentBusinessActionBase} from './document.business-action-base'
import {DocumentNameIsValidRule} from '../rules/document-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateDocumentInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateDocumentsAction extends DocumentBusinessActionBase<UpdateResult> {

    constructor(private documents: UserUpdateDocumentInput[]) {
        super('UpdateDocumentsAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.documents,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateDocuments({ input: { documents: this.documents} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateDocumentAction extends DocumentBusinessActionBase<boolean> {

    constructor(private document: UserUpdateDocumentInput, private documentId: string) {
        super('UpdateDocumentAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.document,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.documentId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateDocument({documentId: this.documentId, input: this.document }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
