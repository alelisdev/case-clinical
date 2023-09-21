
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateContactKindInput,
  UserUpdateContactKindInput,
  ContactKind,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface ContactKindFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  contactKinds: ContactKind[]
}

@Injectable()
export class WebContactKindSelectFormStore extends ComponentStore<ContactKindFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      contactKinds: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly contactKinds$ = this.select((s) => s.contactKinds)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.contactKinds$,
    (errors, loading, contactKinds) => ({
      errors,
      loading,
      contactKinds
    }),
    { debounce: true },
  )

  addNewContactKind = this.updater((state, contactKind: ContactKind) => ({ contactKinds: [...state.contactKinds, contactKind] }))

  updateContactKind = this.updater((state, contactKind: ContactKind) => {
    return {
      ...state,
      contactKinds: state.contactKinds.map((el) => {
        if (el.id === contactKind.id) {
          return contactKind
        } else {
          return el
        }
      }),
    }
  })

  readonly createContactKindEffect = this.effect<{ input: UserCreateContactKindInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateContactKind({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewContactKind(res.data.created)
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

  readonly updateContactKindEffect = this.effect<{ input: UserUpdateContactKindInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateContactKind({ contactKindId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateContactKind(res.data.updated)
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

  loadContactKindsEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userContactKinds({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                contactKinds: data.data.items,
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

