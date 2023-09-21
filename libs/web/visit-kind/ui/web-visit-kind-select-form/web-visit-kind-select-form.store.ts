
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateVisitKindInput,
  UserUpdateVisitKindInput,
  VisitKind,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface VisitKindFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  visitKinds: VisitKind[]
}

@Injectable()
export class WebVisitKindSelectFormStore extends ComponentStore<VisitKindFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      visitKinds: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly visitKinds$ = this.select((s) => s.visitKinds)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.visitKinds$,
    (errors, loading, visitKinds) => ({
      errors,
      loading,
      visitKinds
    }),
    { debounce: true },
  )

  addNewVisitKind = this.updater((state, visitKind: VisitKind) => ({ visitKinds: [...state.visitKinds, visitKind] }))

  updateVisitKind = this.updater((state, visitKind: VisitKind) => {
    return {
      ...state,
      visitKinds: state.visitKinds.map((el) => {
        if (el.id === visitKind.id) {
          return visitKind
        } else {
          return el
        }
      }),
    }
  })

  readonly createVisitKindEffect = this.effect<{ input: UserCreateVisitKindInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateVisitKind({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewVisitKind(res.data.created)
                this.patchState({
                  errors: res.errors,
                  loading: false,
                })
                data.resultEmitter.emit(res.data.created)
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

  readonly updateVisitKindEffect = this.effect<{ input: UserUpdateVisitKindInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateVisitKind({ visitKindId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateVisitKind(res.data.updated)
                this.patchState({ errors: res.errors, loading: false })
                data.resultEmitter.emit(res.data.updated)
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

  loadVisitKindsEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userVisitKinds({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                visitKinds: data.data.items,
              })
            },
            (error) => {
              this.patchState({
                loading: false,
              })
            },
          ),
        ),
      ),
    ),
  )
}

