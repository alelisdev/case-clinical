
import { ActivatedRoute,Router } from '@angular/router'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormService } from '@case-clinical/web/ui/form'
import { WebPriorAuthorizationProcedureCodeFeatureStore } from '@case-clinical/web/prior-authorization-procedure-code/shared'
import { map } from 'rxjs'

@Component({templateUrl: './web-prior-authorization-procedure-code-edit.component.html',
  providers: [WebPriorAuthorizationProcedureCodeFeatureStore],
})
export class WebPriorAuthorizationProcedureCodeEditComponent  implements OnInit, OnDestroy  {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    costCategories: this.store.filterCostCategories(''),
procedures: this.store.filterProcedures(''),
priorAuthorizationRequests: this.store.filterPriorAuthorizationRequests('')
  }

  constructor(
    private readonly store: WebPriorAuthorizationProcedureCodeFeatureStore,
    private router: Router,
    private route: ActivatedRoute,
    public formService: FormService,
  ) {
    
  }
 
    formIsReady() {
        this.store.loadPriorAuthorizationProcedureCodeEffect(this.route.params.pipe(map((route) => route?.priorAuthorizationProcedureCodeId)))
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
