
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserCreateJournalEntryInput, WebCoreDataAccessService, JournalEntry, CaseAccount } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { JournalEntryService } from '@case-clinical/web/journal-entry/shared'

export interface JournalEntryCreateState {
  errors?: any
  loading?: boolean
  item?: JournalEntry,
 caseAccounts?: CaseAccount[]
  searchTerm?: string
}

@Injectable()
export class WebJournalEntryCreateStore extends ComponentStore<JournalEntryCreateState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly journalEntryService: JournalEntryService
) {
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
        this.data.userSelectCaseAccounts({input: { name: term}}).pipe(
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



  readonly addCaseAccount = this.updater((state, caseAccount: CaseAccount) => ({
    ...state, caseAccounts: state.caseAccounts.concat(caseAccount)
  }))

    

  readonly createJournalEntryEffect = this.effect<UserCreateJournalEntryInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
         this.journalEntryService.createJournalEntry({...input}).pipe(
          tapResponse(
            (journalEntry: JournalEntry) => {
              this.patchState({ item: journalEntry, loading: false })
              return this.router.navigate(['..', journalEntry?.id], {relativeTo: this.route})
            },
            (errors: any) => {
              this.toast.error(errors.Message)
              this.formService.setErrors(errors.Data)
              this.patchState({
                loading: false,
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              })
            }
          ),
        ),
      ),
    ),
  )
}
