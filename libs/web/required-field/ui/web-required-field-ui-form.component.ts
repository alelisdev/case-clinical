
import { ChangeDetectorRef, Component,EventEmitter, Input, Output } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { FormGroup } from '@angular/forms'
import { WebRequiredFieldFormStore } from './web-required-field-form.store'
import { RequiredField,MedLevel } from '@case-clinical/web/core/data-access'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck, tap } from 'rxjs/operators'

@Component({
  selector: 'ui-required-field-form',
  providers: [WebRequiredFieldFormStore],
  template: `
    <div class="md:px-2 lg:px-0 lg:col-span-9 dark:bg-gray-800 bg-white rounded-lg shadow p-4">
      <div class="px-6 pt-6">
        <ui-form (submitForm)="submit($any(requiredField))" [model]="requiredField ?? {}" [fields]="fields" [form]="form">
          <div
            class="-mx-6 -mb-4 mt-4 px-4 py-3 bg-gray-50 dark:bg-gray-800 border-t border-transparent dark:border-gray-700 text-right sm:px-6 rounded-b-lg space-x-3"
          >
            <ui-button label="Discard" variant="white" (click)="handleDiscardClick($event)"></ui-button>
            <ui-button label="Save" type="submit"></ui-button>
          </div>
        </ui-form>
      </div>
    </div>
  `,
})
export class WebFormsUiRequiredFieldComponent
    {
  @Input() requiredField: RequiredField = {}
  @Output() send = new EventEmitter()
  form = new FormGroup({ })
  
  model: any = {}

 parentMedLevelId: ''

  options = {
    formState: {
      mainModel: this.model,
    },
  }

fields = [
				WebUiFormField.fieldRow([

  WebUiFormField.selectForm(
          'med-level',
          'medLevelId',
        {
          defaultValues: {}, ////Set Parent Values
          createMedLevel: (event) => {
            if(event?.name) {
              this.store.addMedLevel(event)
              this.model.medLevelId = event.id
              this.form.controls['medLevelId'].patchValue(event.id)
              this.form.controls['medLevelId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            }
          },
          onChange: (selected) => {
            this.store.filterMedLevels('').subscribe((values) => {
              this.model.medLevelId = selected?.id
              this.form.controls['medLevelId'].patchValue(selected?.id)
              this.form.controls['medLevelId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            })
          },
          label: 'Med Level',
          valueProp: 'id',
          labelProp: 'name',
          source: this.store.filterMedLevels,
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.store.filterMedLevels('').subscribe()
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
,
WebUiFormField.input('id', { label: 'Id' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1', hide: true}),
WebUiFormField.input('name', { label: 'Name' }, 
{
className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'
}),
WebUiFormField.input('entityName', { label: 'Entity Name' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('accidentTypeId', { label: 'Accident Type Id' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1', hide: true})				])

]

  constructor(
    private readonly store: WebRequiredFieldFormStore,
    private readonly route: ActivatedRoute,
    private readonly ref: ChangeDetectorRef
  ) {}


  async submit({ name,entityName,accidentTypeId,medLevelId }) {
    
    if(this.parentMedLevelId != ''){
      medLevelId = this.parentMedLevelId
    }

    await this.store.createRequiredFieldEffect({ name,entityName,accidentTypeId,medLevelId })

    await this.store.item$.pipe(
      tap((item) => {
        if(item) {
          this.send.emit(item)
        }
      })
    ).subscribe()
  }

  handleDiscardClick(event) { 
     this.send.emit(event)
  }
}
