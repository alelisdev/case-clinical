
import {ActivatedRoute,Router} from '@angular/router'
import {Component, OnDestroy, OnInit} from '@angular/core'
import {FormService} from '@case-clinical/web/ui/form'
import {WebImplantFeatureStore} from '@case-clinical/web/implant/shared'

@Component({templateUrl: './web-implant-create.component.html',
  providers: [WebImplantFeatureStore],
})
export class WebImplantCreateComponent implements OnInit, OnDestroy {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    implantCategories: this.store.filterImplantCategories(''),
contacts: this.store.filterContacts(''),
manufacturers: this.store.filterManufacturers('')
  }

  constructor(
    private readonly store: WebImplantFeatureStore,
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
