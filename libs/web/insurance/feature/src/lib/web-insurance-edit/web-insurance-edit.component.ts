
import { ActivatedRoute,Router } from '@angular/router'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormService } from '@case-clinical/web/ui/form'
import { WebInsuranceFeatureStore } from '@case-clinical/web/insurance/shared'
import { map } from 'rxjs'

@Component({templateUrl: './web-insurance-edit.component.html',
  providers: [WebInsuranceFeatureStore],
})
export class WebInsuranceEditComponent  implements OnInit, OnDestroy  {
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
 
    formIsReady() {
        this.store.loadInsuranceEffect(this.route.params.pipe(map((route) => route?.insuranceId)))
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
