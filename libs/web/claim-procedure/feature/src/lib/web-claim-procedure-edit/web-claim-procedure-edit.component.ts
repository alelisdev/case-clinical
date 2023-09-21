
import { ActivatedRoute,Router } from '@angular/router'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormService } from '@case-clinical/web/ui/form'
import { WebClaimProcedureFeatureStore } from '@case-clinical/web/claim-procedure/shared'
import { map } from 'rxjs'

@Component({templateUrl: './web-claim-procedure-edit.component.html',
  providers: [WebClaimProcedureFeatureStore],
})
export class WebClaimProcedureEditComponent  implements OnInit, OnDestroy  {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    placeOfServices: this.store.filterPlaceOfServices(''),
claimStatuses: this.store.filterClaimStatuses(''),
claims: this.store.filterClaims(''),
appointments: this.store.filterAppointments(''),
procedures: this.store.filterProcedures('')
  }

  constructor(
    private readonly store: WebClaimProcedureFeatureStore,
    private router: Router,
    private route: ActivatedRoute,
    public formService: FormService,
  ) {
    
  }
 
    formIsReady() {
        this.store.loadClaimProcedureEffect(this.route.params.pipe(map((route) => route?.claimProcedureId)))
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
