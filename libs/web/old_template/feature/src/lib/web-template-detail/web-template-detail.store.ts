
import { Injectable } from '@angular/core'
import { ActivatedRoute,Router } from '@angular/router'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { WebCoreDataAccessService,Template } from '@case-clinical/web/core/data-access'
import { pluck,switchMap, tap } from 'rxjs/operators'
import { DescriptionListItem } from '@case-clinical/web/ui/description-list'

export interface TemplateDetailState {
  errors ?: any
  loading?: boolean
  item?: Template
}

@Injectable()
export class WebTemplateDetailStore extends ComponentStore<TemplateDetailState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
) {
    super({ loading: false })
    this.loadTemplateEffect(route.params.pipe(pluck('templateId')))
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
{ label: 'Signature File Type', value: item?.signatureFileType },
{ label: 'Contracts', value: item?.contracts },
{ label: 'Assigned Documents', value: item?.assignedDocuments },
      ] as DescriptionListItem[],
  )

readonly tabs$ = this.select(this.item$, (item) => [
    {
      label: 'Details',
      path: 'details',
      data: item,
    },
    { label: 'Contract', path: 'contract', data: item?.contracts },
{ label: 'Assigned Document', path: 'assigned-document', data: item?.assignedDocuments }
  ])
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.tabs$, (errors, loading, item, tabs) => ({
    errors,
    loading,
    item: { ...item },
    tabs
  }),
{debounce: true})

  readonly loadTemplateEffect = this.effect<string>((templateId$) =>
    templateId$.pipe(
      tap(() => this.setState({ loading: true })),
      switchMap((templateId) =>
        this.data.userTemplate({ templateId }).pipe(
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

  readonly deleteTemplateEffect = this.effect<Template>(
    (template$) =>
      template$.pipe(
        switchMap((template) =>
          this.data
            .userDeleteTemplate({
              templateId: template.id,
            })
            .pipe(
              tapResponse(
                (res) => this.router.navigate(['/queues/templates']),
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

