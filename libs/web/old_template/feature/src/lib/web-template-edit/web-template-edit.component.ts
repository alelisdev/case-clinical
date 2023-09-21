
import { Component } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { UserUpdateTemplateInput,  } from '@case-clinical/web/core/data-access'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { WebTemplateEditStore } from './web-template-edit.store'
import { ActivatedRoute, Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-template-edit.component.html',
  providers: [WebTemplateEditStore],
})
export class WebTemplateEditComponent {
        readonly vm$ = this.store.vm$
        readonly form = new FormGroup({})
        

  model:any = {}

  options = {
      formState: {
        mainModel: this.model,
      },
    }

  fields = [
    				WebUiFormField.fieldRow([
WebUiFormField.input('name', { label: 'Name' }, 
{
className: 'w-1/2 px-1'
}),
WebUiFormField.input('attachment', { label: 'Attachment' }, {className: 'w-full  px-1'}),
WebUiFormField.input('encoding', { label: 'Encoding' }, {className: 'w-full  px-1'}),
WebUiFormField.input('signatureFileType', { label: 'Signature File Type' }, {className: 'w-full  px-1'}),
,
,
    				])
    
  ]

    

  constructor(
    private readonly store: WebTemplateEditStore,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  updateTemplate(input: UserUpdateTemplateInput) {
     const { name,attachment,encoding,signatureFileType } = input
     this.store.updateTemplateEffect({ name,attachment,encoding,signatureFileType })
  }

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

}
