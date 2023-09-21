
import { ActivatedRoute,Router } from '@angular/router'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormService } from '@case-clinical/web/ui/form'
import { WebFirmFeatureStore } from '@case-clinical/web/firm/shared'
import { map } from 'rxjs'

@Component({templateUrl: './web-firm-edit.component.html',
  providers: [WebFirmFeatureStore],
})
export class WebFirmEditComponent  implements OnInit, OnDestroy  {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    firmStatuses: this.store.filterFirmStatuses(''),
documents: this.store.filterDocuments('')
  }

  constructor(
    private readonly store: WebFirmFeatureStore,
    private router: Router,
    private route: ActivatedRoute,
    public formService: FormService,
  ) {
    
  }
 
    formIsReady() {
        this.store.loadFirmEffect(this.route.params.pipe(map((route) => route?.firmId)))
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
