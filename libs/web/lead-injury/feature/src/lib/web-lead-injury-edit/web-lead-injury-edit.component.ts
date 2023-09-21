
import { ActivatedRoute,Router } from '@angular/router'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormService } from '@case-clinical/web/ui/form'
import { WebLeadInjuryFeatureStore } from '@case-clinical/web/lead-injury/shared'
import { map } from 'rxjs'

@Component({templateUrl: './web-lead-injury-edit.component.html',
  providers: [WebLeadInjuryFeatureStore],
})
export class WebLeadInjuryEditComponent  implements OnInit, OnDestroy  {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    leads: this.store.filterLeads(''),
severities: this.store.filterSeverities('')
  }

  constructor(
    private readonly store: WebLeadInjuryFeatureStore,
    private router: Router,
    private route: ActivatedRoute,
    public formService: FormService,
  ) {
    
  }
 
    formIsReady() {
        this.store.loadLeadInjuryEffect(this.route.params.pipe(map((route) => route?.leadInjuryId)))
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
