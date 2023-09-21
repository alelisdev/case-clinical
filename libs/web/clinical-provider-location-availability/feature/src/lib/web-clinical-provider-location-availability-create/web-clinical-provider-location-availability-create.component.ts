
import {ActivatedRoute,Router} from '@angular/router'
import {Component, OnDestroy, OnInit} from '@angular/core'
import {FormService} from '@case-clinical/web/ui/form'
import {WebClinicalProviderLocationAvailabilityFeatureStore} from '@case-clinical/web/clinical-provider-location-availability/shared'

@Component({templateUrl: './web-clinical-provider-location-availability-create.component.html',
  providers: [WebClinicalProviderLocationAvailabilityFeatureStore],
})
export class WebClinicalProviderLocationAvailabilityCreateComponent implements OnInit, OnDestroy {
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

  ngOnInit(): void {
    this.subscriber = this.store.actionResult$.subscribe(({ done, item }) => {
      if(done) {
        this.router.navigate(['..', item?.id], { relativeTo: this.route })
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
