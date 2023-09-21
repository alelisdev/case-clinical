
import { Component,EventEmitter, Input, Output } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { CalendarWeekday } from '@case-clinical/web/core/data-access'
import { WebUiFormField } from '@case-clinical/web/ui/form'

@Component({
  selector: 'calendar-weekday-form',
  template: `
    <div class="md:px-2 lg:px-0 lg:col-span-9 dark:bg-gray-800 bg-white rounded-lg shadow">
                          <ui-page-header title="Calendar Weekday"></ui-page-header>
                         
                               <div class="px-6 pt-6">
        <ui-form (submitForm)="submit($any(calendarWeekday))" [model]="calendarWeekday" [fields]="fields" [form]="form">
          <div
            class="-mx-6 -mb-4 mt-4 px-4 py-3 bg-gray-50 dark:bg-gray-800 border-t border-transparent dark:border-gray-700 text-right sm:px-6 rounded-b-lg space-x-3"
          >
            <ui-button label = "Discard" variant="white" (click)="handleDiscardClick($event)"></ui-button>
            <ui-button label = "Save" type="submit"></ui-button>
          </div>
        </ui-form>
      </div>
    </div>
  `,
})
export class CalendarWeekdayFormComponent
    {
  @Input() calendarWeekday: CalendarWeekday = {}
  @Output() send = new EventEmitter()
  form = new FormGroup({ })
  
  model: any = {}

  options = {
    formState: {
      mainModel: this.model,
    },
  }

fields = [				WebUiFormField.fieldRow([
WebUiFormField.input('abbr', { label: 'Abbr' }, {className: 'w-1/4  px-1'}),
WebUiFormField.input('label', { label: 'Label' }, {className: 'w-1/4  px-1'})				])
,
				WebUiFormField.fieldRow([
WebUiFormField.input('value', { label: 'Value' }, {className: 'w-1/4  px-1'})				])
]


  submit({
abbr,label,value
  }) {
    this.send.emit({
abbr,label,value
    })
  }

handleDiscardClick(event) { }
}
