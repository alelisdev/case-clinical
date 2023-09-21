
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserCreateWriteOffInput, WebCoreDataAccessService, WriteOff, CaseAccount,WriteOffStatus } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { WriteOffService } from '@case-clinical/web/write-off/shared'

export interface WriteOffCreateState {
  errors?: any
  loading?: boolean
  item?: WriteOff,
 caseAccounts?: CaseAccount[],
 writeOffStatuses?: WriteOffStatus[]
  searchTerm?: string
}

@Injectable()
export class WebWriteOffCreateStore extends ComponentStore<WriteOffCreateState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly writeOffService: WriteOffService
) {
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


  readonly filterWriteOffStatuses = (term) => 
        this.data.userSelectWriteOffStatuses({input: { name: term}}).pipe(
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



  readonly addCaseAccount = this.updater((state, caseAccount: CaseAccount) => ({
    ...state, caseAccounts: state.caseAccounts.concat(caseAccount)
  }))


  readonly addWriteOffStatus = this.updater((state, writeOffStatus: WriteOffStatus) => ({
    ...state, writeOffStatuses: state.writeOffStatuses.concat(writeOffStatus)
  }))

    

  readonly createWriteOffEffect = this.effect<UserCreateWriteOffInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
         this.writeOffService.createWriteOff({...input}).pipe(
          tapResponse(
            (writeOff: WriteOff) => {
              this.patchState({ item: writeOff, loading: false })
              return this.router.navigate(['..', writeOff?.id], {relativeTo: this.route})
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
