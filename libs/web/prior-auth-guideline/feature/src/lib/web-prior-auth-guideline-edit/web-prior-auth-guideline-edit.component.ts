
import { ActivatedRoute,Router } from '@angular/router'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormService } from '@case-clinical/web/ui/form'
import { WebPriorAuthGuidelineFeatureStore } from '@case-clinical/web/prior-auth-guideline/shared'
import { map } from 'rxjs'

@Component({templateUrl: './web-prior-auth-guideline-edit.component.html',
  providers: [WebPriorAuthGuidelineFeatureStore],
})
export class WebPriorAuthGuidelineEditComponent  implements OnInit, OnDestroy  {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    guidelines: this.store.filterGuidelines(''),
priorAuthorizationRequests: this.store.filterPriorAuthorizationRequests('')
  }

  constructor(
    private readonly store: WebPriorAuthGuidelineFeatureStore,
    private router: Router,
    private route: ActivatedRoute,
    public formService: FormService,
  ) {
    
  }
 
    formIsReady() {
        this.store.loadPriorAuthGuidelineEffect(this.route.params.pipe(map((route) => route?.priorAuthGuidelineId)))
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
