
import {ActivatedRoute,Router} from '@angular/router'
import {Component, OnDestroy, OnInit} from '@angular/core'
import {FormService} from '@case-clinical/web/ui/form'
import {WebRequestAdditionalVisitFeatureStore} from '@case-clinical/web/request-additional-visit/shared'

@Component({templateUrl: './web-request-additional-visit-create.component.html',
  providers: [WebRequestAdditionalVisitFeatureStore],
})
export class WebRequestAdditionalVisitCreateComponent implements OnInit, OnDestroy {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    patients: this.store.filterPatients(''),
legalCases: this.store.filterLegalCases('')
  }

  constructor(
    private readonly store: WebRequestAdditionalVisitFeatureStore,
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
