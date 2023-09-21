
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateMedLevelInput,
  UserUpdateMedLevelInput,
  MedLevel,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface MedLevelFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  medLevels: MedLevel[]
}

@Injectable()
export class WebMedLevelSelectFormStore extends ComponentStore<MedLevelFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      medLevels: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly medLevels$ = this.select((s) => s.medLevels)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.medLevels$,
    (errors, loading, medLevels) => ({
      errors,
      loading,
      medLevels
    }),
    { debounce: true },
  )

  addNewMedLevel = this.updater((state, medLevel: MedLevel) => ({ medLevels: [...state.medLevels, medLevel] }))

  updateMedLevel = this.updater((state, medLevel: MedLevel) => {
    return {
      ...state,
      medLevels: state.medLevels.map((el) => {
        if (el.id === medLevel.id) {
          return medLevel
        } else {
          return el
        }
      }),
    }
  })

  readonly createMedLevelEffect = this.effect<{ input: UserCreateMedLevelInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateMedLevel({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewMedLevel(res.data.created)
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

  readonly updateMedLevelEffect = this.effect<{ input: UserUpdateMedLevelInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateMedLevel({ medLevelId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateMedLevel(res.data.updated)
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

  loadMedLevelsEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userMedLevels({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                medLevels: data.data.items,
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

