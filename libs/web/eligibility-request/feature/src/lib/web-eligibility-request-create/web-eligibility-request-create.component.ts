
import {ActivatedRoute,Router} from '@angular/router'
import {Component, OnDestroy, OnInit} from '@angular/core'
import {FormService} from '@case-clinical/web/ui/form'
import {WebEligibilityRequestFeatureStore} from '@case-clinical/web/eligibility-request/shared'

@Component({templateUrl: './web-eligibility-request-create.component.html',
  providers: [WebEligibilityRequestFeatureStore],
})
export class WebEligibilityRequestCreateComponent implements OnInit, OnDestroy {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    eligibilityStatuses: this.store.filterEligibilityStatuses('')
  }

  constructor(
    private readonly store: WebEligibilityRequestFeatureStore,
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
