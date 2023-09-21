
import { ActivatedRoute,Router } from '@angular/router'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormService } from '@case-clinical/web/ui/form'
import { WebContractedRateFeatureStore } from '@case-clinical/web/contracted-rate/shared'
import { map } from 'rxjs'

@Component({templateUrl: './web-contracted-rate-edit.component.html',
  providers: [WebContractedRateFeatureStore],
})
export class WebContractedRateEditComponent  implements OnInit, OnDestroy  {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    contracts: this.store.filterContracts(''),
contractedRateKinds: this.store.filterContractedRateKinds(''),
contractKinds: this.store.filterContractKinds(''),
visitKinds: this.store.filterVisitKinds(''),
clinicalProviders: this.store.filterClinicalProviders(''),
specialties: this.store.filterSpecialties('')
  }

  constructor(
    private readonly store: WebContractedRateFeatureStore,
    private router: Router,
    private route: ActivatedRoute,
    public formService: FormService,
  ) {
    
  }
 
    formIsReady() {
        this.store.loadContractedRateEffect(this.route.params.pipe(map((route) => route?.contractedRateId)))
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
