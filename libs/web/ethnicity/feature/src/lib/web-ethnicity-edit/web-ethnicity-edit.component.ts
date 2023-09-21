import { ActivatedRoute,Router } from '@angular/router'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormService } from '@case-clinical/web/ui/form'
import { WebEthnicityFeatureStore } from '@case-clinical/web/ethnicity/shared'
import { map } from 'rxjs'

@Component({templateUrl: './web-ethnicity-edit.component.html',
  providers: [WebEthnicityFeatureStore],
})
export class WebEthnicityEditComponent  implements OnInit, OnDestroy  {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {

  }

  constructor(
    private readonly store: WebEthnicityFeatureStore,
    private router: Router,
    private route: ActivatedRoute,
    public formService: FormService,
  ) {

  }

    formIsReady() {
        this.store.loadEthnicityEffect(this.route.params.pipe(map((route) => route?.ethnicityId)))
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
