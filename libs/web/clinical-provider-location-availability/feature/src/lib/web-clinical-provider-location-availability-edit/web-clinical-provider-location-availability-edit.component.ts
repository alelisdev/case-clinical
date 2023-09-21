
import { ActivatedRoute,Router } from '@angular/router'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormService } from '@case-clinical/web/ui/form'
import { WebClinicalProviderLocationAvailabilityFeatureStore } from '@case-clinical/web/clinical-provider-location-availability/shared'
import { map } from 'rxjs'

@Component({templateUrl: './web-clinical-provider-location-availability-edit.component.html',
  providers: [WebClinicalProviderLocationAvailabilityFeatureStore],
})
export class WebClinicalProviderLocationAvailabilityEditComponent  implements OnInit, OnDestroy  {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    clinicalProviderLocations: this.store.filterClinicalProviderLocations('')
  }

  constructor(
    private readonly store: WebClinicalProviderLocationAvailabilityFeatureStore,
    private router: Router,
    private route: ActivatedRoute,
    public formService: FormService,
  ) {
    
  }
 
    formIsReady() {
        this.store.loadClinicalProviderLocationAvailabilityEffect(this.route.params.pipe(map((route) => route?.clinicalProviderLocationAvailabilityId)))
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
