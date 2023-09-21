
import { Injectable } from '@angular/core'
import { WebCoreDataAccessService, Attorney, UserCreateAttorneyInput, Firm,AttorneyStatus,AttorneyType,User } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface AttorneyFormState {
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
export class WebAttorneyFormStore extends ComponentStore<AttorneyFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({ loading: false })
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
        this.data.userFirms({input: { name: term}}).pipe(
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
        this.data.userAttorneyStatuses({input: { name: term}}).pipe(
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
        this.data.userAttorneyTypes({input: { name: term}}).pipe(
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
        this.data.userUsers({input: { name: term}}).pipe(
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



  readonly createAttorneyEffect = this.effect<UserCreateAttorneyInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
        this.data.userCreateAttorney({ input }).pipe(
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

}
