
import { Injectable } from '@angular/core'
import { ActivatedRoute,Router } from '@angular/router'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { WebCoreDataAccessService,Message } from '@case-clinical/web/core/data-access'
import { pluck,switchMap, tap } from 'rxjs/operators'
import { DescriptionListItem } from '@case-clinical/web/ui/description-list'

export interface MessageDetailState {
  errors ?: any
  loading?: boolean
  item?: Message
}

@Injectable()
export class WebMessageDetailStore extends ComponentStore<MessageDetailState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
) {
    super({ loading: false })
    this.loadMessageEffect(route.params.pipe(pluck('messageId')))
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
{ label: 'Image', value: item?.image },
{ label: 'Title', value: item?.title },
{ label: 'Description', value: item?.description },
{ label: 'Time', value: item?.time },
{ label: 'Read', value: item?.read },
{ label: 'Is Mine', value: item?.isMine },


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

  readonly loadMessageEffect = this.effect<string>((messageId$) =>
    messageId$.pipe(
      tap(() => this.setState({ loading: true })),
      switchMap((messageId) =>
        this.data.userMessage({ messageId }).pipe(
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

  readonly deleteMessageEffect = this.effect<Message>(
    (message$) =>
      message$.pipe(
        switchMap((message) =>
          this.data
            .userDeleteMessage({
              messageId: message.id,
            })
            .pipe(
              tapResponse(
                (res) => this.router.navigate(['/queues/messages']),
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

