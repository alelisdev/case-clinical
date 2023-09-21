import { GeolocationModel } from '@case-clinical/web/ui/map';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'ui-location-picker',
  styleUrls: ['./style.scss'],
template: `
    <ui-location-map-component
      [latitude]="location?.lat"
      [longitude]="location?.lng"
      [showMap]="to.showMap ?? false"
      [formattedAddress] = "location?.formatedAddress??''"
      (locationChanged)="locationChanged($event)"
    ></ui-location-map-component>
  `,
})
export class LocationPickerComponent extends FieldType implements OnInit, OnDestroy {
  formControl!: FormControl;
  subscriber;

  defaultLatitude = 36.98500309285596;
  defaultLongitude = -79.189453125;

  location: GeolocationModel;

  ngOnDestroy(): void {
    this.subscriber?.unsubscribe();

  }
  ngOnInit(): void {
    if(this.formControl?.value) {
      this.location = this.formControl.value;
      this.locationChanged(this.location)
    } else {
      this.location = {
        lat: this.defaultLatitude,
        lng: this.defaultLongitude
      }

    }
    this.subscriber = this.formControl?.valueChanges.subscribe((value) => {

      if(this.to.valueChanged && this.to.valueChanged instanceof Function) {
        //
      }
    })
  }

  locationChanged(location: GeolocationModel) {
    if(this.to.locationPicked) {
      this.to.locationPicked(location, this.form);
    }
    this.formControl.setValue(location);
  }
}
