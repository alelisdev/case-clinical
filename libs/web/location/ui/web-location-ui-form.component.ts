import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { FormGroup } from '@angular/forms'
import { WebLocationFormStore } from './web-location-form.store'
import { Location } from '@case-clinical/web/core/data-access'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck, tap } from 'rxjs/operators'

@Component({
  selector: 'ui-location-form',
  providers: [WebLocationFormStore],
  template: `
    <div class="md:px-2 lg:px-0 lg:col-span-9 dark:bg-gray-800 bg-white rounded-lg shadow p-4">
      <div class="px-6 pt-6">
        <ui-form (submitForm)="submit($any(location))" [model]="location ?? {}" [fields]="fields" [form]="form">
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
export class WebFormsUiLocationComponent {
  @Input() location: Location = {}
  @Output() send = new EventEmitter()
  form = new FormGroup({})

  model: any = {}

  options = {
    formState: {
      mainModel: this.model,
    },
  }

  fields = [
    WebUiFormField.fieldRow([
      ,
      WebUiFormField.input('id', { label: 'Id' }, { className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1', hide: true }),
      WebUiFormField.input(
        'name',
        { label: 'Name' },
        {
          className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1',
        },
      ),
      WebUiFormField.input(
        'locationName',
        { label: 'Location Name' },
        { className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1' },
      ),
      WebUiFormField.input('line1', { label: 'Line 1' }, { className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1' }),
      WebUiFormField.input('line2', { label: 'Line 2' }, { className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1' }),
      WebUiFormField.input('city', { label: 'City' }, { className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1' }),
      WebUiFormField.input('state', { label: 'State' }, { className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1' }),
      WebUiFormField.input('postalCode', { label: 'Postal Code' }, { className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1' }),
      WebUiFormField.number('latitude', { label: 'Latitude' }, { className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1' }),
      WebUiFormField.number('longitude', { label: 'Longitude' }, { className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1' }),
      WebUiFormField.input('abbrev', { label: 'Abbrev' }, { className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1' }),
      WebUiFormField.input('division', { label: 'Division' }, { className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1' }),
      WebUiFormField.input('country', { label: 'Country' }, { className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1' }),
      WebUiFormField.input(
        'officePhone',
        { label: 'Office Phone' },
        { className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1' },
      ),
      WebUiFormField.input('fax', { label: 'Fax' }, { className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1' }),
      WebUiFormField.input('cotes', { label: 'Cotes' }, { className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1' }),
      WebUiFormField.input(
        'attentionTo',
        { label: 'Attention To' },
        { className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1' },
      ),
      ,
      ,
    ]),
  ]

  constructor(
    private readonly store: WebLocationFormStore,
    private readonly route: ActivatedRoute,
    private readonly ref: ChangeDetectorRef,
  ) {}

  async submit({
    name,
    locationName,
    line1,
    line2,
    city,
    state,
    postalCode,
    latitude,
    longitude,
    abbrev,
    division,
    country,
    officePhone,
    fax,
    attentionTo,
  }) {
    await this.store.createLocationEffect({
      name,
      locationName,
      line1,
      line2,
      city,
      state,
      postalCode,
      latitude,
      longitude,
      abbrev,
      division,
      country,
      officePhone,
      fax,
      attentionTo,
    })

    await this.store.item$
      .pipe(
        tap((item) => {
          if (item) {
            this.send.emit(item)
          }
        }),
      )
      .subscribe()
  }

  handleDiscardClick(event) {
    this.send.emit(event)
  }
}
