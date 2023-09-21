
import {ActivatedRoute,Router} from '@angular/router'
import {Component, OnDestroy, OnInit} from '@angular/core'
import {FormService} from '@case-clinical/web/ui/form'
import {WebProcedureOrTreatmentRequestDiagnosisCodeFeatureStore} from '@case-clinical/web/procedure-or-treatment-request-diagnosis-code/shared'

@Component({templateUrl: './web-procedure-or-treatment-request-diagnosis-code-create.component.html',
  providers: [WebProcedureOrTreatmentRequestDiagnosisCodeFeatureStore],
})
export class WebProcedureOrTreatmentRequestDiagnosisCodeCreateComponent implements OnInit, OnDestroy {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    diagnosisCodes: this.store.filterDiagnosisCodes(''),
procedureOrTreatmentRequests: this.store.filterProcedureOrTreatmentRequests('')
  }

  constructor(
    private readonly store: WebProcedureOrTreatmentRequestDiagnosisCodeFeatureStore,
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
