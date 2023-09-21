
import { ActivatedRoute,Router } from '@angular/router'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormService } from '@case-clinical/web/ui/form'
import { WebReconciliationPeriodTypeFeatureStore } from '@case-clinical/web/reconciliation-period-type/shared'
import { map } from 'rxjs'

@Component({templateUrl: './web-reconciliation-period-type-edit.component.html',
  providers: [WebReconciliationPeriodTypeFeatureStore],
})
export class WebReconciliationPeriodTypeEditComponent  implements OnInit, OnDestroy  {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    
  }

  constructor(
    private readonly store: WebReconciliationPeriodTypeFeatureStore,
    private router: Router,
    private route: ActivatedRoute,
    public formService: FormService,
  ) {
    
  }
 
    formIsReady() {
        this.store.loadReconciliationPeriodTypeEffect(this.route.params.pipe(map((route) => route?.reconciliationPeriodTypeId)))
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
