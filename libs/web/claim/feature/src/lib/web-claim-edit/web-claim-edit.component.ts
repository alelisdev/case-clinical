
import { ActivatedRoute,Router } from '@angular/router'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormService } from '@case-clinical/web/ui/form'
import { WebClaimFeatureStore } from '@case-clinical/web/claim/shared'
import { map } from 'rxjs'

@Component({templateUrl: './web-claim-edit.component.html',
  providers: [WebClaimFeatureStore],
})
export class WebClaimEditComponent  implements OnInit, OnDestroy  {
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
 
    formIsReady() {
        this.store.loadClaimEffect(this.route.params.pipe(map((route) => route?.claimId)))
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
