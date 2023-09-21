
import { ActivatedRoute,Router } from '@angular/router'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormService } from '@case-clinical/web/ui/form'
import { WebUserFeatureStore } from '@case-clinical/web/user/shared'
import { map } from 'rxjs'

@Component({templateUrl: './web-user-edit.component.html',
  providers: [WebUserFeatureStore],
})
export class WebUserEditComponent  implements OnInit, OnDestroy  {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    patients: this.store.filterPatients(''),
clinicalProviders: this.store.filterClinicalProviders(''),
attorneys: this.store.filterAttorneys('')
  }

  constructor(
    private readonly store: WebUserFeatureStore,
    private router: Router,
    private route: ActivatedRoute,
    public formService: FormService,
  ) {
    this.store.loadUserEffect(route.params.pipe(map((route) => route?.userId)))
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
