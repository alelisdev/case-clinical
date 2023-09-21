
import { ActivatedRoute,Router } from '@angular/router'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormService } from '@case-clinical/web/ui/form'
import { WebCasePreInjuryFeatureStore } from '@case-clinical/web/case-pre-injury/shared'
import { map } from 'rxjs'

@Component({templateUrl: './web-case-pre-injury-edit.component.html',
  providers: [WebCasePreInjuryFeatureStore],
})
export class WebCasePreInjuryEditComponent  implements OnInit, OnDestroy  {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    legalCases: this.store.filterLegalCases('')
  }

  constructor(
    private readonly store: WebCasePreInjuryFeatureStore,
    private router: Router,
    private route: ActivatedRoute,
    public formService: FormService,
  ) {
    
  }
 
    formIsReady() {
        this.store.loadCasePreInjuryEffect(this.route.params.pipe(map((route) => route?.casePreInjuryId)))
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
