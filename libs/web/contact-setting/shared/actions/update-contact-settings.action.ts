
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {ContactSettingBusinessActionBase} from './contact-setting.business-action-base'
import {ContactSettingNameIsValidRule} from '../rules/contact-setting-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateContactSettingInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateContactSettingsAction extends ContactSettingBusinessActionBase<UpdateResult> {

    constructor(private contactSettings: UserUpdateContactSettingInput[]) {
        super('UpdateContactSettingsAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.contactSettings,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateContactSettings({ input: { contactSettings: this.contactSettings} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateContactSettingAction extends ContactSettingBusinessActionBase<boolean> {

    constructor(private contactSetting: UserUpdateContactSettingInput, private contactSettingId: string) {
        super('UpdateContactSettingAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.contactSetting,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.contactSettingId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateContactSetting({contactSettingId: this.contactSettingId, input: this.contactSetting }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
