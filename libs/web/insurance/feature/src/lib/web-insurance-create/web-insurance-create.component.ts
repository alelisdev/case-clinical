
import {ActivatedRoute,Router} from '@angular/router'
import {Component, OnDestroy, OnInit} from '@angular/core'
import {FormService} from '@case-clinical/web/ui/form'
import {WebInsuranceFeatureStore} from '@case-clinical/web/insurance/shared'

@Component({templateUrl: './web-insurance-create.component.html',
  providers: [WebInsuranceFeatureStore],
})
export class WebInsuranceCreateComponent implements OnInit, OnDestroy {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    legalCases: this.store.filterLegalCases(''),
insuranceTypes: this.store.filterInsuranceTypes(''),
insuranceSectors: this.store.filterInsuranceSectors(''),
leads: this.store.filterLeads('')
  }

  constructor(
    private readonly store: WebInsuranceFeatureStore,
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
