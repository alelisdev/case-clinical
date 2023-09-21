
import { ActivatedRoute,Router } from '@angular/router'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormService } from '@case-clinical/web/ui/form'
import { WebClinicalProviderSpecialtyFeatureStore } from '@case-clinical/web/clinical-provider-specialty/shared'
import { map } from 'rxjs'

@Component({templateUrl: './web-clinical-provider-specialty-edit.component.html',
  providers: [WebClinicalProviderSpecialtyFeatureStore],
})
export class WebClinicalProviderSpecialtyEditComponent  implements OnInit, OnDestroy  {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    clinicalProviders: this.store.filterClinicalProviders(''),
specialties: this.store.filterSpecialties('')
  }

  constructor(
    private readonly store: WebClinicalProviderSpecialtyFeatureStore,
    private router: Router,
    private route: ActivatedRoute,
    public formService: FormService,
  ) {
    
  }
 
    formIsReady() {
        this.store.loadClinicalProviderSpecialtyEffect(this.route.params.pipe(map((route) => route?.clinicalProviderSpecialtyId)))
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
