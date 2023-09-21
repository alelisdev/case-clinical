
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { LegalCase } from '@case-clinical/web/core/data-access'
import { WebCasePreInjuryCreateStore } from './web-case-pre-injury-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-case-pre-injury-create.component.html',
  providers: [WebCasePreInjuryCreateStore],
})
export class WebCasePreInjuryCreateComponent {
    readonly vm$ = this.store.vm$
    readonly legalCases$ = this.store.legalCases$

  model:any = {}

parentLegalCaseId: ''

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
WebUiFormField.checkbox('affectsInjury', { label: 'Affects Injury' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.input('injuryDate', { label: 'Injury Date' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('injured', { label: 'Injured' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('anatomic', { label: 'Anatomic' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.date('dateCreated', { label: 'Date Created' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.checkbox('removed', { label: 'Removed' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' })
    
  WebUiFormField.selectForm(
          'legal-case',
          'legalCaseId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('legalCaseId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentLegalCaseId = s
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
    private readonly store: WebCasePreInjuryCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createCasePreInjury(input) {

    if(this.parentLegalCaseId != ''){
      input = {...input, legalCaseId: this.parentLegalCaseId} 
    }


    this.store.createCasePreInjuryEffect(input)
  }
}
