
import { ChangeDetectorRef, Component,EventEmitter, Input, Output } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { FormGroup } from '@angular/forms'
import { WebAuthorizationKindFormStore } from './web-authorization-kind-form.store'
import { AuthorizationKind,Category } from '@case-clinical/web/core/data-access'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck, tap } from 'rxjs/operators'

@Component({
  selector: 'ui-authorization-kind-form',
  providers: [WebAuthorizationKindFormStore],
  template: `
    <div class="md:px-2 lg:px-0 lg:col-span-9 dark:bg-gray-800 bg-white rounded-lg shadow p-4">
      <div class="px-6 pt-6">
        <ui-form (submitForm)="submit($any(authorizationKind))" [model]="authorizationKind ?? {}" [fields]="fields" [form]="form">
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
export class WebFormsUiAuthorizationKindComponent
    {
  @Input() authorizationKind: AuthorizationKind = {}
  @Output() send = new EventEmitter()
  form = new FormGroup({ })
  
  model: any = {}

 parentCategoryId: ''

  options = {
    formState: {
      mainModel: this.model,
    },
  }

fields = [
				WebUiFormField.fieldRow([

  WebUiFormField.selectForm(
          'category',
          'categoryId',
        {
          defaultValues: {}, ////Set Parent Values
          createCategory: (event) => {
            if(event?.name) {
              this.store.addCategory(event)
              this.model.categoryId = event.id
              this.form.controls['categoryId'].patchValue(event.id)
              this.form.controls['categoryId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            }
          },
          onChange: (selected) => {
            this.store.filterCategories('').subscribe((values) => {
              this.model.categoryId = selected?.id
              this.form.controls['categoryId'].patchValue(selected?.id)
              this.form.controls['categoryId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            })
          },
          label: 'Category',
          valueProp: 'id',
          labelProp: 'name',
          source: this.store.filterCategories,
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.store.filterCategories('').subscribe()
              this.route.params.pipe(pluck('categoryId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentCategoryId = s
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
				])

]

  constructor(
    private readonly store: WebAuthorizationKindFormStore,
    private readonly route: ActivatedRoute,
    private readonly ref: ChangeDetectorRef
  ) {}


  async submit({ name,categoryId }) {
    
    if(this.parentCategoryId != ''){
      categoryId = this.parentCategoryId
    }

    await this.store.createAuthorizationKindEffect({ name,categoryId })

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
