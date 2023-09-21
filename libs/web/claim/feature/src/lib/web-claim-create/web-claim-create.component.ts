
import {ActivatedRoute,Router} from '@angular/router'
import {Component, OnDestroy, OnInit} from '@angular/core'
import {FormService} from '@case-clinical/web/ui/form'
import {WebClaimFeatureStore} from '@case-clinical/web/claim/shared'

@Component({templateUrl: './web-claim-create.component.html',
  providers: [WebClaimFeatureStore],
})
export class WebClaimCreateComponent implements OnInit, OnDestroy {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    priorAuthorizationRequests: this.store.filterPriorAuthorizationRequests(''),
documents: this.store.filterDocuments(''),
patients: this.store.filterPatients('')
  }

  constructor(
    private readonly store: WebClaimFeatureStore,
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
