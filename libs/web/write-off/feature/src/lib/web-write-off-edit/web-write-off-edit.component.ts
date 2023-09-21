
import { ActivatedRoute,Router } from '@angular/router'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormService } from '@case-clinical/web/ui/form'
import { WebWriteOffFeatureStore } from '@case-clinical/web/write-off/shared'
import { map } from 'rxjs'

@Component({templateUrl: './web-write-off-edit.component.html',
  providers: [WebWriteOffFeatureStore],
})
export class WebWriteOffEditComponent  implements OnInit, OnDestroy  {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    caseAccounts: this.store.filterCaseAccounts(''),
writeOffStatuses: this.store.filterWriteOffStatuses('')
  }

  constructor(
    private readonly store: WebWriteOffFeatureStore,
    private router: Router,
    private route: ActivatedRoute,
    public formService: FormService,
  ) {
    
  }
 
    formIsReady() {
        this.store.loadWriteOffEffect(this.route.params.pipe(map((route) => route?.writeOffId)))
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
