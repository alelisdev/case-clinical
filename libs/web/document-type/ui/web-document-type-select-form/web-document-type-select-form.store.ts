
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateDocumentTypeInput,
  UserUpdateDocumentTypeInput,
  DocumentType,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface DocumentTypeFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  documentTypes: DocumentType[]
}

@Injectable()
export class WebDocumentTypeSelectFormStore extends ComponentStore<DocumentTypeFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      documentTypes: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly documentTypes$ = this.select((s) => s.documentTypes)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.documentTypes$,
    (errors, loading, documentTypes) => ({
      errors,
      loading,
      documentTypes
    }),
    { debounce: true },
  )

  addNewDocumentType = this.updater((state, documentType: DocumentType) => ({ documentTypes: [...state.documentTypes, documentType] }))

  updateDocumentType = this.updater((state, documentType: DocumentType) => {
    return {
      ...state,
      documentTypes: state.documentTypes.map((el) => {
        if (el.id === documentType.id) {
          return documentType
        } else {
          return el
        }
      }),
    }
  })

  readonly createDocumentTypeEffect = this.effect<{ input: UserCreateDocumentTypeInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateDocumentType({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewDocumentType(res.data.created)
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

  readonly updateDocumentTypeEffect = this.effect<{ input: UserUpdateDocumentTypeInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateDocumentType({ documentTypeId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateDocumentType(res.data.updated)
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

  loadDocumentTypesEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userDocumentTypes({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                documentTypes: data.data.items,
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

