
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateImplantInput,
  UserUpdateImplantInput,
  Implant,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface ImplantFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  implants: Implant[]
}

@Injectable()
export class WebImplantSelectFormStore extends ComponentStore<ImplantFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      implants: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly implants$ = this.select((s) => s.implants)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.implants$,
    (errors, loading, implants) => ({
      errors,
      loading,
      implants
    }),
    { debounce: true },
  )

  addNewImplant = this.updater((state, implant: Implant) => ({ implants: [...state.implants, implant] }))

  updateImplant = this.updater((state, implant: Implant) => {
    return {
      ...state,
      implants: state.implants.map((el) => {
        if (el.id === implant.id) {
          return implant
        } else {
          return el
        }
      }),
    }
  })

  readonly createImplantEffect = this.effect<{ input: UserCreateImplantInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateImplant({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewImplant(res.data.created)
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

  readonly updateImplantEffect = this.effect<{ input: UserUpdateImplantInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateImplant({ implantId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateImplant(res.data.updated)
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

  loadImplantsEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userImplants({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                implants: data.data.items,
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

