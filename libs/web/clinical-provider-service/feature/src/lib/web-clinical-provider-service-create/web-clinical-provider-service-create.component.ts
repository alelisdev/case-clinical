
import {ActivatedRoute,Router} from '@angular/router'
import {Component, OnDestroy, OnInit} from '@angular/core'
import {FormService} from '@case-clinical/web/ui/form'
import {WebClinicalProviderServiceFeatureStore} from '@case-clinical/web/clinical-provider-service/shared'

@Component({templateUrl: './web-clinical-provider-service-create.component.html',
  providers: [WebClinicalProviderServiceFeatureStore],
})
export class WebClinicalProviderServiceCreateComponent implements OnInit, OnDestroy {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    services: this.store.filterServices(''),
clinicalProviders: this.store.filterClinicalProviders('')
  }

  constructor(
    private readonly store: WebClinicalProviderServiceFeatureStore,
    private router: Router,
    private route: ActivatedRoute,
    public formService: FormService,
  ) {
  }

  ngOnInit(): void {
    this.subscriber = this.store.actionResult$.subscribe(({ done, item }) => {
      if(done) {
        this.router.navigate(['..', item?.id], { relativeTo: this.route })
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
