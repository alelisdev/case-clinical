
import { ActivatedRoute,Router } from '@angular/router'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormService } from '@case-clinical/web/ui/form'
import { WebProcedureOrTreatmentRequestAuthorizationFeatureStore } from '@case-clinical/web/procedure-or-treatment-request-authorization/shared'
import { map } from 'rxjs'

@Component({templateUrl: './web-procedure-or-treatment-request-authorization-edit.component.html',
  providers: [WebProcedureOrTreatmentRequestAuthorizationFeatureStore],
})
export class WebProcedureOrTreatmentRequestAuthorizationEditComponent  implements OnInit, OnDestroy  {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    authorizations: this.store.filterAuthorizations(''),
procedureOrTreatmentRequests: this.store.filterProcedureOrTreatmentRequests('')
  }

  constructor(
    private readonly store: WebProcedureOrTreatmentRequestAuthorizationFeatureStore,
    private router: Router,
    private route: ActivatedRoute,
    public formService: FormService,
  ) {
    
  }
 
    formIsReady() {
        this.store.loadProcedureOrTreatmentRequestAuthorizationEffect(this.route.params.pipe(map((route) => route?.procedureOrTreatmentRequestAuthorizationId)))
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
