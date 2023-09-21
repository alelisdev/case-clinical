
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreatePortfolioInput,
  UserUpdatePortfolioInput,
  Portfolio,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface PortfolioFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  portfolios: Portfolio[]
}

@Injectable()
export class WebPortfolioSelectFormStore extends ComponentStore<PortfolioFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      portfolios: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly portfolios$ = this.select((s) => s.portfolios)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.portfolios$,
    (errors, loading, portfolios) => ({
      errors,
      loading,
      portfolios
    }),
    { debounce: true },
  )

  addNewPortfolio = this.updater((state, portfolio: Portfolio) => ({ portfolios: [...state.portfolios, portfolio] }))

  updatePortfolio = this.updater((state, portfolio: Portfolio) => {
    return {
      ...state,
      portfolios: state.portfolios.map((el) => {
        if (el.id === portfolio.id) {
          return portfolio
        } else {
          return el
        }
      }),
    }
  })

  readonly createPortfolioEffect = this.effect<{ input: UserCreatePortfolioInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreatePortfolio({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewPortfolio(res.data.created)
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

  readonly updatePortfolioEffect = this.effect<{ input: UserUpdatePortfolioInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdatePortfolio({ portfolioId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updatePortfolio(res.data.updated)
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

  loadPortfoliosEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userPortfolios({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                portfolios: data.data.items,
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

