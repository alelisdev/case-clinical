import { Injectable } from '@angular/core'
import { ComponentStore } from '@ngrx/component-store'
import { MailboxService } from '../mailbox.service';

export interface MailboxListState {
  pagination?: any
  errors?: any
  loading?: boolean
  item?: any;
  folder? : any;
  page?: any;
  category? : any;
  mailsLoading? : boolean;
}

@Injectable({
    providedIn: 'root'
})
export class MailboxListStore extends ComponentStore<MailboxListState> {
  constructor(
    private _mailboxService: MailboxService,
  ) {
    super({ loading: false, mailsLoading: false })
    this._mailboxService.mails$.subscribe((res) => {this.patchState({item: res})});
    this._mailboxService.pagination$.subscribe((res) => {this.patchState({pagination: res})})
    this._mailboxService.mailsLoading$.subscribe((res) => {this.patchState({mailsLoading: res})})
    this._mailboxService.category$.subscribe((res) => {this.patchState({category: res})})
    
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)
  readonly pagination$ = this.select((s) => s.pagination)
  readonly category$ = this.select((s) => s.category)
  readonly mailsLoading$ = this.select((s) => s.mailsLoading)
  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.item$,
    this.pagination$,
    this.category$, 
    this.mailsLoading$,
    (
      errors,
      loading,
      item,
      pagination,
      category,
      mailsLoading
    ) => ({
      errors,
      loading,
      item,
      pagination,
      category,
      mailsLoading
    }),
    { debounce: true },
  )
}