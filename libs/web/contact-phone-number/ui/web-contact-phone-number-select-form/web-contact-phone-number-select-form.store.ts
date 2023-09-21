
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateContactPhoneNumberInput,
  UserUpdateContactPhoneNumberInput,
  ContactPhoneNumber,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface ContactPhoneNumberFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  contactPhoneNumbers: ContactPhoneNumber[]
}

@Injectable()
export class WebContactPhoneNumberSelectFormStore extends ComponentStore<ContactPhoneNumberFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      contactPhoneNumbers: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly contactPhoneNumbers$ = this.select((s) => s.contactPhoneNumbers)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.contactPhoneNumbers$,
    (errors, loading, contactPhoneNumbers) => ({
      errors,
      loading,
      contactPhoneNumbers
    }),
    { debounce: true },
  )

  addNewContactPhoneNumber = this.updater((state, contactPhoneNumber: ContactPhoneNumber) => ({ contactPhoneNumbers: [...state.contactPhoneNumbers, contactPhoneNumber] }))

  updateContactPhoneNumber = this.updater((state, contactPhoneNumber: ContactPhoneNumber) => {
    return {
      ...state,
      contactPhoneNumbers: state.contactPhoneNumbers.map((el) => {
        if (el.id === contactPhoneNumber.id) {
          return contactPhoneNumber
        } else {
          return el
        }
      }),
    }
  })

  readonly createContactPhoneNumberEffect = this.effect<{ input: UserCreateContactPhoneNumberInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateContactPhoneNumber({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewContactPhoneNumber(res.data.created)
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

  readonly updateContactPhoneNumberEffect = this.effect<{ input: UserUpdateContactPhoneNumberInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateContactPhoneNumber({ contactPhoneNumberId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateContactPhoneNumber(res.data.updated)
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

  loadContactPhoneNumbersEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userContactPhoneNumbers({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                contactPhoneNumbers: data.data.items,
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

