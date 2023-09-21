
import { Injectable } from '@angular/core'
import { ActivatedRoute,Router } from '@angular/router'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { WebCoreDataAccessService,AssignedDocument } from '@case-clinical/web/core/data-access'
import { pluck,switchMap, tap } from 'rxjs/operators'
import { DescriptionListItem } from '@case-clinical/web/ui/description-list'

export interface AssignedDocumentDetailState {
  errors ?: any
  loading?: boolean
  item?: AssignedDocument
}

@Injectable()
export class WebAssignedDocumentDetailStore extends ComponentStore<AssignedDocumentDetailState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
) {
    super({ loading: false })
    this.loadAssignedDocumentEffect(route.params.pipe(pluck('assignedDocumentId')))
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
{ label: 'Expiration Date', value: item?.expirationDate },
{ label: 'Entity Name', value: item?.entityName },
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

  readonly loadAssignedDocumentEffect = this.effect<string>((assignedDocumentId$) =>
    assignedDocumentId$.pipe(
      tap(() => this.setState({ loading: true })),
      switchMap((assignedDocumentId) =>
        this.data.userAssignedDocument({ assignedDocumentId }).pipe(
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

  readonly deleteAssignedDocumentEffect = this.effect<AssignedDocument>(
    (assignedDocument$) =>
      assignedDocument$.pipe(
        switchMap((assignedDocument) =>
          this.data
            .userDeleteAssignedDocument({
              assignedDocumentId: assignedDocument.id,
            })
            .pipe(
              tapResponse(
                (res) => this.router.navigate(['/queues/assigned-documents']),
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

