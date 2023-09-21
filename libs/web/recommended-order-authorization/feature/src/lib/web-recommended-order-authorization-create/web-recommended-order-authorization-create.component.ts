
import {ActivatedRoute,Router} from '@angular/router'
import {Component, OnDestroy, OnInit} from '@angular/core'
import {FormService} from '@case-clinical/web/ui/form'
import {WebRecommendedOrderAuthorizationFeatureStore} from '@case-clinical/web/recommended-order-authorization/shared'

@Component({templateUrl: './web-recommended-order-authorization-create.component.html',
  providers: [WebRecommendedOrderAuthorizationFeatureStore],
})
export class WebRecommendedOrderAuthorizationCreateComponent implements OnInit, OnDestroy {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    authorizations: this.store.filterAuthorizations(''),
recommendedOrders: this.store.filterRecommendedOrders('')
  }

  constructor(
    private readonly store: WebRecommendedOrderAuthorizationFeatureStore,
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
