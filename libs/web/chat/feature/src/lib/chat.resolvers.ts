import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router'
import { tapResponse } from '@ngrx/component-store'
import { catchError, Observable, of, throwError } from 'rxjs'
import { ChatService } from './chat.service'
import { ChatStore } from './chat.store'
import { Chat, Contact, Profile } from './chat.types'

@Injectable({
  providedIn: 'root',
})
export class ChatChatsResolver implements Resolve<any> {
  /**
   * Constructor
   */
  constructor(private _chatService: ChatService, private _router: Router) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Resolver
   *
   * @param route
   * @param state
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Chat[]> | any {
    const chats = this._chatService.getChats()
    let customChat = []
    chats.subscribe((chats) => {
      // console.log("chats", chats)
      customChat = chats
      customChat[0].lastMessageAt = '29/12/2022'
    })
    return of(customChat)
  }
}

@Injectable({
  providedIn: 'root',
})
export class ChatChatResolver implements Resolve<any> {
  /**
   * Constructor
   */
  constructor(private _chatService: ChatService, private _router: Router) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Resolver
   *
   * @param route
   * @param state
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Chat> {
    return this._chatService.getChatById('f73a5a34-a723-4b35-8439-5289e0164c83').pipe(
      tapResponse(
        (res) => {
          // console.log("getChatById", res)
        },
        (errors: any) => {
          // console.log("errors")
        },
      ),
      // Error here means the requested chat is not available
      catchError((error) => {
        // Log the error
        // console.error(error);

        // Get the parent url
        const parentUrl = state.url.split('/').slice(0, -1).join('/')

        // Navigate to there
        this._router.navigateByUrl(parentUrl)

        // Throw an error
        return throwError(error)
      }),
    )
  }
}

@Injectable({
  providedIn: 'root',
})
export class ChatContactsResolver implements Resolve<any> {
  /**
   * Constructor
   */
  constructor(private _chatService: ChatService, private _router: Router) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Resolver
   *
   * @param route
   * @param state
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Contact[]> | any {
    const contacts = this._chatService.getContacts()
    // console.log("contactList", contacts)
    return contacts
  }
}

@Injectable({
  providedIn: 'root',
})
export class ChatProfileResolver implements Resolve<any> {
  /**
   * Constructor
   */
  constructor(private _chatService: ChatService, private _router: Router) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Resolver
   *
   * @param route
   * @param state
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Profile> | any {
    const profile = this._chatService.getProfile()
    // console.log("profile", profile)
    return profile
  }
}

@Injectable({
  providedIn: 'root',
})
export class RoomResolver implements Resolve<any> {
  constructor(private store: ChatStore) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const room = this.store.getRoom(route.paramMap.get('id'))
    return room
  }
}
