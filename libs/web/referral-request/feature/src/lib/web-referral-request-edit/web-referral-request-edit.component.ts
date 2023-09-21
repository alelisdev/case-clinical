
import { ActivatedRoute,Router } from '@angular/router'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormService } from '@case-clinical/web/ui/form'
import { WebReferralRequestFeatureStore } from '@case-clinical/web/referral-request/shared'
import { map } from 'rxjs'

@Component({templateUrl: './web-referral-request-edit.component.html',
  providers: [WebReferralRequestFeatureStore],
})
export class WebReferralRequestEditComponent  implements OnInit, OnDestroy  {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    patients: this.store.filterPatients(''),
legalCases: this.store.filterLegalCases(''),
clinicalProviders: this.store.filterClinicalProviders(''),
clinicalProviderLocations: this.store.filterClinicalProviderLocations('')
  }

  constructor(
    private readonly store: WebReferralRequestFeatureStore,
    private router: Router,
    private route: ActivatedRoute,
    public formService: FormService,
  ) {
    
  }
 
    formIsReady() {
        this.store.loadReferralRequestEffect(this.route.params.pipe(map((route) => route?.referralRequestId)))
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
