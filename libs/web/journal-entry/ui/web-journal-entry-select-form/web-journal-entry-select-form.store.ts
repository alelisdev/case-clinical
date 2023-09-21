
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateJournalEntryInput,
  UserUpdateJournalEntryInput,
  JournalEntry,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface JournalEntryFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  journalEntries: JournalEntry[]
}

@Injectable()
export class WebJournalEntrySelectFormStore extends ComponentStore<JournalEntryFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      journalEntries: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly journalEntries$ = this.select((s) => s.journalEntries)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.journalEntries$,
    (errors, loading, journalEntries) => ({
      errors,
      loading,
      journalEntries
    }),
    { debounce: true },
  )

  addNewJournalEntry = this.updater((state, journalEntry: JournalEntry) => ({ journalEntries: [...state.journalEntries, journalEntry] }))

  updateJournalEntry = this.updater((state, journalEntry: JournalEntry) => {
    return {
      ...state,
      journalEntries: state.journalEntries.map((el) => {
        if (el.id === journalEntry.id) {
          return journalEntry
        } else {
          return el
        }
      }),
    }
  })

  readonly createJournalEntryEffect = this.effect<{ input: UserCreateJournalEntryInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateJournalEntry({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewJournalEntry(res.data.created)
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

  readonly updateJournalEntryEffect = this.effect<{ input: UserUpdateJournalEntryInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateJournalEntry({ journalEntryId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateJournalEntry(res.data.updated)
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

  loadJournalEntriesEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userJournalEntries({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                journalEntries: data.data.items,
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

