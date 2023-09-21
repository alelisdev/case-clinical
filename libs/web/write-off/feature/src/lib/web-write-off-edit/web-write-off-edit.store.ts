
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserUpdateWriteOffInput, WebCoreDataAccessService, WriteOff, CaseAccount,WriteOffStatus } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map, withLatestFrom } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { WriteOffService } from '@case-clinical/web/write-off/shared'

export interface WriteOffEditState {
  errors?: any
  loading?: boolean
  item?: WriteOff,
 caseAccounts?: CaseAccount[],
 writeOffStatuses?: WriteOffStatus[]
  searchTerm?: string
}

@Injectable()
export class WebWriteOffEditStore extends ComponentStore<WriteOffEditState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly writeOffService: WriteOffService
) {
    super({ loading: false })
    
    this.loadWriteOffEffect(route.params.pipe(map((route) => route?.writeOffId)))
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

  
  readonly loadWriteOffEffect = this.effect<string>((writeOffId$) =>
     writeOffId$.pipe(
      tap(() => this.setState({loading: true })),
      switchMap((writeOffId) =>
        this.data.userWriteOff({writeOffId}).pipe(
          tapResponse(
            (res) => {
              this.patchState({ item: res.data.item, errors: res.errors, loading: false })
            },
            (errors: any) =>
              this.patchState({loading: false,
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        ),
      ),
    ),
  )

  readonly updateWriteOffEffect = this.effect<UserUpdateWriteOffInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([input, item]) =>
         this.writeOffService.updateWriteOff(input, item?.id).pipe(
          tapResponse(
            (response: any) => {
              this.toast.success('Changed Successfully')
              this.router.navigate(['..'], { relativeTo: this.route })
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
