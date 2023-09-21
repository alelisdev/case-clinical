
import {ActivatedRoute,Router} from '@angular/router'
import {Component, OnDestroy, OnInit} from '@angular/core'
import {FormService} from '@case-clinical/web/ui/form'
import {WebContactPhoneNumberFeatureStore} from '@case-clinical/web/contact-phone-number/shared'

@Component({templateUrl: './web-contact-phone-number-create.component.html',
  providers: [WebContactPhoneNumberFeatureStore],
})
export class WebContactPhoneNumberCreateComponent implements OnInit, OnDestroy {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    countries: this.store.filterCountries(''),
contacts: this.store.filterContacts('')
  }

  constructor(
    private readonly store: WebContactPhoneNumberFeatureStore,
    private router: Router,
    private route: ActivatedRoute,
    public formService: FormService,
  ) {
  }

  ngOnInit(): void {
    this.subscriber = this.store.actionResult$.subscribe(({ done, item }) => {
      if(done) {
        this.router.navigate(['..', item?.id], { relativeTo: this.route })
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
