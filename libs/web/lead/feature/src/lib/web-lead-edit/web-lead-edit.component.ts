import { ActivatedRoute, Router } from '@angular/router'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormService } from '@case-clinical/web/ui/form'
import { WebLeadFeatureStore } from '@case-clinical/web/lead/shared'
import { map } from 'rxjs'

@Component({ templateUrl: './web-lead-edit.component.html', providers: [WebLeadFeatureStore] })
export class WebLeadEditComponent implements OnInit, OnDestroy {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    accidentTypes: this.store.filterAccidentTypes(''),
    documents: this.store.filterDocuments(''),
    leadStatuses: this.store.filterLeadStatuses(''),
    leadSources: this.store.filterLeadSources(''),
    users: this.store.filterUsers(''),
    bodyParts: this.store.filterBodyParts(''),

  }

  constructor(
    private readonly store: WebLeadFeatureStore,
    private router: Router,
    private route: ActivatedRoute,
    public formService: FormService,
  ) {}

  formIsReady() {
    this.store.loadLeadEffect(this.route.params.pipe(map((route) => route?.leadId)))
  }

  ngOnInit(): void {
    this.subscriber = this.store.actionResult$.subscribe(({ done, item }) => {
      if (done) {
        this.router.navigate(['..'], { relativeTo: this.route })
      }
    })
  }

  ngOnDestroy(): void {
    this.subscriber?.unsubscribe()
  }

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }
}
