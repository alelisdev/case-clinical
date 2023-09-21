
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { Patient } from '@case-clinical/web/core/data-access'
import { WebPatientStudyCreateStore } from './web-patient-study-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-patient-study-create.component.html',
  providers: [WebPatientStudyCreateStore],
})
export class WebPatientStudyCreateComponent {
    readonly vm$ = this.store.vm$
    readonly patients$ = this.store.patients$

  model:any = {}

parentPatientId: ''

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

    
  WebUiFormField.selectForm(
          'patient',
          'patientId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('patientId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentPatientId = s
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
    private readonly store: WebPatientStudyCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createPatientStudy(input) {

    if(this.parentPatientId != ''){
      input = {...input, patientId: this.parentPatientId} 
    }


    this.store.createPatientStudyEffect(input)
  }
}
