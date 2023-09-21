
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { Contact,Integration } from '@case-clinical/web/core/data-access'
import { WebContactSettingCreateStore } from './web-contact-setting-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-contact-setting-create.component.html',
  providers: [WebContactSettingCreateStore],
})
export class WebContactSettingCreateComponent {
    readonly vm$ = this.store.vm$
    readonly contacts$ = this.store.contacts$
readonly integrations$ = this.store.integrations$

  model:any = {}

parentContactId: ''
parentIntegrationId: ''

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
WebUiFormField.input('value', { label: 'Value' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('iconUrl', { label: 'Icon Url' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('properties', { label: 'Properties' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'})
    
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
,

  WebUiFormField.selectForm(
          'integration',
          'integrationId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('integrationId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentIntegrationId = s
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
    private readonly store: WebContactSettingCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createContactSetting(input) {

    if(this.parentContactId != ''){
      input = {...input, contactId: this.parentContactId} 
    }


    if(this.parentIntegrationId != ''){
      input = {...input, integrationId: this.parentIntegrationId} 
    }


    this.store.createContactSettingEffect(input)
  }
}
