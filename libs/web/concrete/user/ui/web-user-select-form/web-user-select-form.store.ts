
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateUserInput,
  UserUpdateUserInput,
  User,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface UserFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  users: User[]
}

@Injectable()
export class WebUserSelectFormStore extends ComponentStore<UserFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      users: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly users$ = this.select((s) => s.users)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.users$,
    (errors, loading, users) => ({
      errors,
      loading,
      users
    }),
    { debounce: true },
  )

  addNewUser = this.updater((state, user: User) => ({ users: [...state.users, user] }))

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

  readonly createUserEffect = this.effect<{ input: UserCreateUserInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateUser({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewUser(res.data.created)
                this.patchState({
                  errors: res.errors,
                  loading: false,
                })
                data.resultEmitter.emit(res.data.created)
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

  readonly updateUserEffect = this.effect<{ input: UserUpdateUserInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateUser({ userId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateUser(res.data.updated)
                this.patchState({ errors: res.errors, loading: false })
                data.resultEmitter.emit(res.data.updated)
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
}

