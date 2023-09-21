import { Injectable, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { WebUiFormField } from './web-ui-form.field'
import { BehaviorSubject, Subject, debounceTime } from 'rxjs'
import { getDateWithFormat, isValidDateString } from '@case-clinical/shared/util/helpers'
import { FuseConfigService } from '@fuse/services/config/config.service';
import moment from 'moment'

@Injectable()
export class FormService implements OnInit {
  readonly form = new FormGroup({})
  static readonly forms = new Map()

  config: { language?: string, currency?: string, dateFormat?: string, timeFormat?: string } = {};

  constructor(private fuseConfigService: FuseConfigService) {

  }

  setErrors(errors) {
    Object.entries(errors).forEach(([key, value]: any) => {
      const formControl = this.form.get(key)
      formControl?.setErrors({ key: { message: value } }, { emitEvent:  true})
    })
  }

  public static getForm(formName: string) {
    return this.forms.get(formName)
  }

  ngOnInit(): void {
    FormService.forms.set('rate-form', [
      WebUiFormField.fieldRow([
        WebUiFormField.input('id', { label: 'Id' }, { className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1', hide: true }),
        WebUiFormField.input(
          'name',
          { label: 'Name' },
          {
            className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1',
          },
        ),
        WebUiFormField.input('scqNumber', { label: 'Scq Number' }, { className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1' }),
        WebUiFormField.currency('cost', { label: 'Cost' }, { className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1' }),
        WebUiFormField.currency(
          'reservationCharge',
          { label: 'Reservation Charge' },
          { className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1' },
        ),
        WebUiFormField.date(
          'effectiveDate',
          { label: 'Effective Date' },
          { className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1' },
        ),
        WebUiFormField.date(
          'expirationDate',
          { label: 'Expiration Date' },
          { className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1' },
        ),
        WebUiFormField.date(
          'enteredDate',
          { label: 'Entered Date' },
          { className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1' },
        ),
        WebUiFormField.date(
          'modifiedDate',
          { label: 'Modified Date' },
          { className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1' },
        ),
        WebUiFormField.input('comments', { label: 'Comments' }, { className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1' }),
        WebUiFormField.number(
          'paymentType',
          { label: 'Payment Type' },
          { className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1' },
        ),
        WebUiFormField.input('version', { label: 'Version' }, { className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1' }),
        WebUiFormField.input('planCode', { label: 'Plan Code' }, { className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1' }),
        WebUiFormField.input(
          'discriminator',
          { label: 'Discriminator' },
          { className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1' },
        ),
        WebUiFormField.input(
          'routingId',
          { label: 'Routing Id' },
          { className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1', hide: true },
        ),
        WebUiFormField.input(
          'stccId',
          { label: 'Stcc Id' },
          { className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1', hide: true },
        ),
        WebUiFormField.input(
          'modifiedByUserId',
          { label: 'Modified by User Id' },
          { className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1', hide: true },
        ),
        WebUiFormField.input(
          'enteredByUserId',
          { label: 'Entered by User Id' },
          { className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1', hide: true },
        ),
      ]),
    ])
  }

  // Get hierachical value from any object for any key
  // Key can be either one simple string or complex string containing dot which means hireachical value
  // This function is used globally in some components like label and description-list
  getValueForKey(key: string, data: any, returnRawValue = false) {
    if(!key) return null;
    const keys: string[] = key.split('.');
    let value = keys.reduce((acc, currentKey) => {
      if(!acc) return null;
      return acc[currentKey]
    }, data)
    if(!returnRawValue) {

      if(isValidDateString(value)) {
        value = moment(value).format(this.fuseConfigService.formlyConfig?.dateFormat ?? 'MM/DD/YYYY');
      }
    }
    return value;
  }
}
