
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { Category } from '@case-clinical/web/core/data-access'
import { WebAuthorizationKindCreateStore } from './web-authorization-kind-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-authorization-kind-create.component.html',
  providers: [WebAuthorizationKindCreateStore],
})
export class WebAuthorizationKindCreateComponent {
    readonly vm$ = this.store.vm$
    readonly categories$ = this.store.categories$

  model:any = {}

parentCategoryId: ''

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
          'category',
          'categoryId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
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
				])

  ]

  constructor(
    private readonly store: WebAuthorizationKindCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createAuthorizationKind(input) {

    if(this.parentCategoryId != ''){
      input = {...input, categoryId: this.parentCategoryId} 
    }


    this.store.createAuthorizationKindEffect(input)
  }
}
