
import { ActivatedRoute,Router } from '@angular/router'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormService } from '@case-clinical/web/ui/form'
import { WebPriorAuthorizationImplantFeatureStore } from '@case-clinical/web/prior-authorization-implant/shared'
import { map } from 'rxjs'

@Component({templateUrl: './web-prior-authorization-implant-edit.component.html',
  providers: [WebPriorAuthorizationImplantFeatureStore],
})
export class WebPriorAuthorizationImplantEditComponent  implements OnInit, OnDestroy  {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    implants: this.store.filterImplants(''),
priorAuthorizationRequests: this.store.filterPriorAuthorizationRequests('')
  }

  constructor(
    private readonly store: WebPriorAuthorizationImplantFeatureStore,
    private router: Router,
    private route: ActivatedRoute,
    public formService: FormService,
  ) {
    
  }
 
    formIsReady() {
        this.store.loadPriorAuthorizationImplantEffect(this.route.params.pipe(map((route) => route?.priorAuthorizationImplantId)))
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
