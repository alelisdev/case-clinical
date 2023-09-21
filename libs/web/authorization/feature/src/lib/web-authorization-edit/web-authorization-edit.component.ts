
import { ActivatedRoute,Router } from '@angular/router'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormService } from '@case-clinical/web/ui/form'
import { WebAuthorizationFeatureStore } from '@case-clinical/web/authorization/shared'
import { map } from 'rxjs'

@Component({templateUrl: './web-authorization-edit.component.html',
  providers: [WebAuthorizationFeatureStore],
})
export class WebAuthorizationEditComponent  implements OnInit, OnDestroy  {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    vendors: this.store.filterVendors(''),
authorizationCategories: this.store.filterAuthorizationCategories(''),
authorizationTypes: this.store.filterAuthorizationTypes(''),
procedures: this.store.filterProcedures('')
  }

  constructor(
    private readonly store: WebAuthorizationFeatureStore,
    private router: Router,
    private route: ActivatedRoute,
    public formService: FormService,
  ) {
    
  }
 
    formIsReady() {
        this.store.loadAuthorizationEffect(this.route.params.pipe(map((route) => route?.authorizationId)))
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
