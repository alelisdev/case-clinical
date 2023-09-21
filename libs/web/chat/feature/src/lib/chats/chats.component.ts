import { HttpClient } from '@angular/common/http'
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { User } from '@case-clinical/web/core/data-access'
import { BehaviorSubject, Subject, takeUntil } from 'rxjs'
import { ChatService } from '../chat.service'
import { ChatStore } from '../chat.store'
import { Chat, Profile } from '../chat.types'

@Component({
  selector: 'chat-chats',
  templateUrl: './chats.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatsComponent implements OnInit, OnDestroy {
  chats: Chat[]
  drawerComponent: 'profile' | 'new-chat'
  drawerOpened: boolean = false
  filteredChats: Chat[]
  filteredRooms: any[]
  profile: User
  selectedChat: Chat
  private _unsubscribeAll: Subject<any> = new Subject<any>()
  currentDate: Date = new Date()
  isChatListVisible: boolean = true
  readonly vm$ = this.store.vm$
  readonly rooms$ = this.store.rooms$
  rooms: Array<any> = []
  activeRoomId: string
  /**
   * Constructor
   */
  constructor(
    private _chatService: ChatService,
    private _changeDetectorRef: ChangeDetectorRef,
    private store: ChatStore,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.store.getRooms()

    // to hide the chatlist when inside the legal-case
    this.route.data.pipe(takeUntil(this._unsubscribeAll)).subscribe((data) => {
      this.isChatListVisible = !data?.insideLegalCase
    })

    // this.route.params.pipe(takeUntil(this._unsubscribeAll)).subscribe((params) => {
    //   // console.log("windowa", window.location)
    //     this.activeRoomId = params['id']
    //     // console.log("activeRoomId", this.activeRoomId)
    //     this._changeDetectorRef.markForCheck()
    //     this._changeDetectorRef.detectChanges()
    // })

    // rooms
    this.vm$.pipe(takeUntil(this._unsubscribeAll)).subscribe((vm) => {
      // console.log('vm', vm)
      this.activeRoomId = vm.activeRoomId
      this.profile = vm.me
      this.rooms = this.filteredRooms = vm.rooms
      // console.log('component rooms', vm.rooms)
      this._changeDetectorRef.markForCheck()
      this._changeDetectorRef.detectChanges()
    })
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null)
    this._unsubscribeAll.complete()
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Filter the chats
   *
   * @param query
   */
  filterChats(query: string): void {
    // Reset the filter
    if (!query) {
      this.filteredChats = this.chats
      return
    }

    this.filteredChats = this.chats.filter((chat) => chat.contact?.name.toLowerCase().includes(query.toLowerCase()))
    // console.log('filtered', this.filteredChats)
  }

  filterRooms(query: string): void {
    // Reset the filter
    if (!query) {
      this.filteredRooms = this.rooms
      return
    }

    this.filteredRooms = this.rooms.filter((room) => room?.name.toLowerCase().includes(query.toLowerCase()))
    // console.log('filtered', this.filteredRooms)
  }

  /**
   * Open the new chat sidebar
   */
  openNewChat(): void {
    this.drawerComponent = 'new-chat'
    this.drawerOpened = true

    // Mark for check
    this._changeDetectorRef.markForCheck()
  }

  /**
   * Open the profile sidebar
   */
  openProfile(): void {
    this.drawerComponent = 'profile'
    this.drawerOpened = true

    // Mark for check
    this._changeDetectorRef.markForCheck()
  }

  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index: number, item: any): any {
    return item.id || index
  }

  openConversation(chat: any) {
    // const headers = { Authorization: 'Bearer syt_cGNo_ZQCYDCajaeNbVxiMPXCc_41EXS1' }
    // this.http
    //   .post(
    //     `https://matrix-uat.caseclinical.com/_matrix/client/v3/rooms/${chat.roomId}/read_markers `,
    //     {
    //       'm.read': chat.lastEventId,
    //       'm.read.private': chat.lastEventId
    //     },
    //     { headers },
    //   )
    //   .subscribe((res) => {
    //     // console.log('read_marker', res)
    //   })
    this.router.navigate([chat.roomId], { relativeTo: this.route })
  }
}
