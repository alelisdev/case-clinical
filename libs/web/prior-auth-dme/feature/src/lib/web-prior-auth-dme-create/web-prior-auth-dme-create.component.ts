
import {ActivatedRoute,Router} from '@angular/router'
import {Component, OnDestroy, OnInit} from '@angular/core'
import {FormService} from '@case-clinical/web/ui/form'
import {WebPriorAuthDmeFeatureStore} from '@case-clinical/web/prior-auth-dme/shared'

@Component({templateUrl: './web-prior-auth-dme-create.component.html',
  providers: [WebPriorAuthDmeFeatureStore],
})
export class WebPriorAuthDmeCreateComponent implements OnInit, OnDestroy {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    priorAuthorizationRequests: this.store.filterPriorAuthorizationRequests(''),
durableMedicalEquipments: this.store.filterDurableMedicalEquipments('')
  }

  constructor(
    private readonly store: WebPriorAuthDmeFeatureStore,
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
