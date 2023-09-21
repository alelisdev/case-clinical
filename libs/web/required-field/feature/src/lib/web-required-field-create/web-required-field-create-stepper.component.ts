
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { AccidentType,MedLevel } from '@case-clinical/web/core/data-access'
import { WebRequiredFieldCreateStore } from './web-required-field-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-required-field-create.component.html',
  providers: [WebRequiredFieldCreateStore],
})
export class WebRequiredFieldCreateComponent {
    readonly vm$ = this.store.vm$
    readonly accidentTypes$ = this.store.accidentTypes$
readonly medLevels$ = this.store.medLevels$

  model:any = {}

parentAccidentTypeId: ''
parentMedLevelId: ''

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
WebUiFormField.input('entityName', { label: 'Entity Name' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'})
    
  WebUiFormField.selectForm(
          'accident-type',
          'accidentTypeId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('accidentTypeId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentAccidentTypeId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'med-level',
          'medLevelId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('medLevelId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentMedLevelId = s
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
    private readonly store: WebRequiredFieldCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createRequiredField(input) {

    if(this.parentAccidentTypeId != ''){
      input = {...input, accidentTypeId: this.parentAccidentTypeId} 
    }


    if(this.parentMedLevelId != ''){
      input = {...input, medLevelId: this.parentMedLevelId} 
    }


    this.store.createRequiredFieldEffect(input)
  }
}
