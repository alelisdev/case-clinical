
import { Injectable } from '@angular/core'
import { WebCoreDataAccessService, JournalEntry, UserCreateJournalEntryInput, CaseAccount } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface JournalEntryFormState {
  errors?: any
  loading?: boolean
  item?: JournalEntry,
 caseAccounts?: CaseAccount[]
  searchTerm?: string
}

@Injectable()
export class WebJournalEntryFormStore extends ComponentStore<JournalEntryFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({ loading: false })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)
  readonly caseAccounts$ = this.select((s) => s.caseAccounts || [])
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 
this.caseAccounts$,
    (errors, loading, item, caseAccounts ) => ({
    errors,
    loading,
    item,
caseAccounts
  }),
{debounce: true})



  readonly filterCaseAccounts = (term) => 
        this.data.userCaseAccounts({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let caseAccounts = res.data.items;
              this.patchState({caseAccounts})
              return caseAccounts
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



  readonly createJournalEntryEffect = this.effect<UserCreateJournalEntryInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
        this.data.userCreateJournalEntry({ input }).pipe(
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


  readonly addCaseAccount = this.updater((state, caseAccount: CaseAccount) => ({
    ...state, caseAccounts: state.caseAccounts.concat(caseAccount)
  }))

}
