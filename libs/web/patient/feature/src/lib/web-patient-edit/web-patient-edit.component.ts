
import { ActivatedRoute,Router } from '@angular/router'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormService } from '@case-clinical/web/ui/form'
import { WebPatientFeatureStore } from '@case-clinical/web/patient/shared'
import { map } from 'rxjs'

@Component({templateUrl: './web-patient-edit.component.html',
  providers: [WebPatientFeatureStore],
})
export class WebPatientEditComponent  implements OnInit, OnDestroy  {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    ethnicities: this.store.filterEthnicities(''),
genders: this.store.filterGenders(''),
languages: this.store.filterLanguages('')
  }

  constructor(
    private readonly store: WebPatientFeatureStore,
    private router: Router,
    private route: ActivatedRoute,
    public formService: FormService,
  ) {
    
  }
 
    formIsReady() {
        this.store.loadPatientEffect(this.route.params.pipe(map((route) => route?.patientId)))
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
