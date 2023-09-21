
import { ActivatedRoute,Router } from '@angular/router'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormService } from '@case-clinical/web/ui/form'
import { WebCasePreAccidentFeatureStore } from '@case-clinical/web/case-pre-accident/shared'
import { map } from 'rxjs'

@Component({templateUrl: './web-case-pre-accident-edit.component.html',
  providers: [WebCasePreAccidentFeatureStore],
})
export class WebCasePreAccidentEditComponent  implements OnInit, OnDestroy  {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    legalCases: this.store.filterLegalCases('')
  }

  constructor(
    private readonly store: WebCasePreAccidentFeatureStore,
    private router: Router,
    private route: ActivatedRoute,
    public formService: FormService,
  ) {
    
  }
 
    formIsReady() {
        this.store.loadCasePreAccidentEffect(this.route.params.pipe(map((route) => route?.casePreAccidentId)))
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
