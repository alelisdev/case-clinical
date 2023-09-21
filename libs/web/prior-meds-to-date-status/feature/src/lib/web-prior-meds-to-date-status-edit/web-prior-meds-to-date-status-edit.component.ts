
import { ActivatedRoute,Router } from '@angular/router'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormService } from '@case-clinical/web/ui/form'
import { WebPriorMedsToDateStatusFeatureStore } from '@case-clinical/web/prior-meds-to-date-status/shared'
import { map } from 'rxjs'

@Component({templateUrl: './web-prior-meds-to-date-status-edit.component.html',
  providers: [WebPriorMedsToDateStatusFeatureStore],
})
export class WebPriorMedsToDateStatusEditComponent  implements OnInit, OnDestroy  {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    
  }

  constructor(
    private readonly store: WebPriorMedsToDateStatusFeatureStore,
    private router: Router,
    private route: ActivatedRoute,
    public formService: FormService,
  ) {
    
  }
 
    formIsReady() {
        this.store.loadPriorMedsToDateStatusEffect(this.route.params.pipe(map((route) => route?.priorMedsToDateStatusId)))
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
