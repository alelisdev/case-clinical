
import { Injectable } from '@angular/core'
import { ActivatedRoute,Router } from '@angular/router'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { WebCoreDataAccessService,Document } from '@case-clinical/web/core/data-access'
import { pluck,switchMap, tap } from 'rxjs/operators'
import { DescriptionListItem } from '@case-clinical/web/ui/description-list'

export interface DocumentDetailState {
  errors ?: any
  loading?: boolean
  item?: Document
}

@Injectable()
export class WebDocumentDetailStore extends ComponentStore<DocumentDetailState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
) {
    super({ loading: false })
    this.loadDocumentEffect(route.params.pipe(pluck('documentId')))
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)

readonly displayItems$ = this.select(
    this.item$,
    (item) =>
      [
{ label: 'Id', value: item?.id },
{ label: 'Name', value: item?.name },
{ label: 'Attachment', value: item?.attachment },
{ label: 'Encoding', value: item?.encoding },
{ label: 'Extension', value: item?.extension },






{ label: 'Assigned Documents', value: item?.assignedDocuments },
{ label: 'Medical Reports', value: item?.medicalReports },
{ label: 'Bills', value: item?.bills },
{ label: 'Prescriptions', value: item?.prescriptions },
{ label: 'Eulas', value: item?.eulas },
      ] as DescriptionListItem[],
  )

readonly tabs$ = this.select(this.item$, (item) => [
    {
      label: 'Details',
      path: 'details',
      data: item,
    },
  ])
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.tabs$, (errors, loading, item, tabs) => ({
    errors,
    loading,
    item: { ...item },
    tabs
  }),
{debounce: true})

  readonly loadDocumentEffect = this.effect<string>((documentId$) =>
    documentId$.pipe(
      tap(() => this.setState({ loading: true })),
      switchMap((documentId) =>
        this.data.userDocument({ documentId }).pipe(
          tapResponse(
            (res) => this.patchState({ item: res.data.item, errors: res.errors, loading: false }),
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

  readonly deleteDocumentEffect = this.effect<Document>(
    (document$) =>
      document$.pipe(
        switchMap((document) =>
          this.data
            .userDeleteDocument({
              documentId: document.id,
              featureName: ''
            })
            .pipe(
              tapResponse(
                (res) => this.router.navigate(['/queues/documents']),
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
}

