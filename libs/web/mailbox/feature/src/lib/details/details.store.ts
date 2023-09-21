import { Injectable } from '@angular/core'
import { ComponentStore } from '@ngrx/component-store'
import { MailboxService } from '../mailbox.service';

export interface MailboxDetailState {
  errors?: any
  loading?: boolean
  mail?: any;
}

@Injectable({
    providedIn: 'root'
})
export class MailboxDetailsStore extends ComponentStore<MailboxDetailState> {
  constructor(
    private _mailboxService: MailboxService,
  ) {
    super({ loading: false})
    this._mailboxService.mail$.subscribe((data) => {this.patchState({mail: data})});
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly mail$ = this.select((s) => s.mail)
  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.mail$,
    (
      errors,
      loading,
      mail,
    ) => ({
      errors,
      loading,
      mail,
    }),
    { debounce: true },
  )
}