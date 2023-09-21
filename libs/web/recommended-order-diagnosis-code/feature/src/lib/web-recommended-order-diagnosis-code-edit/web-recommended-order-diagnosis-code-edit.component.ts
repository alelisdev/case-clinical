
import { ActivatedRoute,Router } from '@angular/router'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormService } from '@case-clinical/web/ui/form'
import { WebRecommendedOrderDiagnosisCodeFeatureStore } from '@case-clinical/web/recommended-order-diagnosis-code/shared'
import { map } from 'rxjs'

@Component({templateUrl: './web-recommended-order-diagnosis-code-edit.component.html',
  providers: [WebRecommendedOrderDiagnosisCodeFeatureStore],
})
export class WebRecommendedOrderDiagnosisCodeEditComponent  implements OnInit, OnDestroy  {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    diagnosisCodes: this.store.filterDiagnosisCodes(''),
recommendedOrders: this.store.filterRecommendedOrders('')
  }

  constructor(
    private readonly store: WebRecommendedOrderDiagnosisCodeFeatureStore,
    private router: Router,
    private route: ActivatedRoute,
    public formService: FormService,
  ) {
    
  }
 
    formIsReady() {
        this.store.loadRecommendedOrderDiagnosisCodeEffect(this.route.params.pipe(map((route) => route?.recommendedOrderDiagnosisCodeId)))
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
