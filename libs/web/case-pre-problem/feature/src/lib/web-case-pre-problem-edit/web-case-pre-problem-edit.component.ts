
import { ActivatedRoute,Router } from '@angular/router'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormService } from '@case-clinical/web/ui/form'
import { WebCasePreProblemFeatureStore } from '@case-clinical/web/case-pre-problem/shared'
import { map } from 'rxjs'

@Component({templateUrl: './web-case-pre-problem-edit.component.html',
  providers: [WebCasePreProblemFeatureStore],
})
export class WebCasePreProblemEditComponent  implements OnInit, OnDestroy  {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    legalCases: this.store.filterLegalCases('')
  }

  constructor(
    private readonly store: WebCasePreProblemFeatureStore,
    private router: Router,
    private route: ActivatedRoute,
    public formService: FormService,
  ) {
    
  }
 
    formIsReady() {
        this.store.loadCasePreProblemEffect(this.route.params.pipe(map((route) => route?.casePreProblemId)))
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
