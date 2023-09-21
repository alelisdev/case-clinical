
import { ActivatedRoute,Router } from '@angular/router'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormService } from '@case-clinical/web/ui/form'
import { WebBodyPartLeadFeatureStore } from '@case-clinical/web/body-part-lead/shared'
import { map } from 'rxjs'

@Component({templateUrl: './web-body-part-lead-edit.component.html',
  providers: [WebBodyPartLeadFeatureStore],
})
export class WebBodyPartLeadEditComponent  implements OnInit, OnDestroy  {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    leads: this.store.filterLeads(''),
bodyParts: this.store.filterBodyParts('')
  }

  constructor(
    private readonly store: WebBodyPartLeadFeatureStore,
    private router: Router,
    private route: ActivatedRoute,
    public formService: FormService,
  ) {
    
  }
 
    formIsReady() {
        this.store.loadBodyPartLeadEffect(this.route.params.pipe(map((route) => route?.bodyPartLeadId)))
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
