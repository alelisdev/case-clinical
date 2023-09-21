
import { ActivatedRoute,Router } from '@angular/router'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormService } from '@case-clinical/web/ui/form'
import { WebProcedureVendorFeatureStore } from '@case-clinical/web/procedure-vendor/shared'
import { map } from 'rxjs'

@Component({templateUrl: './web-procedure-vendor-edit.component.html',
  providers: [WebProcedureVendorFeatureStore],
})
export class WebProcedureVendorEditComponent  implements OnInit, OnDestroy  {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    caseProcedures: this.store.filterCaseProcedures(''),
contracts: this.store.filterContracts(''),
vendors: this.store.filterVendors(''),
procedureVendorStatuses: this.store.filterProcedureVendorStatuses('')
  }

  constructor(
    private readonly store: WebProcedureVendorFeatureStore,
    private router: Router,
    private route: ActivatedRoute,
    public formService: FormService,
  ) {
    
  }
 
    formIsReady() {
        this.store.loadProcedureVendorEffect(this.route.params.pipe(map((route) => route?.procedureVendorId)))
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
