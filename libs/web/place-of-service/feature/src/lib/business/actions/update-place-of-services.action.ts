
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {PlaceOfServiceBusinessActionBase} from './place-of-service.business-action-base'
import {PlaceOfServiceNameIsValidRule} from '../rules/place-of-service-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdatePlaceOfServiceInput} from '@case-clinical/shared/util/sdk';

export class UpdatePlaceOfServicesAction extends PlaceOfServiceBusinessActionBase<boolean> {

    constructor(private placeOfServices: UserUpdatePlaceOfServiceInput[]) {
        super('UpdatePlaceOfServicesAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.placeOfServices,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdatePlaceOfServices({ input: { placeOfServices: this.placeOfServices} }).pipe(
                switchMap(() => of(true))
            )
    }
}

export class UpdatePlaceOfServiceAction extends PlaceOfServiceBusinessActionBase<boolean> {

    constructor(private placeOfService: UserUpdatePlaceOfServiceInput, private placeOfServiceId: string) {
        super('UpdatePlaceOfServiceAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.placeOfService,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.placeOfServiceId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdatePlaceOfService({placeOfServiceId: this.placeOfServiceId, input: this.placeOfService }).pipe(
                switchMap(() => of(true))
            )
    }
}
