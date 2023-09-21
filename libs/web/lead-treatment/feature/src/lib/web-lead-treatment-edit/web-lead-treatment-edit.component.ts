
import { ActivatedRoute,Router } from '@angular/router'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormService } from '@case-clinical/web/ui/form'
import { WebLeadTreatmentFeatureStore } from '@case-clinical/web/lead-treatment/shared'
import { map } from 'rxjs'

@Component({templateUrl: './web-lead-treatment-edit.component.html',
  providers: [WebLeadTreatmentFeatureStore],
})
export class WebLeadTreatmentEditComponent  implements OnInit, OnDestroy  {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    leads: this.store.filterLeads(''),
treatments: this.store.filterTreatments('')
  }

  constructor(
    private readonly store: WebLeadTreatmentFeatureStore,
    private router: Router,
    private route: ActivatedRoute,
    public formService: FormService,
  ) {
    
  }
 
    formIsReady() {
        this.store.loadLeadTreatmentEffect(this.route.params.pipe(map((route) => route?.leadTreatmentId)))
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
