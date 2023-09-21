
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'

import { WebFirmStatusCreateStore } from './web-firm-status-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-firm-status-create.component.html',
  providers: [WebFirmStatusCreateStore],
})
export class WebFirmStatusCreateComponent {
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
className: 'w-full sm:w-1/2 md:w-1/4  px-1'
}),
WebUiFormField.checkbox('blackListed', { label: 'Black Listed' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.checkbox('active', { label: 'Active' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.input('statusColor', { label: 'Status Color' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),

    				])

  ]

  constructor(
    private readonly store: WebFirmStatusCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createFirmStatus(input) {


    this.store.createFirmStatusEffect(input)
  }
}
