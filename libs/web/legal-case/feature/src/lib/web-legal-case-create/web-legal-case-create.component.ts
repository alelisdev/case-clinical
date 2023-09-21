
import {ActivatedRoute,Router} from '@angular/router'
import {Component, OnDestroy, OnInit} from '@angular/core'
import {FormService} from '@case-clinical/web/ui/form'
import {WebLegalCaseFeatureStore} from '@case-clinical/web/legal-case/shared'

@Component({templateUrl: './web-legal-case-create.component.html',
  providers: [WebLegalCaseFeatureStore],
})
export class WebLegalCaseCreateComponent implements OnInit, OnDestroy {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    accidentTypes: this.store.filterAccidentTypes(''),
patients: this.store.filterPatients(''),
medLevels: this.store.filterMedLevels(''),
firms: this.store.filterFirms(''),
attorneys: this.store.filterAttorneys(''),
caseStatuses: this.store.filterCaseStatuses(''),
caseTypes: this.store.filterCaseTypes(''),
patientTreatmentStatuses: this.store.filterPatientTreatmentStatuses(''),
caseProgressStatuses: this.store.filterCaseProgressStatuses(''),
adverseInsuranceStatuses: this.store.filterAdverseInsuranceStatuses('')
  }

  constructor(
    private readonly store: WebLegalCaseFeatureStore,
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
