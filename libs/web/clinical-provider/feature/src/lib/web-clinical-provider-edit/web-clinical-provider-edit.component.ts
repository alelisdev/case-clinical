
import { ActivatedRoute,Router } from '@angular/router'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormService } from '@case-clinical/web/ui/form'
import { WebClinicalProviderFeatureStore } from '@case-clinical/web/clinical-provider/shared'
import { map } from 'rxjs'

@Component({templateUrl: './web-clinical-provider-edit.component.html',
  providers: [WebClinicalProviderFeatureStore],
})
export class WebClinicalProviderEditComponent  implements OnInit, OnDestroy  {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    vendors: this.store.filterVendors('')
  }

  constructor(
    private readonly store: WebClinicalProviderFeatureStore,
    private router: Router,
    private route: ActivatedRoute,
    public formService: FormService,
  ) {
    
  }
 
    formIsReady() {
        this.store.loadClinicalProviderEffect(this.route.params.pipe(map((route) => route?.clinicalProviderId)))
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
