
import { Injectable } from '@angular/core'
import { WebCoreDataAccessService, WriteOff, UserCreateWriteOffInput, CaseAccount,WriteOffStatus } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface WriteOffFormState {
  errors?: any
  loading?: boolean
  item?: WriteOff,
 caseAccounts?: CaseAccount[],
 writeOffStatuses?: WriteOffStatus[]
  searchTerm?: string
}

@Injectable()
export class WebWriteOffFormStore extends ComponentStore<WriteOffFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({ loading: false })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)
  readonly caseAccounts$ = this.select((s) => s.caseAccounts || [])
  readonly writeOffStatuses$ = this.select((s) => s.writeOffStatuses || [])
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 
this.caseAccounts$,this.writeOffStatuses$,
    (errors, loading, item, caseAccounts,writeOffStatuses ) => ({
    errors,
    loading,
    item,
caseAccounts,writeOffStatuses
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


  readonly filterWriteOffStatuses = (term) => 
        this.data.userWriteOffStatuses({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let writeOffStatuses = res.data.items;
              this.patchState({writeOffStatuses})
              return writeOffStatuses
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



  readonly createWriteOffEffect = this.effect<UserCreateWriteOffInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
        this.data.userCreateWriteOff({ input }).pipe(
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


  readonly addWriteOffStatus = this.updater((state, writeOffStatus: WriteOffStatus) => ({
    ...state, writeOffStatuses: state.writeOffStatuses.concat(writeOffStatus)
  }))

}
