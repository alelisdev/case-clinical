
import { Injectable } from '@angular/core'
import { WebCoreDataAccessService, Message, User,Chat } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface MessageFormState {
  errors?: any
  loading?: boolean
  item?: Message,
 users?: User[],
 chats?: Chat[]
  searchTerm?: string
}

@Injectable()
export class WebMessageFormStore extends ComponentStore<MessageFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({ loading: false })
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


}
