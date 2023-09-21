
import { ChangeDetectorRef, Component } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { UserUpdateUserFeatureInput, Feature,User } from '@case-clinical/web/core/data-access'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { WebUserFeatureEditStore } from './web-user-feature-edit.store'
import { ActivatedRoute, Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-user-feature-edit.component.html',
  providers: [WebUserFeatureEditStore],
})
export class WebUserFeatureEditComponent {
        readonly vm$ = this.store.vm$
        readonly form = new FormGroup({})
        readonly features$ = this.store.features$
readonly users$ = this.store.users$

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
className: 'w-full sm:w-1/2 md:w-1/4 px-1'
}),
    
  WebUiFormField.selectForm(
          'feature',
          'featureId',
        {
          defaultValues: {}, ////Set Parent Values
          className: 'sm:w-full md:w-1/4 px-1',
          createFeature: (event) => {
            if(event?.name) {
              this.store.addFeature(event)
              this.model.featureId = event.id
              this.form.controls['featureId'].patchValue(event.id)
              this.form.controls['featureId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            }
          },
          label: 'Feature',
          options: this.store.features$,
          valueProp: 'id',
          labelProp: 'name'
        },
        {
          hooks: {
            onInit: async (field) => {
              this.store.filterFeatures('').subscribe()
              this.route.params.pipe(pluck('featureId')).subscribe((s) => {
              field.formControl?.setValue(s)
              this.model.featureId = s
              if (s != undefined || s != null) {
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.select(
          'userId',
        {
          defaultValues: {}, ////Set Parent Values
          className: 'sm:w-full md:w-1/4 px-1',
          label: 'User',
          options: this.store.users$,
          valueProp: 'id',
          labelProp: 'name'
        },
        {
          hooks: {
            onInit: async (field) => {
              this.store.filterUsers('').subscribe()
              this.route.params.pipe(pluck('userId')).subscribe((s) => {
              field.formControl?.setValue(s)
              this.model.userId = s
              if (s != undefined || s != null) {
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
    private readonly store: WebUserFeatureEditStore,
    private route: ActivatedRoute,
    private router: Router,
    private ref: ChangeDetectorRef
  ) {}

  updateUserFeature(input: UserUpdateUserFeatureInput) {
     const { name,featureId,userId } = input
     this.store.updateUserFeatureEffect({ name,featureId,userId })
  }

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

}
