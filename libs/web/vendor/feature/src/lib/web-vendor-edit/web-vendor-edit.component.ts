
import { ActivatedRoute,Router } from '@angular/router'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormService } from '@case-clinical/web/ui/form'
import { WebVendorFeatureStore } from '@case-clinical/web/vendor/shared'
import { map } from 'rxjs'

@Component({templateUrl: './web-vendor-edit.component.html',
  providers: [WebVendorFeatureStore],
})
export class WebVendorEditComponent  implements OnInit, OnDestroy  {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    vendorTypes: this.store.filterVendorTypes('')
  }

  constructor(
    private readonly store: WebVendorFeatureStore,
    private router: Router,
    private route: ActivatedRoute,
    public formService: FormService,
  ) {
    
  }
 
    formIsReady() {
        this.store.loadVendorEffect(this.route.params.pipe(map((route) => route?.vendorId)))
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
