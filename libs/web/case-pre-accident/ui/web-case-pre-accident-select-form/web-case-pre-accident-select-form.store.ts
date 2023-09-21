
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateCasePreAccidentInput,
  UserUpdateCasePreAccidentInput,
  CasePreAccident,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface CasePreAccidentFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  casePreAccidents: CasePreAccident[]
}

@Injectable()
export class WebCasePreAccidentSelectFormStore extends ComponentStore<CasePreAccidentFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      casePreAccidents: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly casePreAccidents$ = this.select((s) => s.casePreAccidents)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.casePreAccidents$,
    (errors, loading, casePreAccidents) => ({
      errors,
      loading,
      casePreAccidents
    }),
    { debounce: true },
  )

  addNewCasePreAccident = this.updater((state, casePreAccident: CasePreAccident) => ({ casePreAccidents: [...state.casePreAccidents, casePreAccident] }))

  updateCasePreAccident = this.updater((state, casePreAccident: CasePreAccident) => {
    return {
      ...state,
      casePreAccidents: state.casePreAccidents.map((el) => {
        if (el.id === casePreAccident.id) {
          return casePreAccident
        } else {
          return el
        }
      }),
    }
  })

  readonly createCasePreAccidentEffect = this.effect<{ input: UserCreateCasePreAccidentInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateCasePreAccident({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewCasePreAccident(res.data.created)
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

  readonly updateCasePreAccidentEffect = this.effect<{ input: UserUpdateCasePreAccidentInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateCasePreAccident({ casePreAccidentId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateCasePreAccident(res.data.updated)
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

  loadCasePreAccidentsEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userCasePreAccidents({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                casePreAccidents: data.data.items,
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

