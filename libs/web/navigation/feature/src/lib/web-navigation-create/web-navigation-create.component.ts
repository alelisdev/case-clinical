
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { User,Navigation } from '@case-clinical/web/core/data-access'
import { WebNavigationCreateStore } from './web-navigation-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-navigation-create.component.html',
  providers: [WebNavigationCreateStore],
})
export class WebNavigationCreateComponent {
    readonly vm$ = this.store.vm$
    readonly users$ = this.store.users$
readonly navigations$ = this.store.navigations$

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
WebUiFormField.input('title', { label: 'Title' }, {className: 'w-full  px-1'}),
WebUiFormField.input('subtitle', { label: 'Subtitle' }, {className: 'w-full  px-1'}),
WebUiFormField.input('type', { label: 'Type' }, {className: 'w-full  px-1'}),
WebUiFormField.input('icon', { label: 'Icon' }, {className: 'w-full  px-1'}),
WebUiFormField.input('link', { label: 'Link' }, {className: 'w-full  px-1'}),
    
  WebUiFormField.select(
          'userId',
          {
            label: 'User',
            options: this.store
                .filterUsers('')
                .pipe(
                  map((x: any) => {
                    return x
                  }),
                ),
            valueProp: 'id',
            labelProp: 'name',
          },
          {
            className: 'w-1/4  px-1',
            hooks: {
              onInit: async (field) => {
                this.route.params.pipe(pluck('userId')).subscribe((s) => {
                    field.formControl.setValue(s)
                    this.model.userId = s
                    if (s != undefined || s != null) {
                        field.hide = true
                    }
                })
              },
            }, 
          },
        ),
,

  WebUiFormField.select(
          'parentId',
          {
            label: 'Parent',
            options: this.store
                .filterNavigations('')
                .pipe(
                  map((x: any) => {
                    return x
                  }),
                ),
            valueProp: 'id',
            labelProp: 'name',
          },
          {
            className: 'w-1/4  px-1',
            hooks: {
              onInit: async (field) => {
                this.route.params.pipe(pluck('parentId')).subscribe((s) => {
                    field.formControl.setValue(s)
                    this.model.parentId = s
                    if (s != undefined || s != null) {
                        field.hide = true
                    }
                })
              },
            }, 
          },
        ),
				])

  ]

  constructor(
    private readonly store: WebNavigationCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createNavigation(input) {
    this.store.createNavigationEffect(input)
  }
}
