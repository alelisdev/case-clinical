/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { AgmInfoWindow, MapsAPILoader } from '@agm/core';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { DataContextService } from '../../context-provider/data-context.service';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormService } from '../../form.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { TailwindService } from '@case-clinical/web/ui/formly-designer';
import { UiFormBaseField } from '../../types/base-field-type';
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access';
import { WebUiToastService } from '@case-clinical/web/ui/toast';

@Component({
  templateUrl: './googlemapbuilder.html',
  styleUrls: ['./style.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoogleMapBuilderComponent extends UiFormBaseField implements OnInit, OnDestroy, AfterViewInit {
  googleNativeMap: google.maps.Map;
  infoWindowOpen: AgmInfoWindow = null;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  defaultLatitude = 36.98500309285596;
  defaultLongitude = -79.189453125;

  startLtd = 36.98500309285596
  startLng = -79.189453125

  endLtd = 36.98500309285596
  endLng = -79.189453125
  useLocationDirection = false

  latitudeProp;
  longitudeProp
  iconUrl;
  fit = false;

  windowField: FormlyFieldConfig;
  data = []

  constructor(private mapsAPILoader: MapsAPILoader, public apiLoaderService: WebCoreDataAccessService,
    public cd: ChangeDetectorRef,
    public service: DataContextService,
    public formservice: FormService,
    public tailwindService: TailwindService,
    public cdr: ChangeDetectorRef,
    private toast: WebUiToastService,
    public elr: ElementRef) {
    super(apiLoaderService, cd, service, formservice, tailwindService, cdr, elr)
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.fit = this.to.fit;
    this.latitudeProp = this.to.latitudeProp ?? 'latitude';
    this.longitudeProp = this.to.longitudeProp ?? 'longitude';
    this.iconUrl = this.to.iconUrl ?? '/assets/icons/map_icon/default.svg';

    const dataKey = this.to.dataKey;
    if (dataKey) {
      if (this.field.fieldGroup.length > 0) {
        this.windowField = this.field.fieldGroup[0];
      }

      const source = this.service.getValue(dataKey);
      if(source instanceof Observable) {
        source.pipe(takeUntil(this._unsubscribeAll)).subscribe(data => {
          this.data = data;
          this.cd.detectChanges()
        })
      } else {
        this.service.getDataStream().pipe(takeUntil(this._unsubscribeAll)).subscribe(_data => {
          if (_data) {
            const data = this.formService.getValueForKey(dataKey, _data);
            this.data = data;
            this.cd.detectChanges()
          }
        })
      }

    }

    if (this.to.useDatakeyForCenLat) {
      this.service.getDataStream().pipe(takeUntil(this._unsubscribeAll)).subscribe(_data => {
        if (_data) {
          const data = this.formService.getValueForKey(this.to.datakeyForCenLat, _data);
          if (data) {
            this.defaultLatitude = Number(data.toString());;
            this.cd.detectChanges()
          }
        }
      })
    }
    if (this.to.datakeyForCenLtd) {
      this.service.getDataStream().pipe(takeUntil(this._unsubscribeAll)).subscribe(_data => {
        if (_data) {

          const data = this.formService.getValueForKey(this.to.datakeyForCenLtd, _data);
          if (data) {
            this.defaultLongitude = Number(data.toString());;
            this.cd.detectChanges()
          }
        }
      })
    }

    if (this.to.startLatitudeProp) {
      this.service.getDataStream().pipe(takeUntil(this._unsubscribeAll)).subscribe(_data => {
        if (_data) {
          const startLtd = this.formService.getValueForKey(this.to.startLatitudeProp, _data);
          if (startLtd) {
            this.startLtd = Number(startLtd.toString());
            this.cd.detectChanges()
          }
        }
      })
    }

    if (this.to.startLongitudeProp) {
      this.service.getDataStream().pipe(takeUntil(this._unsubscribeAll)).subscribe(_data => {
        if (_data) {
          const startLng = this.formService.getValueForKey(this.to.startLongitudeProp, _data);
          if (startLng) {
            this.startLng = Number(startLng.toString());;
            this.cd.detectChanges()
          }
        }
      })
    }

    if (this.to.endLatitudeProp) {
      this.service.getDataStream().pipe(takeUntil(this._unsubscribeAll)).subscribe(_data => {
        if (_data) {
          const endLtd = this.formService.getValueForKey(this.to.endLatitudeProp, _data);
          if (endLtd) {
            this.endLtd = Number(endLtd.toString());;
            this.cd.detectChanges()
          }
        }
      })
    }

    if (this.to.endLongitudeProp) {
      this.service.getDataStream().pipe(takeUntil(this._unsubscribeAll)).subscribe(_data => {
        if (_data) {
          const endLng = this.formService.getValueForKey(this.to.endLongitudeProp, _data);
          if (endLng) {
            this.endLng = Number(endLng.toString());;
            this.cd.detectChanges()
          }
        }
      })
    }
  }

  onMarkerClick(infoWindow: AgmInfoWindow) {
    if (this.infoWindowOpen) {
      this.infoWindowOpen.close();
    }
    this.infoWindowOpen = infoWindow;
    infoWindow.open();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this._unsubscribeAll?.next(null);
    this._unsubscribeAll?.complete();
  }

  ngAfterViewInit() {
    this.mapsAPILoader.load().then(() => {
      // Code that relies on the Google Maps API should be placed here
      this.getDirections();
    });
  }

  onMapReady(map: google.maps.Map) {
    // Use the 'map' object as needed
    this.googleNativeMap = map

  }
  getDirections() {
    if (!this.to.useLocationDirection) return;
    const directionsService = new google.maps.DirectionsService();

    // origin: { lat: 37.77, lng: -122.447 }, // Haight.
    // destination: { lat: 37.768, lng: -122.511 }, /

    const request: google.maps.DirectionsRequest = {
      origin: { lat: this.startLtd, lng: this.startLng }, // Start location
      destination: { lat: this.endLtd, lng: this.endLng }, // Replace with the actual destination address or coordinates
      travelMode: google.maps.TravelMode.DRIVING // Change travel mode as required (e.g., DRIVING, TRANSIT, WALKING)
    };

    directionsService.route(request, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        // Handle the directions result here
        new google.maps.DirectionsRenderer({
          map: this.googleNativeMap,
          directions: result
        })
      } else if (status === google.maps.DirectionsStatus.ZERO_RESULTS) {
        this.toast.error('Failed to find routes');
      }
    });
  }

  getStyle() {
    if (this.fit) return 'height: 100%;';
    else return 'height: 70vh;'
  }
}
