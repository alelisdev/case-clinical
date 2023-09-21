
import { ActivatedRoute,Router } from '@angular/router'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormService } from '@case-clinical/web/ui/form'
import { WebAttorneyFeatureStore } from '@case-clinical/web/attorney/shared'
import { map } from 'rxjs'

@Component({templateUrl: './web-attorney-edit.component.html',
  providers: [WebAttorneyFeatureStore],
})
export class WebAttorneyEditComponent  implements OnInit, OnDestroy  {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    firms: this.store.filterFirms(''),
attorneyStatuses: this.store.filterAttorneyStatuses(''),
attorneyTypes: this.store.filterAttorneyTypes('')
  }

  constructor(
    private readonly store: WebAttorneyFeatureStore,
    private router: Router,
    private route: ActivatedRoute,
    public formService: FormService,
  ) {
    
  }
 
    formIsReady() {
        this.store.loadAttorneyEffect(this.route.params.pipe(map((route) => route?.attorneyId)))
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
