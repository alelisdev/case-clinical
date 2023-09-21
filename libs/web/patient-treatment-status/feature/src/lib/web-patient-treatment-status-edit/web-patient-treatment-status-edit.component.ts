
import { ActivatedRoute,Router } from '@angular/router'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormService } from '@case-clinical/web/ui/form'
import { WebPatientTreatmentStatusFeatureStore } from '@case-clinical/web/patient-treatment-status/shared'
import { map } from 'rxjs'

@Component({templateUrl: './web-patient-treatment-status-edit.component.html',
  providers: [WebPatientTreatmentStatusFeatureStore],
})
export class WebPatientTreatmentStatusEditComponent  implements OnInit, OnDestroy  {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    
  }

  constructor(
    private readonly store: WebPatientTreatmentStatusFeatureStore,
    private router: Router,
    private route: ActivatedRoute,
    public formService: FormService,
  ) {
    
  }
 
    formIsReady() {
        this.store.loadPatientTreatmentStatusEffect(this.route.params.pipe(map((route) => route?.patientTreatmentStatusId)))
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
