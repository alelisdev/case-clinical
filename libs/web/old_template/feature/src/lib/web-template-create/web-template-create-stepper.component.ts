
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'

import { WebTemplateCreateStore } from './web-template-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-template-create.component.html',
  providers: [WebTemplateCreateStore],
})
export class WebTemplateCreateComponent {
    readonly vm$ = this.store.vm$
    

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
    private readonly store: WebTemplateCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createTemplate(input) {
    this.store.createTemplateEffect(input)
  }
}
