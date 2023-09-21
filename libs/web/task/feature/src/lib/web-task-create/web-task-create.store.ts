
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserCreateTaskInput, WebCoreDataAccessService, Task, Appointment } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface TaskCreateState {
  errors?: any
  loading?: boolean
  item?: Task,
 appointments?: Appointment[]
  searchTerm?: string
}

@Injectable()
export class WebTaskCreateStore extends ComponentStore<TaskCreateState> {
  constructor(private readonly data: WebCoreDataAccessService, private readonly router: Router, private readonly route: ActivatedRoute ) {
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


    

  readonly createTaskEffect = this.effect<UserCreateTaskInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
        this.data.userCreateTask({ input }).pipe(
          tapResponse(
            (res) => {
              this.patchState({ item: res.data.created, errors: res.errors, loading: false })
              return this.router.navigate(['..', res.data?.created?.id], {relativeTo: this.route})
            },
            (errors: any) =>
              this.patchState({
                loading: false,
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        ),
      ),
    ),
  )
}
