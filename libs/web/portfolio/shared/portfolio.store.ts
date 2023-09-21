
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { PortfolioService } from './portfolio.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreatePortfolioInput, UserUpdatePortfolioInput, WebCoreDataAccessService, CorePaging, Portfolio,  } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface PortfolioFeatureState {
  errors?: any
  loading?: boolean
  item?: Portfolio
  done: boolean,
  formName?: string

  portfolios: Portfolio[]

  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebPortfolioFeatureStore extends ComponentStore<PortfolioFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly portfolioService: PortfolioService
) {
    super({ 
      loading: false,
      portfolios: [],
      done: false,
      searchQuery: '',
      formName: undefined,

      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('portfolioId')) {
      var portfolioId = this.route.snapshot.paramMap.get('portfolioId')
      this.setFormName('portfolio_edit')
    } else {
      this.setFormName('portfolio_create')
    }




  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly portfolios$ = this.select((s) => s.portfolios)


  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.portfolios$,

    (errors, loading, item, formName, portfolios,  ) => ({
    errors,
    loading,
    item,
    formName,
    portfolios,

            
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$,  this.searchQuery$, (paging, searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    
    total: paging.total
  }))

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
  }))







    

  readonly setItem = this.updater((state, item: Portfolio) => ({...state, item}))

  addNewPortfolio = this.updater((state, portfolio: Portfolio) => ({ ...state, portfolios: [...state.portfolios, portfolio] }))

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

  addPortfolios = this.updater((state, newPortfolios: any[]) => ({...state, portfolios: state.portfolios.concat(newPortfolios) }))
  updatePortfolios = this.updater((state, updatedPortfolios: any[]) => {
    return {
      ...state,
      portfolios: state.portfolios.map((portfolio) => {
        const updated = updatedPortfolios.find((el) => el.id === portfolio.id);
        return updated ? updated : portfolio;
      })
    }
  })

  readonly setSearchQuery = this.updater((state, searchQuery: string) => ({
    ...state,
    searchQuery
  }))

  validateImportData(excelData: any[]) {
    return this.vm$.pipe(
      switchMap((vm) => {
        return this.portfolioService.validatePortfolioExcelData(excelData);
      })
    )
  }


  readonly loadPortfolioEffect = this.effect<string>((portfolioId$) =>
    portfolioId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((portfolioId) =>
        this.data.userPortfolio({ portfolioId }).pipe(
          tapResponse(
            (res) => {
                    this.patchState({ 
                    item: res.data.item, 
                    errors: res.errors, 
                    loading: false 
                })
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



  readonly loadPortfoliosEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userPortfolios({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                portfolios: res.data.items,
                errors: res.errors,
                loading: false,
              }),
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

  readonly createPortfolioEffect = this.effect<UserCreatePortfolioInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.portfolioService.createPortfolio({...input }).pipe(
          tapResponse(
            (portfolio: Portfolio) => {
              this.addNewPortfolio(portfolio)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: portfolio, loading: false, done: true }), 300);
              setTimeout(() => this.patchState({ done: false, item: null }), 600);
            },
            (errors: any) => {
              if (errors.graphQLErrors) {
                this.toast.error(errors.graphQLErrors[0].message, { duration: 3000 })
                this.patchState({
                  loading: false,
                  errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
                })
              } else {
                this.toast.error(errors.Message)
                this.formService.setErrors(errors.Data)
              }
            }
          ),
        ),
      ),
    ),
  )

    readonly updatePortfolioEffect = this.effect<UserUpdatePortfolioInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.portfolioService.updatePortfolio(input, input.id).pipe(
              tapResponse(
                (portfolio) => {
                  this.updatePortfolio(portfolio)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: portfolio, loading: false, done: true }), 300);
                  setTimeout(() => this.patchState({done: false, item: null }), 600);
                },
                (errors: any) => {
                  if (errors.graphQLErrors) {
                      this.toast.error(errors.graphQLErrors[0].message, { duration: 3000 })
                      this.patchState({
                        loading: false,
                        errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
                      })
                  } else {
                    this.toast.error(errors.Message)
                    this.formService.setErrors(errors.Data)
                  }
                }
              ),
            ),
          ),
        ),
      )
  
    readonly deletePortfolioEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, portfolio]) => {
          return this.data.userDeletePortfolio({portfolioId: portfolio.id})
            .pipe(
              tapResponse(
                (res) => {
                  this.toast.success("Deleted successfully!", { duration: 3000 })
                  setTimeout(() => this.patchState({ item: res.data.deleted, loading: false, done: true }), 300);
                  setTimeout(() => this.patchState({ done: false, item: null }), 600);
                },
                (errors: any) => {
                  if (errors.graphQLErrors) {
                    this.toast.error(errors.graphQLErrors[0].message, { duration: 3000 })
                    this.patchState({
                      loading: false,
                      errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
                    })
                  } else {
                    this.toast.error(errors.Message)
                    this.formService.setErrors(errors.Data)
                  }
                }),
            )}
        ),
      ),
  )

  readonly importExcelEffect = this.effect<UserUpdatePortfolioInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.portfolioService.importPortfolios(data).pipe(
        catchError(error => {
          this.toast.error(error.Message ?? 'Failed to save', { duration: 3000 })
          return EMPTY;
        }),
        tap(
          (updateResult) => {
            const created = JSON.parse(updateResult.created);
            const updated = JSON.parse(updateResult.updated);
            const failed = JSON.parse(updateResult.failed);
            const total = created.length + updated.length + failed.length;

            this.addPortfolios(created);
            this.updatePortfolios(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
