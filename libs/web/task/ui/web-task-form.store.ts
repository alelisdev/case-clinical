
import { Injectable } from '@angular/core'
import { WebCoreDataAccessService, Task, Appointment } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface TaskFormState {
  errors?: any
  loading?: boolean
  item?: Task,
 appointments?: Appointment[]
  searchTerm?: string
}

@Injectable()
export class WebTaskFormStore extends ComponentStore<TaskFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({ loading: false })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)
  readonly appointments$ = this.select((s) => s.appointments)
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 
this.appointments$,
    (errors, loading, item, appointments ) => ({
    errors,
    loading,
    item,
appointments
  }),
{debounce: true})



  readonly filterAppointments = (term) => 
        this.data.userAppointments({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let appointments = res.data.items;
              return appointments
            },
            (errors: any) =>
              this.patchState({
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        map(result => {
          return result.data.items;
        })
  )


}
