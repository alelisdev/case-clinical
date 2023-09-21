
import { ActivatedRoute,Router } from '@angular/router'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormService } from '@case-clinical/web/ui/form'
import { WebJournalEntryTemplateFeatureStore } from '@case-clinical/web/journal-entry-template/shared'
import { map } from 'rxjs'

@Component({templateUrl: './web-journal-entry-template-edit.component.html',
  providers: [WebJournalEntryTemplateFeatureStore],
})
export class WebJournalEntryTemplateEditComponent  implements OnInit, OnDestroy  {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    caseAccounts: this.store.filterCaseAccounts('')
  }

  constructor(
    private readonly store: WebJournalEntryTemplateFeatureStore,
    private router: Router,
    private route: ActivatedRoute,
    public formService: FormService,
  ) {
    
  }
 
    formIsReady() {
        this.store.loadJournalEntryTemplateEffect(this.route.params.pipe(map((route) => route?.journalEntryTemplateId)))
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
