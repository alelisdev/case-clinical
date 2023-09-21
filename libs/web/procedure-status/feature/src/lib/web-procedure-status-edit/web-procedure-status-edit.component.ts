
import { ActivatedRoute,Router } from '@angular/router'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormService } from '@case-clinical/web/ui/form'
import { WebProcedureStatusFeatureStore } from '@case-clinical/web/procedure-status/shared'
import { map } from 'rxjs'

@Component({templateUrl: './web-procedure-status-edit.component.html',
  providers: [WebProcedureStatusFeatureStore],
})
export class WebProcedureStatusEditComponent  implements OnInit, OnDestroy  {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {

  }

  constructor(
    private readonly store: WebProcedureStatusFeatureStore,
    private router: Router,
    private route: ActivatedRoute,
    public formService: FormService,
  ) {

  }

    formIsReady() {
        this.store.loadProcedureStatusEffect(this.route.params.pipe(map((route) => route?.procedureStatusId)))
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
