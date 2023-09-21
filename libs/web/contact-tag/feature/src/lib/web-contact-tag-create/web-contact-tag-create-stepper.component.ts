
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { Contact } from '@case-clinical/web/core/data-access'
import { WebContactTagCreateStore } from './web-contact-tag-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-contact-tag-create.component.html',
  providers: [WebContactTagCreateStore],
})
export class WebContactTagCreateComponent {
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
    private readonly store: WebContactTagCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createContactTag(input) {

    if(this.parentContactId != ''){
      input = {...input, contactId: this.parentContactId} 
    }


    this.store.createContactTagEffect(input)
  }
}
