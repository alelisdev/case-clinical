
import { Injectable } from '@angular/core'
import { ActivatedRoute,Router } from '@angular/router'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { WebCoreDataAccessService,Chat } from '@case-clinical/web/core/data-access'
import { pluck,switchMap, tap } from 'rxjs/operators'
import { DescriptionListItem } from '@case-clinical/web/ui/description-list'

export interface ChatDetailState {
  errors ?: any
  loading?: boolean
  item?: Chat
}

@Injectable()
export class WebChatDetailStore extends ComponentStore<ChatDetailState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
) {
    super({ loading: false })
    this.loadChatEffect(route.params.pipe(pluck('chatId')))
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

{ label: 'Unread Count', value: item?.unreadCount },
{ label: 'Muted', value: item?.muted },
{ label: 'Last Message', value: item?.lastMessage },
{ label: 'Last Message At', value: item?.lastMessageAt },
{ label: 'Messages', value: item?.messages },
      ] as DescriptionListItem[],
  )

readonly tabs$ = this.select(this.item$, (item) => [
    {
      label: 'Details',
      path: 'details',
      data: item,
    },
    { label: 'Message', path: 'message', data: item?.messages }
  ])
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.tabs$, (errors, loading, item, tabs) => ({
    errors,
    loading,
    item: { ...item },
    tabs
  }),
{debounce: true})

  readonly loadChatEffect = this.effect<string>((chatId$) =>
    chatId$.pipe(
      tap(() => this.setState({ loading: true })),
      switchMap((chatId) =>
        this.data.userChat({ chatId }).pipe(
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

  readonly deleteChatEffect = this.effect<Chat>(
    (chat$) =>
      chat$.pipe(
        switchMap((chat) =>
          this.data
            .userDeleteChat({
              chatId: chat.id,
            })
            .pipe(
              tapResponse(
                (res) => this.router.navigate(['/queues/chats']),
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

