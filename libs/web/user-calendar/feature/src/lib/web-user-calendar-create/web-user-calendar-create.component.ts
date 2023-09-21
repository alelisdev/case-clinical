
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { CalendarType,User,Calendar } from '@case-clinical/web/core/data-access'
import { WebUserCalendarCreateStore } from './web-user-calendar-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map } from 'rxjs/operators'

@Component({
  templateUrl: './web-user-calendar-create.component.html',
  providers: [WebUserCalendarCreateStore],
})
export class WebUserCalendarCreateComponent {
    readonly vm$ = this.store.vm$
    readonly calendarTypes$ = this.store.calendarTypes$
readonly users$ = this.store.users$
readonly calendars$ = this.store.calendars$

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
    
  WebUiFormField.select(
          'calendarTypeId',
          {
            label: 'Calendar Type',
            options: [{id: 'CREATE', name: 'Create New Calendar Type'}],
            valueProp: 'id',
            labelProp: 'name',
          },
          {
            className: 'w-1/4  px-1',
            hooks: {
              onInit: async (field) => {
                await this.store.filterCalendarTypes('').pipe(
                  map((x:CalendarType)=> {
                  field.templateOptions.options = x
                  return x
                  })
                ).subscribe()
              },
            }, 
          },
        ),
,

  WebUiFormField.select(
          'userId',
          {
            label: 'User',
            options: [{id: 'CREATE', name: 'Create New User'}],
            valueProp: 'id',
            labelProp: 'name',
          },
          {
            className: 'w-1/4  px-1',
            hooks: {
              onInit: async (field) => {
                await this.store.filterUsers('').pipe(
                  map((x:User)=> {
                  field.templateOptions.options = x
                  return x
                  })
                ).subscribe()
              },
            }, 
          },
        ),
,

  WebUiFormField.select(
          'calendarId',
          {
            label: 'Calendar',
            options: [{id: 'CREATE', name: 'Create New Calendar'}],
            valueProp: 'id',
            labelProp: 'name',
          },
          {
            className: 'w-1/4  px-1',
            hooks: {
              onInit: async (field) => {
                await this.store.filterCalendars('').pipe(
                  map((x:Calendar)=> {
                  field.templateOptions.options = x
                  return x
                  })
                ).subscribe()
              },
            }, 
          },
        ),
				])

  ]

  constructor(
    private readonly store: WebUserCalendarCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createUserCalendar(input) {
    this.store.createUserCalendarEffect(input)
  }
}
