
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { PlaceOfService } from '@case-clinical/web/core/data-access'
import { WebLocationCreateStore } from './web-location-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-location-create.component.html',
  providers: [WebLocationCreateStore],
})
export class WebLocationCreateComponent {
    readonly vm$ = this.store.vm$
    readonly placeOfServices$ = this.store.placeOfServices$

  model:any = {}

parentPlaceOfServiceId: ''

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
WebUiFormField.input('locationName', { label: 'Location Name' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('line1', { label: 'Line 1' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('line2', { label: 'Line 2' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('city', { label: 'City' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('state', { label: 'State' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('postalCode', { label: 'Postal Code' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.number('latitude', { label: 'Latitude' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.number('longitude', { label: 'Longitude' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('abbrev', { label: 'Abbrev' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('division', { label: 'Division' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('country', { label: 'Country' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('officePhone', { label: 'Office Phone' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('fax', { label: 'Fax' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('attentionTo', { label: 'Attention to' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
,
,
,
,

    
  WebUiFormField.selectForm(
          'place-of-service',
          'placeOfServiceId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('placeOfServiceId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentPlaceOfServiceId = s
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
    private readonly store: WebLocationCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createLocation(input) {

    if(this.parentPlaceOfServiceId != ''){
      input = {...input, placeOfServiceId: this.parentPlaceOfServiceId} 
    }


    this.store.createLocationEffect(input)
  }
}
