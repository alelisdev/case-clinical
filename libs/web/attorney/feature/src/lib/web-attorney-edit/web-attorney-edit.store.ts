
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserUpdateAttorneyInput, WebCoreDataAccessService, Attorney, Firm,AttorneyStatus,AttorneyType,User } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map, withLatestFrom } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { AttorneyService } from '@case-clinical/web/attorney/shared'

export interface AttorneyEditState {
  errors?: any
  loading?: boolean
  item?: Attorney,
 firms?: Firm[],
 attorneyStatuses?: AttorneyStatus[],
 attorneyTypes?: AttorneyType[],
 users?: User[]
  searchTerm?: string
}

@Injectable()
export class WebAttorneyEditStore extends ComponentStore<AttorneyEditState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly attorneyService: AttorneyService
) {
    super({ loading: false })
    
    this.loadAttorneyEffect(route.params.pipe(map((route) => route?.attorneyId)))
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)
  readonly firms$ = this.select((s) => s.firms || [])
  readonly attorneyStatuses$ = this.select((s) => s.attorneyStatuses || [])
  readonly attorneyTypes$ = this.select((s) => s.attorneyTypes || [])
  readonly users$ = this.select((s) => s.users || [])
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 
this.firms$,this.attorneyStatuses$,this.attorneyTypes$,this.users$,
    (errors, loading, item, firms,attorneyStatuses,attorneyTypes,users ) => ({
    errors,
    loading,
    item,
firms,attorneyStatuses,attorneyTypes,users
  }),
{debounce: true})



  readonly filterFirms = (term) => 
        this.data.userSelectFirms({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let firms = res.data.items;
              this.patchState({firms})
              return firms
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


  readonly filterAttorneyStatuses = (term) => 
        this.data.userSelectAttorneyStatuses({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let attorneyStatuses = res.data.items;
              this.patchState({attorneyStatuses})
              return attorneyStatuses
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


  readonly filterAttorneyTypes = (term) => 
        this.data.userSelectAttorneyTypes({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let attorneyTypes = res.data.items;
              this.patchState({attorneyTypes})
              return attorneyTypes
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


  readonly filterUsers = (term) => 
        this.data.userSelectUsers({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let users = res.data.items;
              this.patchState({users})
              return users
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



  readonly addFirm = this.updater((state, firm: Firm) => ({
    ...state, firms: state.firms.concat(firm)
  }))


  readonly addAttorneyStatus = this.updater((state, attorneyStatus: AttorneyStatus) => ({
    ...state, attorneyStatuses: state.attorneyStatuses.concat(attorneyStatus)
  }))


  readonly addAttorneyType = this.updater((state, attorneyType: AttorneyType) => ({
    ...state, attorneyTypes: state.attorneyTypes.concat(attorneyType)
  }))


  readonly addUser = this.updater((state, user: User) => ({
    ...state, users: state.users.concat(user)
  }))

  
  readonly loadAttorneyEffect = this.effect<string>((attorneyId$) =>
     attorneyId$.pipe(
      tap(() => this.setState({loading: true })),
      switchMap((attorneyId) =>
        this.data.userAttorney({attorneyId}).pipe(
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

  readonly updateAttorneyEffect = this.effect<UserUpdateAttorneyInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([input, item]) =>
         this.attorneyService.updateAttorney(input, item?.id).pipe(
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
