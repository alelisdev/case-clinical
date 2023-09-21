
import {ActivatedRoute,Router} from '@angular/router'
import {Component, OnDestroy, OnInit} from '@angular/core'
import {FormService} from '@case-clinical/web/ui/form'
import {WebCasePreAccidentFeatureStore} from '@case-clinical/web/case-pre-accident/shared'

@Component({templateUrl: './web-case-pre-accident-create.component.html',
  providers: [WebCasePreAccidentFeatureStore],
})
export class WebCasePreAccidentCreateComponent implements OnInit, OnDestroy {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    legalCases: this.store.filterLegalCases('')
  }

  constructor(
    private readonly store: WebCasePreAccidentFeatureStore,
    private router: Router,
    private route: ActivatedRoute,
    public formService: FormService
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
