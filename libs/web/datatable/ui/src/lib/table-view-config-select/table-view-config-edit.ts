import { Component, OnInit, OnDestroy, EventEmitter, Input, Output } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { TableViewConfigStore } from '../table-view-config.store'
import { FormlyFieldConfig } from '@ngx-formly/core'

@Component({
  selector: 'ui-table-view-config-form',
  template: `
  <div class="flex-grow flex flex-col p-4 gap-2">
    <div class="md:px-2 lg:px-0 lg:col-span-9 dark:bg-gray-800 bg-white rounded-lg shadow p-4">
      <div class="text-semibold text-lg px-6">{{titleLabel}} </div>
      <div class="px-6 pt-6">
        <ui-form class='w-full' (submitForm)="submit($any(config))" [model]="config ?? {}" [fields]="fields" [form]="form">
          <div
            class="-mx-6 -mb-4 mt-4 px-4 py-3 bg-gray-50 dark:bg-gray-800 border-t border-transparent dark:border-gray-700 rounded-b-lg space-x-3"
          >
            <div class="flex justify-between items-center flex-wrap sm:flex-nowrap">
              <div class="ml-2 items-center flex ng-star-inserted">
                <ui-button [disabled]="!form.valid" label="Save" type="submit"></ui-button>

              </div>

              <div class="mr-2 items-center flex ng-star-inserted">
                <ui-button  label="Discard" type='button' variant="white" (click)="handleDiscardClick($event)"></ui-button>
              </div>
            </div>
          </div>
        </ui-form>
      </div>
    </div>
  </div>
  `,
})
export class WebFormsUiTableViewConfigComponent implements OnInit, OnDestroy {
  @Input() config: any = {}
  @Input() titleLabel: string = "edit"

  @Output() send = new EventEmitter()
  @Output() close = new EventEmitter()

  form = new FormGroup({})

  model: any = {}

  options = {
    formState: {
      mainModel: this.model,
    },
  }

  fields = [
    WebUiFormField.fieldRow([
      WebUiFormField.input('id', { label: 'Id' }, { className: 'w-full px-0.5', hide: true }),
      WebUiFormField.input(
          'name',
          { label: 'Name',required: true },
          {
            className: 'w-full px-0.5',
          },
      ),
    ]),
  ]
  constructor(
    private readonly store: TableViewConfigStore,
  ) {
    this.titleLabel =  "edit"
  }

  async submit({ id, name }) {
    if(!name.length) {
        return;
    }
    if(id !== undefined) {
      this.store.editView({input: { id, name }, resultEmitter: this.send })
    } else {
      this.store.addView( { viewName: name, resultEmitter: this.send})
    }
    // this.send.emit({ name })
  }

  ngOnInit(): void{
    if(this.config?.name)
      this.titleLabel =  "Edit";
    else
      this.titleLabel =  "Create"

  }

  ngOnDestroy(): void {

  }

  handleDiscardClick(event) {
    this.close.emit(event)
  }
}
