
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateSpecialtyInput,
  UserUpdateSpecialtyInput,
  Specialty,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface SpecialtyFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  specialties: Specialty[]
}

@Injectable()
export class WebSpecialtySelectFormStore extends ComponentStore<SpecialtyFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      specialties: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly specialties$ = this.select((s) => s.specialties)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.specialties$,
    (errors, loading, specialties) => ({
      errors,
      loading,
      specialties
    }),
    { debounce: true },
  )

  addNewSpecialty = this.updater((state, specialty: Specialty) => ({ specialties: [...state.specialties, specialty] }))

  updateSpecialty = this.updater((state, specialty: Specialty) => {
    return {
      ...state,
      specialties: state.specialties.map((el) => {
        if (el.id === specialty.id) {
          return specialty
        } else {
          return el
        }
      }),
    }
  })

  readonly createSpecialtyEffect = this.effect<{ input: UserCreateSpecialtyInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateSpecialty({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewSpecialty(res.data.created)
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

  readonly updateSpecialtyEffect = this.effect<{ input: UserUpdateSpecialtyInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateSpecialty({ specialtyId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateSpecialty(res.data.updated)
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

  loadSpecialtiesEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userSpecialties({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                specialties: data.data.items,
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

