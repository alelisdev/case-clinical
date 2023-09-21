
import { ActivatedRoute,Router } from '@angular/router'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormService } from '@case-clinical/web/ui/form'
import { WebContractTermFeatureStore } from '@case-clinical/web/contract-term/shared'
import { map } from 'rxjs'

@Component({templateUrl: './web-contract-term-edit.component.html',
  providers: [WebContractTermFeatureStore],
})
export class WebContractTermEditComponent  implements OnInit, OnDestroy  {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    contracts: this.store.filterContracts('')
  }

  constructor(
    private readonly store: WebContractTermFeatureStore,
    private router: Router,
    private route: ActivatedRoute,
    public formService: FormService,
  ) {
    
  }
 
    formIsReady() {
        this.store.loadContractTermEffect(this.route.params.pipe(map((route) => route?.contractTermId)))
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
