
import { ActivatedRoute,Router } from '@angular/router'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormService } from '@case-clinical/web/ui/form'
import { WebVendorLocationFeatureStore } from '@case-clinical/web/vendor-location/shared'
import { map } from 'rxjs'

@Component({templateUrl: './web-vendor-location-edit.component.html',
  providers: [WebVendorLocationFeatureStore],
})
export class WebVendorLocationEditComponent  implements OnInit, OnDestroy  {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    locations: this.store.filterLocations(''),
vendors: this.store.filterVendors('')
  }

  constructor(
    private readonly store: WebVendorLocationFeatureStore,
    private router: Router,
    private route: ActivatedRoute,
    public formService: FormService,
  ) {
    
  }
 
    formIsReady() {
        this.store.loadVendorLocationEffect(this.route.params.pipe(map((route) => route?.vendorLocationId)))
    }

   ngOnInit(): void {
    this.subscriber = this.store.actionResult$.subscribe(({ done, item }) => {
      if(done) {
        this.router.navigate(['..'], { relativeTo: this.route })
      }
    })
  }

  ngOnDestroy(): void {
    this.subscriber?.unsubscribe();
  }

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }
}
