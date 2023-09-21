
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { Country,Contact } from '@case-clinical/web/core/data-access'
import { WebContactPhoneNumberCreateStore } from './web-contact-phone-number-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-contact-phone-number-create.component.html',
  providers: [WebContactPhoneNumberCreateStore],
})
export class WebContactPhoneNumberCreateComponent {
    readonly vm$ = this.store.vm$
    readonly countries$ = this.store.countries$
readonly contacts$ = this.store.contacts$

  model:any = {}

parentCountryId: ''
parentContactId: ''

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
WebUiFormField.input('phoneNumber', { label: 'Phone Number' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('label', { label: 'Label' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'})
    
  WebUiFormField.selectForm(
          'country',
          'countryId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('countryId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentCountryId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'contact',
          'contactId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('contactId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentContactId = s
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
    private readonly store: WebContactPhoneNumberCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createContactPhoneNumber(input) {

    if(this.parentCountryId != ''){
      input = {...input, countryId: this.parentCountryId} 
    }


    if(this.parentContactId != ''){
      input = {...input, contactId: this.parentContactId} 
    }


    this.store.createContactPhoneNumberEffect(input)
  }
}
