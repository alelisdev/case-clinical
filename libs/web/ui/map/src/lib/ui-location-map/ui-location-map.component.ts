// import { MapsAPILoader } from '@zhenggeche/agm-core-update';
import { MapsAPILoader } from '@agm/core';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { GeolocationModel } from '../models/geolocation.model';

@Component({
  selector: 'ui-location-map-component',
  templateUrl: './ui-location-map.component.html',
  styleUrls: ['./ui-location-map.component.scss'],
})
export class UiLocationMapComponent implements OnInit {

  defaultLatitude = 36.98500309285596;
  defaultLongitude = -79.189453125;

  @Input() defaultToCurrentLocation = false;
  @Input() latitude!: number;
  @Input() longitude!: number;
  @Input() showMap = false;
  @Input() zoom = 7
  @Input() formattedAddress = ""


  line1 = '';
  line2 = '';
  street_number = '';
  route = '';
  city = '';
  state = '';
  postalCode = '';
  country = '';

  geoCoder: any;
  @ViewChild('search')
  public searchElementRef!: ElementRef;

  @Output() locationChanged: EventEmitter<GeolocationModel> = new EventEmitter<GeolocationModel>();

  constructor(
    public router: Router,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {}

  get classes(): string {
    return 'shadow-sm dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md block w-full sm:text-sm'
  }

  ngOnInit(): void {
    this.latitude = this.latitude ?? this.defaultLatitude;
    this.longitude = this.longitude ?? this.defaultLongitude;

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder();
      const options = {
        componentRestrictions: { country: "us" },
      };
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement as HTMLInputElement, options);

      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          //get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          this.latitude = place.geometry.location.lat();
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          this.longitude = place.geometry.location.lng();

          this.line1 = '';
          this.line2 = '';
          this.street_number = '';
          this.route = '';
          this.city = '';
          this.state = '';
          this.postalCode = '';

          console.log("place.address_components",place.address_components)
          place.address_components?.map((addressComponent: any) => {
            const types = addressComponent.types;
            if(types.includes('subpremise')) {
              this.line2 = addressComponent.long_name;
            } else if(types.includes('locality')) {
              this.city = addressComponent.long_name;
            } else if(types.includes('administrative_area_level_1')) {
              this.state = addressComponent.long_name;
            } else if(types.includes('street_number')) {
              this.street_number = addressComponent.long_name;
            } else if(types.includes('route')) {
              this.route = addressComponent.long_name;
            } else if(types.includes('postal_code')) {
              this.postalCode = addressComponent.long_name;
            } else if(types.includes('country')) {
              this.country = addressComponent.long_name;
            }
          })
          this.emitLocationChange();
        });
      });

      autocomplete.addListener('types_changed', () => {
        this.ngZone.run(() => {
          
          this.emitLocationChange();
        });
      });
    });
  }

  emitLocationChange(): void {
    const location = new GeolocationModel();
    location.lat = this.latitude;
    location.lng = this.longitude;
    location.line1 = `${this.street_number} ${this.route}`.trim();
    location.line2 = this.line2;
    location.city = this.city;
    location.state = this.state;
    location.postalCode = this.postalCode;
    location.country = this.country;
    location.formatedAddress = (this.searchElementRef == null)? "" : this.searchElementRef.nativeElement.value;
    this.locationChanged.emit(location);
  }
  onInputEvent(event: any) {
    // You can access the input value using event.target.value
    const inputValue = event.target.value;
  }
  markerDragEnd($event: google.maps.MouseEvent): void {
    this.latitude = $event.latLng.lat();
    this.longitude = $event.latLng.lng();
    this.emitLocationChange();
  }

  handleMapScroll(event: WheelEvent): void {
    const zoomIncrement = event.deltaY > 0 ? -1 : 1; // Determine the zoom direction

    // Calculate the new zoom level
    const newZoom = this.zoom + zoomIncrement;

    // Limit the zoom level between the desired range (e.g., 1 to 20)
    const minZoom = 1;
    const maxZoom = 20;
    this.zoom = Math.max(minZoom, Math.min(newZoom, maxZoom));

    // Prevent the default behavior of the mouse wheel
    event.preventDefault();
  }
}
