
import { ActivatedRoute,Router } from '@angular/router'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormService } from '@case-clinical/web/ui/form'
import { WebPatientStudyFeatureStore } from '@case-clinical/web/patient-study/shared'
import { map } from 'rxjs'

@Component({templateUrl: './web-patient-study-edit.component.html',
  providers: [WebPatientStudyFeatureStore],
})
export class WebPatientStudyEditComponent  implements OnInit, OnDestroy  {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    patients: this.store.filterPatients('')
  }

  constructor(
    private readonly store: WebPatientStudyFeatureStore,
    private router: Router,
    private route: ActivatedRoute,
    public formService: FormService,
  ) {
    
  }
 
    formIsReady() {
        this.store.loadPatientStudyEffect(this.route.params.pipe(map((route) => route?.patientStudyId)))
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
