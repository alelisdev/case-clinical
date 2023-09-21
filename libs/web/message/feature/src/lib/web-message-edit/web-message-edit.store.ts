
import { Injectable } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { UserUpdateMessageInput, WebCoreDataAccessService, Message, User,Chat } from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, withLatestFrom, pluck, map } from 'rxjs/operators'

export interface MessageUpdateState {
  errors ?: any
  loading?: boolean
  item?: Message,
 users?: User[],
 chats?: Chat[]
  searchTerm?: string
}

@Injectable()
export class WebMessageEditStore extends ComponentStore<MessageUpdateState> {
  constructor(private readonly data: WebCoreDataAccessService, private readonly router: Router, private readonly route: ActivatedRoute) {
    super({ loading: false })

    this.loadMessageEffect(route.params.pipe(pluck('messageId')))
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)
  readonly users$ = this.select((s) => s.users)
  readonly chats$ = this.select((s) => s.chats)
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 
this.users$,this.chats$,
    (errors, loading, item, users,chats ) => ({
    errors,
    loading,
    item,
users,chats
  }),
{debounce: true})



  readonly filterUsers = (term) => 
        this.data.userUsers({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let users = res.data.items;
              return users
            },
            (errors: any) =>
              this.patchState({
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        map(result => {
          return result.data.items;
        })
  )


  readonly filterChats = (term) => 
        this.data.userChats({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let chats = res.data.items;
              return chats
            },
            (errors: any) =>
              this.patchState({
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        map(result => {
          return result.data.items;
        })
  )


    

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

  readonly updateMessageEffect = this.effect<UserUpdateMessageInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([input, item]) =>
        this.data.userUpdateMessage({ input, messageId: item.id }).pipe(
          tapResponse(
            (res) => {
              this.patchState({ item: res.data.updated, errors: res.errors, loading: false })
              return this.router.navigate(['..'],{relativeTo: this.route})
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

