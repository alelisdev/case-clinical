
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {ServiceBusinessActionBase} from './service.business-action-base'
import {ServiceNameIsValidRule} from '../rules/service-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateServiceInput, UpdateResult} from '@case-clinical/shared/util/sdk';

export class UpdateServicesAction extends ServiceBusinessActionBase<UpdateResult> {

    constructor(private services: UserUpdateServiceInput[]) {
        super('UpdateServicesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.services,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateServices({ input: { services: this.services} }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}

export class UpdateServiceAction extends ServiceBusinessActionBase<boolean> {

    constructor(private service: UserUpdateServiceInput, private serviceId: string) {
        super('UpdateServiceAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.service,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.serviceId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateService({serviceId: this.serviceId, input: this.service }).pipe(
                switchMap((response) => of(response.data.updated))
            )
    }
}
