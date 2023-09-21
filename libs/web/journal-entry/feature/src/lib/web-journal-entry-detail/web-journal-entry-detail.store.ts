
import { Injectable } from '@angular/core'
import { ActivatedRoute,Router } from '@angular/router'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { WebCoreDataAccessService,JournalEntry } from '@case-clinical/web/core/data-access'
import { pluck,switchMap, tap } from 'rxjs/operators'
import { DescriptionListItem } from '@case-clinical/web/ui/description-list'
import { WebUiToastService } from '@case-clinical/web/ui/toast'

export interface JournalEntryDetailState {
  errors ?: any
  loading?: boolean
  item?: JournalEntry
}

@Injectable()
export class WebJournalEntryDetailStore extends ComponentStore<JournalEntryDetailState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService
) {
    super({ loading: false })
    this.loadJournalEntryEffect(route.params.pipe(pluck('journalEntryId')))
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
{ label: 'Location Name', value: item?.locationName },
{ label: 'From to', value: item?.fromTo },
{ label: 'Frequency', value: item?.frequency },
{ label: 'Auto or Manual', value: item?.autoOrManual },
{ label: 'Process', value: item?.process },
{ label: 'Per Account or Aggregate JE', value: item?.perAccountOrAggregateJE },
{ label: 'Cost Rate', value: item?.costRate },
{ label: 'Posting Date', value: item?.postingDate },
{ label: 'Document Date', value: item?.documentDate },
{ label: 'Due Date', value: item?.dueDate },
{ label: 'Amount', value: item?.amount },
{ label: 'Account Type', value: item?.accountType },
{ label: 'Account Number', value: item?.accountNumber },
{ label: 'Cost Center', value: item?.costCenter },
{ label: 'Applies to Document Number', value: item?.appliesToDocumentNumber },

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

  readonly loadJournalEntryEffect = this.effect<string>((journalEntryId$) =>
    journalEntryId$.pipe(
      tap(() => this.setState({ loading: true })),
      switchMap((journalEntryId) =>
        this.data.userJournalEntry({ journalEntryId }).pipe(
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

  readonly deleteJournalEntryEffect = this.effect<JournalEntry>(
    (journalEntry$) =>
      journalEntry$.pipe(
        switchMap((journalEntry) =>
          this.data
            .userDeleteJournalEntry({
              journalEntryId: journalEntry.id,
            })
            .pipe(
              tapResponse(
                (res) =>
                {  
                    this.toast.success("Deleted successfully!", {duration: 3000})
                    return this.router.navigate(['/queues/journal-entries'])
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
}

