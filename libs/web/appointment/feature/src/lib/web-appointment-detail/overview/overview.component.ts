import { Component,OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router';
import { WebAppointmentFeatureStore } from '@case-clinical/web/appointment/shared'
import { pluck } from 'rxjs';

@Component({
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <ui-formly-json-form
        formName="appointment_overview"
        [showSubmitButton]="false"
        [componentStore]="store"
        [model]="vm.item"
      ></ui-formly-json-form>
    </ng-container>
  `,
  providers: [WebAppointmentFeatureStore],
})
export class WebAppointmentOverviewComponent implements OnInit, OnDestroy {
  readonly vm$ = this.store.vm$
  private subscriber

  constructor(
    private readonly store: WebAppointmentFeatureStore,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.store.loadAppointmentEffect(this.route.params.pipe(pluck('appointmentId')))
    this.subscriber = this.store.actionResult$.subscribe(({ done, item }) => {
      if(done) {
        this.router.navigate(['../../../'], {relativeTo: this.route});
      }
    })
  }

  ngOnDestroy(): void {
    this.subscriber?.unsubscribe();
  }

  deleteItem(item) {
    if (confirm('Are you sure?')) {
      this.store.deleteAppointmentEffect()
    }
  }


  caseProcedureAdded($event){
    console.log('from the overview in Appointment, added: ',$event)
  }


  claimProcedureAdded($event){
    console.log('from the overview in Appointment, added: ',$event)
  }

}

