
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateDocumentInput,
  UserUpdateDocumentInput,
  Document,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface DocumentFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  documents: Document[]
}

@Injectable()
export class WebDocumentSelectFormStore extends ComponentStore<DocumentFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      documents: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly documents$ = this.select((s) => s.documents)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.documents$,
    (errors, loading, documents) => ({
      errors,
      loading,
      documents
    }),
    { debounce: true },
  )

  addNewDocument = this.updater((state, document: Document) => ({ documents: [...state.documents, document] }))

  updateDocument = this.updater((state, document: Document) => {
    return {
      ...state,
      documents: state.documents.map((el) => {
        if (el.id === document.id) {
          return document
        } else {
          return el
        }
      }),
    }
  })

  readonly createDocumentEffect = this.effect<{ input: UserCreateDocumentInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateDocument({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewDocument(res.data.created)
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

  readonly updateDocumentEffect = this.effect<{ input: UserUpdateDocumentInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateDocument({ documentId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateDocument(res.data.updated)
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

  loadDocumentsEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userDocuments({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                documents: data.data.items,
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

