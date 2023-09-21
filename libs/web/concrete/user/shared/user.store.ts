
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserCreateUserInput, UserUpdateUserInput, WebCoreDataAccessService, User,  } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, withLatestFrom, map } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { UserService } from './user.service'

export interface UserFeatureState {
  errors?: any
  loading?: boolean
  item?: User
  done: boolean
  users: User[]

  searchTerm?: string
}

@Injectable()
export class WebUserFeatureStore extends ComponentStore<UserFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly userService: UserService
) {
    super({ 
      loading: false,
      users: [],
      done: false,
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly users$ = this.select((s) => s.users)


  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 

    (errors, loading, item,  ) => ({
    errors,
    loading,
    item,

  }),
{debounce: true})


  initialize = this.updater((state) => ({...state, item: null, done: false }))





    

  addNewUser = this.updater((state, user: User) => ({...state, users: [...state.users, user] }))

  updateUser = this.updater((state, user: User) => {
    return {
      ...state,
      users: state.users.map((el) => {
        if (el.id === user.id) {
          return user
        } else {
          return el
        }
      }),
    }
  })

  readonly loadUserEffect = this.effect<string>((userId$) =>
    userId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((userId) =>
        this.data.userUser({ userId }).pipe(
          tapResponse(
            (res) => {
                    this.patchState({ 
                    item: res.data.item, 
                    errors: res.errors, 
                    loading: false 
                })
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

    loadUsersEffect = this.effect<void>(($) =>
        $.pipe(
          tap(() => {
            this.patchState({ loading: true })
          }),
          switchMap(() =>
            this.data.userUsers({ input: {} }).pipe(
              tapResponse(
                (data) => {
                  this.patchState({
                    loading: false,
                    users: data.data.items,
                  })
                },
                (error) => {
                  this.patchState({
                    loading: false,
                  })
                },
              ),
            ),
          ),
        ),
      )

    readonly updateUserEffect = this.effect<UserUpdateUserInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.userService.updateUser(input, input.id).pipe(
              tapResponse(
                (user) => {
                  this.updateUser(user)
                  this.toast.success('Changed Successfully')
                  this.patchState({done: true, item: user });
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

  readonly createUserEffect = this.effect<UserCreateUserInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
         this.userService.createUser({...input}).pipe(
          tapResponse(
            (user: User) => {
              this.patchState({ item: user, loading: false })
              return this.router.navigate(['..', user?.id], {relativeTo: this.route})
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
