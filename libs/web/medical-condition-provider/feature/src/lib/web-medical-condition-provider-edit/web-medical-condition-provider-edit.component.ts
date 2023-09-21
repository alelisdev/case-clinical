
import { ActivatedRoute,Router } from '@angular/router'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormService } from '@case-clinical/web/ui/form'
import { WebMedicalConditionProviderFeatureStore } from '@case-clinical/web/medical-condition-provider/shared'
import { map } from 'rxjs'

@Component({templateUrl: './web-medical-condition-provider-edit.component.html',
  providers: [WebMedicalConditionProviderFeatureStore],
})
export class WebMedicalConditionProviderEditComponent  implements OnInit, OnDestroy  {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    clinicalProviders: this.store.filterClinicalProviders('')
  }

  constructor(
    private readonly store: WebMedicalConditionProviderFeatureStore,
    private router: Router,
    private route: ActivatedRoute,
    public formService: FormService,
  ) {
    
  }
 
    formIsReady() {
        this.store.loadMedicalConditionProviderEffect(this.route.params.pipe(map((route) => route?.medicalConditionProviderId)))
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
