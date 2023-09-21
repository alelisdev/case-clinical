
import {ActivatedRoute,Router} from '@angular/router'
import {Component, OnDestroy, OnInit} from '@angular/core'
import {FormService} from '@case-clinical/web/ui/form'
import {WebRequiredFieldFeatureStore} from '@case-clinical/web/required-field/shared'

@Component({templateUrl: './web-required-field-create.component.html',
  providers: [WebRequiredFieldFeatureStore],
})
export class WebRequiredFieldCreateComponent implements OnInit, OnDestroy {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    accidentTypes: this.store.filterAccidentTypes(''),
medLevels: this.store.filterMedLevels('')
  }

  constructor(
    private readonly store: WebRequiredFieldFeatureStore,
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
