
import {ActivatedRoute,Router} from '@angular/router'
import {Component, OnDestroy, OnInit} from '@angular/core'
import {FormService} from '@case-clinical/web/ui/form'
import {WebAppointmentFeatureStore} from '@case-clinical/web/appointment/shared'

@Component({templateUrl: './web-appointment-create.component.html',
  providers: [WebAppointmentFeatureStore],
})
export class WebAppointmentCreateComponent implements OnInit, OnDestroy {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    locations: this.store.filterLocations(''),
    patients: this.store.filterPatients(''),
    clinicalProviders: this.store.filterClinicalProviders(''),
    legalCases: this.store.filterLegalCases(''),
    appointmentStatuses: this.store.filterAppointmentStatuses(''),
    visitKinds: this.store.filterVisitKinds('')

  }

  constructor(
    private readonly store: WebAppointmentFeatureStore,
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
