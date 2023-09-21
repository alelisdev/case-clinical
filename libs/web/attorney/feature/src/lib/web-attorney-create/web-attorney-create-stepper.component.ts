
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { Firm,AttorneyStatus,AttorneyType } from '@case-clinical/web/core/data-access'
import { WebAttorneyCreateStore } from './web-attorney-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-attorney-create.component.html',
  providers: [WebAttorneyCreateStore],
})
export class WebAttorneyCreateComponent {
    readonly vm$ = this.store.vm$
    readonly firms$ = this.store.firms$
readonly attorneyStatuses$ = this.store.attorneyStatuses$
readonly attorneyTypes$ = this.store.attorneyTypes$

  model:any = {}

parentFirmId: ''
parentAttorneyStatusId: ''
parentAttorneyTypeId: ''

  options = {
      formState: {
        mainModel: this.model,
      },
    }

  fields = [
    				WebUiFormField.fieldRow([
WebUiFormField.input('name', { label: 'Name' }, 
{
className: 'w-full sm:w-1/2 md:w-1/4  px-1'
}),
WebUiFormField.input('title', { label: 'Title' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('firstName', { label: 'First Name' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('lastName', { label: 'Last Name' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('address', { label: 'Address' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('city', { label: 'City' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('state', { label: 'State' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('zip', { label: 'Zip' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('email', { label: 'Email' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('direct', { label: 'Direct' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('fax', { label: 'Fax' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('cellPhone', { label: 'Cell Phone' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('barNumber', { label: 'Bar Number' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('barState', { label: 'Bar State' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.checkbox('doNotDisturb', { label: 'Do Not Disturb' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.input('temp', { label: 'Temp' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('createdById', { label: 'Created by Id' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1', hide: true}),
WebUiFormField.date('dateCreated', { label: 'Date Created' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.checkbox('removed', { label: 'Removed' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.input('migSource', { label: 'Mig Source' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('entity', { label: 'Entity' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.checkbox('firmNolongerNeeded', { label: 'Firm Nolonger Needed' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
,
WebUiFormField.input('user', { label: 'User' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'})
    
  WebUiFormField.selectForm(
          'firm',
          'firmId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('firmId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentFirmId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'attorney-status',
          'attorneyStatusId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('attorneyStatusId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentAttorneyStatusId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'attorney-type',
          'attorneyTypeId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('attorneyTypeId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentAttorneyTypeId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
				])

  ]

  constructor(
    private readonly store: WebAttorneyCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createAttorney(input) {

    if(this.parentFirmId != ''){
      input = {...input, firmId: this.parentFirmId} 
    }


    if(this.parentAttorneyStatusId != ''){
      input = {...input, attorneyStatusId: this.parentAttorneyStatusId} 
    }


    if(this.parentAttorneyTypeId != ''){
      input = {...input, attorneyTypeId: this.parentAttorneyTypeId} 
    }


    this.store.createAttorneyEffect(input)
  }
}
