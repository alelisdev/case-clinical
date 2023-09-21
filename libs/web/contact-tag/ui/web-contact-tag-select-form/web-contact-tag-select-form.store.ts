
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateContactTagInput,
  UserUpdateContactTagInput,
  ContactTag,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface ContactTagFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  contactTags: ContactTag[]
}

@Injectable()
export class WebContactTagSelectFormStore extends ComponentStore<ContactTagFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      contactTags: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly contactTags$ = this.select((s) => s.contactTags)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.contactTags$,
    (errors, loading, contactTags) => ({
      errors,
      loading,
      contactTags
    }),
    { debounce: true },
  )

  addNewContactTag = this.updater((state, contactTag: ContactTag) => ({ contactTags: [...state.contactTags, contactTag] }))

  updateContactTag = this.updater((state, contactTag: ContactTag) => {
    return {
      ...state,
      contactTags: state.contactTags.map((el) => {
        if (el.id === contactTag.id) {
          return contactTag
        } else {
          return el
        }
      }),
    }
  })

  readonly createContactTagEffect = this.effect<{ input: UserCreateContactTagInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateContactTag({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewContactTag(res.data.created)
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

  readonly updateContactTagEffect = this.effect<{ input: UserUpdateContactTagInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateContactTag({ contactTagId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateContactTag(res.data.updated)
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

  loadContactTagsEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userContactTags({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                contactTags: data.data.items,
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

