
import { ActivatedRoute,Router } from '@angular/router'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormService } from '@case-clinical/web/ui/form'
import { WebClinicalProviderLocationFeatureStore } from '@case-clinical/web/clinical-provider-location/shared'
import { map } from 'rxjs'

@Component({templateUrl: './web-clinical-provider-location-edit.component.html',
  providers: [WebClinicalProviderLocationFeatureStore],
})
export class WebClinicalProviderLocationEditComponent  implements OnInit, OnDestroy  {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    clinicalProviders: this.store.filterClinicalProviders(''),
locations: this.store.filterLocations('')
  }

  constructor(
    private readonly store: WebClinicalProviderLocationFeatureStore,
    private router: Router,
    private route: ActivatedRoute,
    public formService: FormService,
  ) {
    
  }
 
    formIsReady() {
        this.store.loadClinicalProviderLocationEffect(this.route.params.pipe(map((route) => route?.clinicalProviderLocationId)))
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
