
import { ActivatedRoute,Router } from '@angular/router'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormService } from '@case-clinical/web/ui/form'
import { WebFeeScheduleFeatureStore } from '@case-clinical/web/fee-schedule/shared'
import { map } from 'rxjs'

@Component({templateUrl: './web-fee-schedule-edit.component.html',
  providers: [WebFeeScheduleFeatureStore],
})
export class WebFeeScheduleEditComponent  implements OnInit, OnDestroy  {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    organizations: this.store.filterOrganizations(''),
specialties: this.store.filterSpecialties('')
  }

  constructor(
    private readonly store: WebFeeScheduleFeatureStore,
    private router: Router,
    private route: ActivatedRoute,
    public formService: FormService,
  ) {
    
  }
 
    formIsReady() {
        this.store.loadFeeScheduleEffect(this.route.params.pipe(map((route) => route?.feeScheduleId)))
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
