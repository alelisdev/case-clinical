import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectorRef, OnDestroy } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { take, tap, pluck, map, takeUntil, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators'

import { FieldType, FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core'

import { Observable, Subject, of } from 'rxjs'
import * as _ from 'lodash'
import { ContactStore } from './ui-form-contact.store'
import { Contact, UserCreateContactInput, UserUpdateContactInput } from '@case-clinical/shared/util/sdk'
import { WebUiFormField } from '../../web-ui-form.field'

@Component({
  templateUrl: './ui-form-contact.component.html',
  styleUrls: ['./ui-form-contact.component.scss'],
  providers: [ContactStore],
})
export class UiFormContactComponent extends FieldType {
  [x: string]: any
  onDestroy$ = new Subject<void>()
  search$ = new Subject<string>()
  options$: Observable<string[]>
  value: any
  contactFormVisible = false
  contacts$: Observable<Contact[]>
  options:any = {}
  constructor(public store: ContactStore) {
    super()
    this.options = {
      formState: {
        mainModel: {},
      },
    }
  }

  @Input() selectedContact: Contact

  destroyed$ = new Subject<void>()
  loading: boolean

  vm$ = this.store.vm$

  model: any = {}

  

  fields = [
    WebUiFormField.fieldRow([
      WebUiFormField.input('id', { label: 'Id' }, { className: 'w-1/2  px-1', hide: true }),
      WebUiFormField.input('name', { label: 'Name' }, { className: 'w-full px-1' }),
    ]),
    WebUiFormField.fieldRow([
      WebUiFormField.input('firstName', { label: 'First Name' }, { className: 'w-1/2  px-1' }),
      WebUiFormField.input('lastName', { label: 'Last Name' }, { className: 'w-1/2  px-1' }),
    ]),
    WebUiFormField.fieldRow([
      WebUiFormField.input('suffix', { label: 'Suffix' }, { className: 'w-1/2  px-1' }),
      WebUiFormField.input('primaryPhoneNumber', { label: 'Primary Phone Number' }, { className: 'w-1/2  px-1' }),
    ]),
    WebUiFormField.fieldRow([
      WebUiFormField.input('primaryEmailAddress', { label: 'Primary Email Address' }, { className: 'w-1/2  px-1' }),
      WebUiFormField.input('primaryAddressLine1', { label: 'Primary Address Line 1' }, { className: 'w-1/2  px-1' }),
    ]),
    WebUiFormField.fieldRow([
      WebUiFormField.input('primaryAddressLine2', { label: 'Primary Address Line 2' }, { className: 'w-1/2  px-1' }),
      WebUiFormField.input('primaryAddressCity', { label: 'Primary Address City' }, { className: 'w-1/2  px-1' }),
    ]),
    WebUiFormField.fieldRow([
      WebUiFormField.input(
        'primaryAddressStateOrProvince',
        { label: 'Primary Address State Or Province' },
        { className: 'w-1/2  px-1' },
      ),
      WebUiFormField.input(
        'primaryAddressPostalCode',
        { label: 'Primary Address Postal Code' },
        { className: 'w-1/2  px-1' },
      ),
    ]),
    WebUiFormField.fieldRow([WebUiFormField.input('notes', { label: 'Notes' }, { className: 'w-1/2  px-1' })]),
  ]

 
  formatModelAsContactInputType(input): UserCreateContactInput {
    console.log('contact.component.formatModel', input)

    const output: UserCreateContactInput = {
      name: '',
      firstName: '',
      lastName: '',
      suffix: '',
      primaryPhoneNumber: '',
      primaryEmailAddress: '',
      primaryAddressLine1: '',
      primaryAddressLine2: '',
      primaryAddressCity: '',
      primaryAddressStateOrProvince: '',
      primaryAddressPostalCode: '',
      notes: '',
    }

    const keys = _.keys(output)
    const result = _.assign({}, output, _.pick(input, keys))
    return result
  }

  async save($event) {
    // if (this.model.id === null || this.model.id === undefined) {
    //   this.store.createContactEffect($event)
    // } else {
    //   this.store.updateContactEffect($event)
    // }
  }

  cancel() {
    this.hideContactForm()
  }

  ngOnDestroy(): void {
    this.destroyed$.next()
    this.destroyed$.complete()
  }

  showContactForm(event) {
    this.contactFormVisible = true
  }

  hideContactForm() {
    this.model = {}
    this.contactFormVisible = false
  }

  onSubmitClick(event) {
    this.save(event)
  }

  ngOnInit(): void {
    this.options$ = this.search$.pipe(
      takeUntil(this.onDestroy$),
      filter((v) => v !== null),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((name) => this.to?.filter(name)),
    ) as Observable<string[]>
  }

  // ngAfterViewInit() {
  //   this.search$.next()
  // }

  onChange(selection) {
    this.selectedContact = selection
    if (this.to.onChange) {
      this.formControl.setValue(selection.id)
      return this.to.onChange(selection)
    }
    return selection
  }

  onSearch({ term }) {
    this.search$.next(term)
  }

  inputMapFn(e: any) {
    if (this.to.mapFn) {
      return this.to.mapFn(e)
    }
    return e
  }

  outputMapFn(e: any) {
    if (this.to.convertOutput === true && e && this.to.mapFn) {
      this.formControl.setValue(this.to.mapFn(e))
      this.value = e
      return
    }
    this.formControl.setValue(e)
    this.value = e
  }
}
