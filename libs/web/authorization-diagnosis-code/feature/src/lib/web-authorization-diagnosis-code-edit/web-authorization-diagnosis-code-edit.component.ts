
import { ActivatedRoute,Router } from '@angular/router'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormService } from '@case-clinical/web/ui/form'
import { WebAuthorizationDiagnosisCodeFeatureStore } from '@case-clinical/web/authorization-diagnosis-code/shared'
import { map } from 'rxjs'

@Component({templateUrl: './web-authorization-diagnosis-code-edit.component.html',
  providers: [WebAuthorizationDiagnosisCodeFeatureStore],
})
export class WebAuthorizationDiagnosisCodeEditComponent  implements OnInit, OnDestroy  {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    diagnosisCodes: this.store.filterDiagnosisCodes(''),
authorizations: this.store.filterAuthorizations('')
  }

  constructor(
    private readonly store: WebAuthorizationDiagnosisCodeFeatureStore,
    private router: Router,
    private route: ActivatedRoute,
    public formService: FormService,
  ) {
    
  }
 
    formIsReady() {
        this.store.loadAuthorizationDiagnosisCodeEffect(this.route.params.pipe(map((route) => route?.authorizationDiagnosisCodeId)))
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
