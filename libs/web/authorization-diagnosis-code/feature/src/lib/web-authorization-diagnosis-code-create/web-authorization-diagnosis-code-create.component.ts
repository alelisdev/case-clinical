
import {ActivatedRoute,Router} from '@angular/router'
import {Component, OnDestroy, OnInit} from '@angular/core'
import {FormService} from '@case-clinical/web/ui/form'
import {WebAuthorizationDiagnosisCodeFeatureStore} from '@case-clinical/web/authorization-diagnosis-code/shared'

@Component({templateUrl: './web-authorization-diagnosis-code-create.component.html',
  providers: [WebAuthorizationDiagnosisCodeFeatureStore],
})
export class WebAuthorizationDiagnosisCodeCreateComponent implements OnInit, OnDestroy {
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
