
import { ActivatedRoute,Router } from '@angular/router'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormService } from '@case-clinical/web/ui/form'
import { WebPriorAuthorizationRequestFeatureStore } from '@case-clinical/web/prior-authorization-request/shared'
import { map } from 'rxjs'

@Component({templateUrl: './web-prior-authorization-request-edit.component.html',
  providers: [WebPriorAuthorizationRequestFeatureStore],
})
export class WebPriorAuthorizationRequestEditComponent  implements OnInit, OnDestroy  {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    procedureSites: this.store.filterProcedureSites(''),
surgicalPositions: this.store.filterSurgicalPositions(''),
clinicalProviders: this.store.filterClinicalProviders(''),
documents: this.store.filterDocuments(''),
visitKinds: this.store.filterVisitKinds(''),
guidelineUseds: this.store.filterGuidelineUseds(''),
authorizationKinds: this.store.filterAuthorizationKinds(''),
authorizationStatuses: this.store.filterAuthorizationStatuses(''),
patients: this.store.filterPatients(''),
caseProcedures: this.store.filterCaseProcedures('')
  }

  constructor(
    private readonly store: WebPriorAuthorizationRequestFeatureStore,
    private router: Router,
    private route: ActivatedRoute,
    public formService: FormService,
  ) {
    
  }
 
    formIsReady() {
        this.store.loadPriorAuthorizationRequestEffect(this.route.params.pipe(map((route) => route?.priorAuthorizationRequestId)))
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
