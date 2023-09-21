
import {ActivatedRoute,Router} from '@angular/router'
import {Component, OnDestroy, OnInit} from '@angular/core'
import {FormService} from '@case-clinical/web/ui/form'
import {WebFacilityFeeScheduleFeatureStore} from '@case-clinical/web/facility-fee-schedule/shared'

@Component({templateUrl: './web-facility-fee-schedule-create.component.html',
  providers: [WebFacilityFeeScheduleFeatureStore],
})
export class WebFacilityFeeScheduleCreateComponent implements OnInit, OnDestroy {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    organizations: this.store.filterOrganizations(''),
specialties: this.store.filterSpecialties('')
  }

  constructor(
    private readonly store: WebFacilityFeeScheduleFeatureStore,
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
