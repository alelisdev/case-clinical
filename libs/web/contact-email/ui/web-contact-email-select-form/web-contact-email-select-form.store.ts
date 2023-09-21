
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateContactEmailInput,
  UserUpdateContactEmailInput,
  ContactEmail,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface ContactEmailFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  contactEmails: ContactEmail[]
}

@Injectable()
export class WebContactEmailSelectFormStore extends ComponentStore<ContactEmailFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      contactEmails: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly contactEmails$ = this.select((s) => s.contactEmails)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.contactEmails$,
    (errors, loading, contactEmails) => ({
      errors,
      loading,
      contactEmails
    }),
    { debounce: true },
  )

  addNewContactEmail = this.updater((state, contactEmail: ContactEmail) => ({ contactEmails: [...state.contactEmails, contactEmail] }))

  updateContactEmail = this.updater((state, contactEmail: ContactEmail) => {
    return {
      ...state,
      contactEmails: state.contactEmails.map((el) => {
        if (el.id === contactEmail.id) {
          return contactEmail
        } else {
          return el
        }
      }),
    }
  })

  readonly createContactEmailEffect = this.effect<{ input: UserCreateContactEmailInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateContactEmail({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewContactEmail(res.data.created)
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

  readonly updateContactEmailEffect = this.effect<{ input: UserUpdateContactEmailInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateContactEmail({ contactEmailId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateContactEmail(res.data.updated)
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

  loadContactEmailsEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userContactEmails({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                contactEmails: data.data.items,
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

