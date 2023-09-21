
import { ActivatedRoute,Router } from '@angular/router'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormService } from '@case-clinical/web/ui/form'
import { WebClinicalProviderTagFeatureStore } from '@case-clinical/web/clinical-provider-tag/shared'
import { map } from 'rxjs'

@Component({templateUrl: './web-clinical-provider-tag-edit.component.html',
  providers: [WebClinicalProviderTagFeatureStore],
})
export class WebClinicalProviderTagEditComponent  implements OnInit, OnDestroy  {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    clinicalProviders: this.store.filterClinicalProviders(''),
tags: this.store.filterTags('')
  }

  constructor(
    private readonly store: WebClinicalProviderTagFeatureStore,
    private router: Router,
    private route: ActivatedRoute,
    public formService: FormService,
  ) {
    
  }
 
    formIsReady() {
        this.store.loadClinicalProviderTagEffect(this.route.params.pipe(map((route) => route?.clinicalProviderTagId)))
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
