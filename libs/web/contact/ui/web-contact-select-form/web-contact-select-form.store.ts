
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateContactInput,
  UserUpdateContactInput,
  Contact,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface ContactFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  contacts: Contact[]
}

@Injectable()
export class WebContactSelectFormStore extends ComponentStore<ContactFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      contacts: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly contacts$ = this.select((s) => s.contacts)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.contacts$,
    (errors, loading, contacts) => ({
      errors,
      loading,
      contacts
    }),
    { debounce: true },
  )

  addNewContact = this.updater((state, contact: Contact) => ({ contacts: [...state.contacts, contact] }))

  updateContact = this.updater((state, contact: Contact) => {
    return {
      ...state,
      contacts: state.contacts.map((el) => {
        if (el.id === contact.id) {
          return contact
        } else {
          return el
        }
      }),
    }
  })

  readonly createContactEffect = this.effect<{ input: UserCreateContactInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateContact({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewContact(res.data.created)
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

  readonly updateContactEffect = this.effect<{ input: UserUpdateContactInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateContact({ contactId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateContact(res.data.updated)
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

  loadContactsEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userContacts({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                contacts: data.data.items,
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

