
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateSurgicalPositionInput,
  UserUpdateSurgicalPositionInput,
  SurgicalPosition,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface SurgicalPositionFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  surgicalPositions: SurgicalPosition[]
}

@Injectable()
export class WebSurgicalPositionSelectFormStore extends ComponentStore<SurgicalPositionFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      surgicalPositions: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly surgicalPositions$ = this.select((s) => s.surgicalPositions)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.surgicalPositions$,
    (errors, loading, surgicalPositions) => ({
      errors,
      loading,
      surgicalPositions
    }),
    { debounce: true },
  )

  addNewSurgicalPosition = this.updater((state, surgicalPosition: SurgicalPosition) => ({ surgicalPositions: [...state.surgicalPositions, surgicalPosition] }))

  updateSurgicalPosition = this.updater((state, surgicalPosition: SurgicalPosition) => {
    return {
      ...state,
      surgicalPositions: state.surgicalPositions.map((el) => {
        if (el.id === surgicalPosition.id) {
          return surgicalPosition
        } else {
          return el
        }
      }),
    }
  })

  readonly createSurgicalPositionEffect = this.effect<{ input: UserCreateSurgicalPositionInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateSurgicalPosition({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewSurgicalPosition(res.data.created)
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

  readonly updateSurgicalPositionEffect = this.effect<{ input: UserUpdateSurgicalPositionInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateSurgicalPosition({ surgicalPositionId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateSurgicalPosition(res.data.updated)
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

  loadSurgicalPositionsEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userSurgicalPositions({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                surgicalPositions: data.data.items,
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

