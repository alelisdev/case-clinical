
import { ActivatedRoute,Router } from '@angular/router'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormService } from '@case-clinical/web/ui/form'
import { WebPriorAuthDmeFeatureStore } from '@case-clinical/web/prior-auth-dme/shared'
import { map } from 'rxjs'

@Component({templateUrl: './web-prior-auth-dme-edit.component.html',
  providers: [WebPriorAuthDmeFeatureStore],
})
export class WebPriorAuthDmeEditComponent  implements OnInit, OnDestroy  {
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
 
    formIsReady() {
        this.store.loadPriorAuthDmeEffect(this.route.params.pipe(map((route) => route?.priorAuthDmeId)))
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
