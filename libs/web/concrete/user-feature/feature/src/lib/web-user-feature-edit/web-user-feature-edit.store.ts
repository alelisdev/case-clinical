
import { Injectable } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { UserUpdateUserFeatureInput, WebCoreDataAccessService, UserFeature, Feature,User } from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, withLatestFrom, pluck, map } from 'rxjs/operators'

export interface UserFeatureUpdateState {
  errors ?: any
  loading?: boolean
  item?: UserFeature,
 features?: Feature[],
 users?: User[]
  searchTerm?: string
}

@Injectable()
export class WebUserFeatureEditStore extends ComponentStore<UserFeatureUpdateState> {
  constructor(private readonly data: WebCoreDataAccessService, private readonly router: Router, private readonly route: ActivatedRoute) {
    super({ loading: false })

    this.loadUserFeatureEffect(route.params.pipe(pluck('userFeatureId')))
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
        this.data.userFeatures({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let features = res.data.items;
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


    

  readonly addFeature = this.updater((state, feature: Feature) => ({
    ...state, features: state.features.concat(feature)
  }))


  readonly addUser = this.updater((state, user: User) => ({
    ...state, users: state.users.concat(user)
  }))


readonly loadUserFeatureEffect = this.effect<string>((userFeatureId$) =>
    userFeatureId$.pipe(
      tap(() => this.setState({ loading: true })),
      switchMap((userFeatureId) =>
        this.data.userUserFeature({ userFeatureId }).pipe(
          tapResponse(
            (res) => this.patchState({ item: res.data.item, errors: res.errors, loading: false }),
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

  readonly updateUserFeatureEffect = this.effect<UserUpdateUserFeatureInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([input, item]) =>
        this.data.userUpdateUserFeature({ input, userFeatureId: item.id }).pipe(
          tapResponse(
            (res) => {
              this.patchState({ item: res.data.updated, errors: res.errors, loading: false })
              return this.router.navigate(['..'],{relativeTo: this.route})
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
}

