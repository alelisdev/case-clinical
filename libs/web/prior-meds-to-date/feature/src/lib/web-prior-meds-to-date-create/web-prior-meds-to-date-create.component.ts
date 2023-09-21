
import {ActivatedRoute,Router} from '@angular/router'
import {Component, OnDestroy, OnInit} from '@angular/core'
import {FormService} from '@case-clinical/web/ui/form'
import {WebPriorMedsToDateFeatureStore} from '@case-clinical/web/prior-meds-to-date/shared'

@Component({templateUrl: './web-prior-meds-to-date-create.component.html',
  providers: [WebPriorMedsToDateFeatureStore],
})
export class WebPriorMedsToDateCreateComponent implements OnInit, OnDestroy {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    legalCases: this.store.filterLegalCases(''),
priorMedsToDateStatuses: this.store.filterPriorMedsToDateStatuses('')
  }

  constructor(
    private readonly store: WebPriorMedsToDateFeatureStore,
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
