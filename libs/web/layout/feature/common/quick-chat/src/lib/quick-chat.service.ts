import { Injectable } from '@angular/core'
import { BehaviorSubject, map, Observable, of, switchMap, tap, throwError } from 'rxjs'
import { WebAuthStore } from '@case-clinical/web/auth/data-access'
import { chats, contacts, messages } from './data'

@Injectable({
    providedIn: 'root',
})
export class QuickChatService {
    private _chat!: BehaviorSubject<any>
    private _chats: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([])

    /**
     * Constructor
     */
    constructor(private client: WebAuthStore) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for chat
     */
    get chat$(): Observable<any> {
        return of(chats[0]);
    }

    /**
     * Getter for chat
     */
    get chats$(): Observable<any[]> {
      chats.map((chat) => {
        const contact = contacts.find((el) => el.id === chat.contactId);
        chat['contact'] = contact;
      })
      return of(chats)
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get chats
     */
    getChats(): Observable<any> {
        return this.chats$.pipe(
            tap((response: any[]) => {
              response.map((chat) => {
                const contact = contacts.find((el) => el.id === chat.contactId);
                chat['contact'] = contact;
              });
                this._chats.next(response)
            }),
        )
    }

    /**
     * Get chat
     *
     * @param id
     */
    getChatById(id: string): Observable<any> {
      const chat = chats.find((el) => el.id === id);
      chat['messages'] = messages;
      return of(chat);
    }
}
