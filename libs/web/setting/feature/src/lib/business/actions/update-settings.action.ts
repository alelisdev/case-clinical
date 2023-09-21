
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {SettingBusinessActionBase} from './setting.business-action-base'
import {SettingNameIsValidRule} from '../rules/setting-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateSettingInput} from '@case-clinical/shared/util/sdk';

export class UpdateSettingsAction extends SettingBusinessActionBase<boolean> {

    constructor(private settings: UserUpdateSettingInput[]) {
        super('UpdateSettingsAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.settings,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateSettings({ input: { settings: this.settings} }).pipe(
                switchMap(() => of(true))
            )
    }
}

export class UpdateSettingAction extends SettingBusinessActionBase<boolean> {

    constructor(private setting: UserUpdateSettingInput, private settingId: string) {
        super('UpdateSettingAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.setting,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.settingId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateSetting({settingId: this.settingId, input: this.setting }).pipe(
                switchMap(() => of(true))
            )
    }
}
