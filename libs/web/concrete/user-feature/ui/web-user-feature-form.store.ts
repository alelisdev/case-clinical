
import { Injectable } from '@angular/core'
import { WebCoreDataAccessService, UserFeature, UserCreateUserFeatureInput, Feature,User } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface UserFeatureFormState {
  errors?: any
  loading?: boolean
  item?: UserFeature,
 features?: Feature[],
 users?: User[]
  searchTerm?: string
}

@Injectable()
export class WebUserFeatureFormStore extends ComponentStore<UserFeatureFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({ loading: false })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)
  readonly features$ = this.select((s) => s.features || [])
  readonly users$ = this.select((s) => s.users || [])
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 
this.features$,this.users$,
    (errors, loading, item, features,users ) => ({
    errors,
    loading,
    item,
features,users
  }),
{debounce: true})



  readonly filterFeatures = (term) => 
        this.data.userSelectFeatures({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let features = res.data.items;
              this.patchState({features})
              return features
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



  readonly createUserFeatureEffect = this.effect<UserCreateUserFeatureInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
        this.data.userCreateUserFeature({ input }).pipe(
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


  readonly addFeature = this.updater((state, feature: Feature) => ({
    ...state, features: state.features.concat(feature)
  }))


  readonly addUser = this.updater((state, user: User) => ({
    ...state, users: state.users.concat(user)
  }))

}
