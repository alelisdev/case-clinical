
import {ActivatedRoute,Router} from '@angular/router'
import {Component, OnDestroy, OnInit} from '@angular/core'
import {FormService} from '@case-clinical/web/ui/form'
import {WebContractedRateFeatureStore} from '@case-clinical/web/contracted-rate/shared'

@Component({templateUrl: './web-contracted-rate-create.component.html',
  providers: [WebContractedRateFeatureStore],
})
export class WebContractedRateCreateComponent implements OnInit, OnDestroy {
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
