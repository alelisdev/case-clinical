import { AttorneyBaseComponent } from '../attorney-base.component'
import { Component } from '@angular/core'
import { TasksStore } from './tasks.component.store'

@Component({
  selector: 'case-clinical-tasks',
  providers: [TasksStore],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent extends AttorneyBaseComponent {
  pageName = 'Tasks'
  portalName = 'Attorney'
  subscriber: any

  selectedAttorneyId$ = this.store.selectedAttorneyId$

  constructor(public store: TasksStore) {
    super()
  }

  vm$ = this.store.vm$
  getFormData(data: any) {
    console.log(data)
    return {
      ...data,
      portalName: this.portalName,
      pageName: this.pageName,
      attorneys: this.store.attorneyOptions$,
    }
  }
}
