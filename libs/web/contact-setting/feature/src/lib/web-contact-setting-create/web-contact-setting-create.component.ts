
import {ActivatedRoute,Router} from '@angular/router'
import {Component, OnDestroy, OnInit} from '@angular/core'
import {FormService} from '@case-clinical/web/ui/form'
import {WebContactSettingFeatureStore} from '@case-clinical/web/contact-setting/shared'

@Component({templateUrl: './web-contact-setting-create.component.html',
  providers: [WebContactSettingFeatureStore],
})
export class WebContactSettingCreateComponent implements OnInit, OnDestroy {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    contacts: this.store.filterContacts(''),
integrations: this.store.filterIntegrations('')
  }

  constructor(
    private readonly store: WebContactSettingFeatureStore,
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
