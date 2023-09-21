
import { Injectable } from '@angular/core'
import { WebCoreDataAccessService, CasePreAccident, UserCreateCasePreAccidentInput, LegalCase } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface CasePreAccidentFormState {
  errors?: any
  loading?: boolean
  item?: CasePreAccident,
 legalCases?: LegalCase[]
  searchTerm?: string
}

@Injectable()
export class WebCasePreAccidentFormStore extends ComponentStore<CasePreAccidentFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({ loading: false })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)
  readonly legalCases$ = this.select((s) => s.legalCases || [])
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 
this.legalCases$,
    (errors, loading, item, legalCases ) => ({
    errors,
    loading,
    item,
legalCases
  }),
{debounce: true})



  readonly filterLegalCases = (term) => 
        this.data.userLegalCases({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let legalCases = res.data.items;
              this.patchState({legalCases})
              return legalCases
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



  readonly createCasePreAccidentEffect = this.effect<UserCreateCasePreAccidentInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
        this.data.userCreateCasePreAccident({ input }).pipe(
          tapResponse(
            (res) => {
              this.patchState({ item: res.data.created, errors: res.errors, loading: false })
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


  readonly addLegalCase = this.updater((state, legalCase: LegalCase) => ({
    ...state, legalCases: state.legalCases.concat(legalCase)
  }))

}
