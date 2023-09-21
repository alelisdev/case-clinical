
import {ActivatedRoute,Router} from '@angular/router'
import {Component, OnDestroy, OnInit} from '@angular/core'
import {FormService} from '@case-clinical/web/ui/form'
import {WebLeadFeatureStore} from '@case-clinical/web/lead/shared'

@Component({templateUrl: './web-lead-create.component.html',
  providers: [WebLeadFeatureStore],
})
export class WebLeadCreateComponent implements OnInit, OnDestroy {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    accidentTypes: this.store.filterAccidentTypes(''),
documents: this.store.filterDocuments(''),
leadStatuses: this.store.filterLeadStatuses(''),
leadSources: this.store.filterLeadSources(''),
users: this.store.filterUsers(''),
bodyParts: this.store.filterBodyParts('')
  }

  constructor(
    private readonly store: WebLeadFeatureStore,
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
