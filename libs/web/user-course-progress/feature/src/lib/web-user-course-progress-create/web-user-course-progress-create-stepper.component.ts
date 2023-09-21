
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { User,Course } from '@case-clinical/web/core/data-access'
import { WebUserCourseProgressCreateStore } from './web-user-course-progress-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-user-course-progress-create.component.html',
  providers: [WebUserCourseProgressCreateStore],
})
export class WebUserCourseProgressCreateComponent {
    readonly vm$ = this.store.vm$
    readonly users$ = this.store.users$
readonly courses$ = this.store.courses$

  model:any = {}

parentUserId: ''
parentCourseId: ''

  options = {
      formState: {
        mainModel: this.model,
      },
    }

  fields = [
    				WebUiFormField.fieldRow([
WebUiFormField.input('name', { label: 'Name' }, 
{
className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'
}),
WebUiFormField.number('currentStep', { label: 'Current Step' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.number('completed', { label: 'Completed' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'})
    
  WebUiFormField.selectForm(
          'user',
          'userId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('userId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentUserId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'course',
          'courseId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('courseId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentCourseId = s
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
    private readonly store: WebUserCourseProgressCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createUserCourseProgress(input) {

    if(this.parentUserId != ''){
      input = {...input, userId: this.parentUserId} 
    }


    if(this.parentCourseId != ''){
      input = {...input, courseId: this.parentCourseId} 
    }


    this.store.createUserCourseProgressEffect(input)
  }
}
