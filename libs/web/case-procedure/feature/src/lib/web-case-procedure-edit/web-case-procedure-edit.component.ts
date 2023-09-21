
import { ActivatedRoute,Router } from '@angular/router'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormService } from '@case-clinical/web/ui/form'
import { WebCaseProcedureFeatureStore } from '@case-clinical/web/case-procedure/shared'
import { map } from 'rxjs'

@Component({templateUrl: './web-case-procedure-edit.component.html',
  providers: [WebCaseProcedureFeatureStore],
})
export class WebCaseProcedureEditComponent  implements OnInit, OnDestroy  {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    legalCases: this.store.filterLegalCases(''),
appointments: this.store.filterAppointments(''),
locations: this.store.filterLocations('')
  }

  constructor(
    private readonly store: WebCaseProcedureFeatureStore,
    private router: Router,
    private route: ActivatedRoute,
    public formService: FormService,
  ) {
    
  }
 
    formIsReady() {
        this.store.loadCaseProcedureEffect(this.route.params.pipe(map((route) => route?.caseProcedureId)))
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
