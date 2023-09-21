
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { ContactKind } from '@case-clinical/web/core/data-access'
import { WebContactCreateStore } from './web-contact-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-contact-create.component.html',
  providers: [WebContactCreateStore],
})
export class WebContactCreateComponent {
    readonly vm$ = this.store.vm$
    readonly contactKinds$ = this.store.contactKinds$

  model:any = {}

parentContactKindId: ''

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
WebUiFormField.input('honorific', { label: 'Honorific' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('firstName', { label: 'First Name' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('lastName', { label: 'Last Name' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('suffix', { label: 'Suffix' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('primaryPhoneNumber', { label: 'Primary Phone Number' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('primaryEmailAddress', { label: 'Primary Email Address' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('primaryAddressLine1', { label: 'Primary Address Line 1' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('primaryAddressLine2', { label: 'Primary Address Line 2' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('primaryAddressCity', { label: 'Primary Address City' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('primaryAddressStateOrProvince', { label: 'Primary Address State or Province' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('primaryAddressPostalCode', { label: 'Primary Address Postal Code' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('notes', { label: 'Notes' } , {className: 'w-full sm:w-1/2 md:w-1/4  px-1'} ),
WebUiFormField.input('discriminator', { label: 'Discriminator' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.date('dateOfBirth', { label: 'Date of Birth' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.number('latitude', { label: 'Latitude' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.number('longitude', { label: 'Longitude' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
,
WebUiFormField.input('avatar', { label: 'Avatar' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('background', { label: 'Background' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('title', { label: 'Title' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('company', { label: 'Company' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('birthday', { label: 'Birthday' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('address', { label: 'Address' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
,
,
,

    
  WebUiFormField.selectForm(
          'contact-kind',
          'contactKindId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('contactKindId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentContactKindId = s
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
    private readonly store: WebContactCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createContact(input) {

    if(this.parentContactKindId != ''){
      input = {...input, contactKindId: this.parentContactKindId} 
    }


    this.store.createContactEffect(input)
  }
}
