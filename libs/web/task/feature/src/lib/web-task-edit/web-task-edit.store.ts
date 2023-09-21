
import { Injectable } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { UserUpdateTaskInput, WebCoreDataAccessService, Task, Appointment } from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, withLatestFrom, pluck, map } from 'rxjs/operators'

export interface TaskUpdateState {
  errors ?: any
  loading?: boolean
  item?: Task,
 appointments?: Appointment[]
  searchTerm?: string
}

@Injectable()
export class WebTaskEditStore extends ComponentStore<TaskUpdateState> {
  constructor(private readonly data: WebCoreDataAccessService, private readonly router: Router, private readonly route: ActivatedRoute) {
    super({ loading: false })

    this.loadTaskEffect(route.params.pipe(pluck('taskId')))
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


    

readonly loadTaskEffect = this.effect<string>((taskId$) =>
    taskId$.pipe(
      tap(() => this.setState({ loading: true })),
      switchMap((taskId) =>
        this.data.userTask({ taskId }).pipe(
          tapResponse(
            (res) => this.patchState({ item: res.data.item, errors: res.errors, loading: false }),
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

  readonly updateTaskEffect = this.effect<UserUpdateTaskInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([input, item]) =>
        this.data.userUpdateTask({ input, taskId: item.id }).pipe(
          tapResponse(
            (res) => {
              this.patchState({ item: res.data.updated, errors: res.errors, loading: false })
              return this.router.navigate(['..'],{relativeTo: this.route})
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

