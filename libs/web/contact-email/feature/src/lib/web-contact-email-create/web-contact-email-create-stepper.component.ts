
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { Contact } from '@case-clinical/web/core/data-access'
import { WebContactEmailCreateStore } from './web-contact-email-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-contact-email-create.component.html',
  providers: [WebContactEmailCreateStore],
})
export class WebContactEmailCreateComponent {
    readonly vm$ = this.store.vm$
    readonly contacts$ = this.store.contacts$

  model:any = {}

parentContactId: ''

  options = {
      formState: {
        mainModel: this.model,
      },
    }

  fields = [
    				WebUiFormField.fieldRow([
WebUiFormField.input('email', { label: 'Email' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('name', { label: 'Name' }, 
{
className: 'w-full sm:w-1/2 md:w-1/4  px-1'
})
    
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
    private readonly store: WebContactEmailCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createContactEmail(input) {

    if(this.parentContactId != ''){
      input = {...input, contactId: this.parentContactId} 
    }


    this.store.createContactEmailEffect(input)
  }
}
