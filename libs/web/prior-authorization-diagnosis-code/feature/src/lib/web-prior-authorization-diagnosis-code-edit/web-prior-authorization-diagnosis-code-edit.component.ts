
import { ActivatedRoute,Router } from '@angular/router'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormService } from '@case-clinical/web/ui/form'
import { WebPriorAuthorizationDiagnosisCodeFeatureStore } from '@case-clinical/web/prior-authorization-diagnosis-code/shared'
import { map } from 'rxjs'

@Component({templateUrl: './web-prior-authorization-diagnosis-code-edit.component.html',
  providers: [WebPriorAuthorizationDiagnosisCodeFeatureStore],
})
export class WebPriorAuthorizationDiagnosisCodeEditComponent  implements OnInit, OnDestroy  {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    diagnosisCodes: this.store.filterDiagnosisCodes(''),
priorAuthorizationRequests: this.store.filterPriorAuthorizationRequests('')
  }

  constructor(
    private readonly store: WebPriorAuthorizationDiagnosisCodeFeatureStore,
    private router: Router,
    private route: ActivatedRoute,
    public formService: FormService,
  ) {
    
  }
 
    formIsReady() {
        this.store.loadPriorAuthorizationDiagnosisCodeEffect(this.route.params.pipe(map((route) => route?.priorAuthorizationDiagnosisCodeId)))
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
