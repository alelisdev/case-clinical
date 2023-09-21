
import { ActivatedRoute,Router } from '@angular/router'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormService } from '@case-clinical/web/ui/form'
import { WebLeadActionFeatureStore } from '@case-clinical/web/lead-action/shared'
import { map } from 'rxjs'

@Component({templateUrl: './web-lead-action-edit.component.html',
  providers: [WebLeadActionFeatureStore],
})
export class WebLeadActionEditComponent  implements OnInit, OnDestroy  {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    leads: this.store.filterLeads('')
  }

  constructor(
    private readonly store: WebLeadActionFeatureStore,
    private router: Router,
    private route: ActivatedRoute,
    public formService: FormService,
  ) {
    
  }
 
    formIsReady() {
        this.store.loadLeadActionEffect(this.route.params.pipe(map((route) => route?.leadActionId)))
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
