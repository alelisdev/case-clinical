
import { ActivatedRoute,Router } from '@angular/router'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormService } from '@case-clinical/web/ui/form'
import { WebContactEmailFeatureStore } from '@case-clinical/web/contact-email/shared'
import { map } from 'rxjs'

@Component({templateUrl: './web-contact-email-edit.component.html',
  providers: [WebContactEmailFeatureStore],
})
export class WebContactEmailEditComponent  implements OnInit, OnDestroy  {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    contacts: this.store.filterContacts('')
  }

  constructor(
    private readonly store: WebContactEmailFeatureStore,
    private router: Router,
    private route: ActivatedRoute,
    public formService: FormService,
  ) {
    
  }
 
    formIsReady() {
        this.store.loadContactEmailEffect(this.route.params.pipe(map((route) => route?.contactEmailId)))
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
