import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core'
import { BehaviorSubject, Observable, of, Subject, takeUntil } from 'rxjs'
import { FuseMediaWatcherService } from '@fuse/services/media-watcher'
import { ChatService } from '../chat.service'
import { Chat } from '../chat.types'
import { FormControl } from '@angular/forms'
import { WebUiFilePreviewComponent } from 'libs/web/ui/file-preview/web-ui-file-preview.component'
import { ChatStore } from '../chat.store'
import { ActivatedRoute } from '@angular/router'
import { HttpClient } from '@angular/common/http'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import moment from 'moment'
import { environment } from '@case-clinical/web/core/feature'

interface DocumentInput {
  name?: string
  attachment?: string
  encoding?: string
  extension?: string
  size?: number
}

@Component({
  selector: 'chat-conversation',
  templateUrl: './conversation.component.html',
  // encapsulation  : ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      ::ng-deep textarea.mat-input-element {
        box-shadow: none !important;
      }
      ::ng-deep input.mat-input-element {
        box-shadow: none !important;
      }
    `,
  ],
})
export class ConversationComponent implements OnInit, OnDestroy {
  readonly vm$ = this.store.vm$
  readonly room$ = this.store.room$
  room: any = {}
  messages: any[] = []
  myMatrixUserId: string
  anotherUsers: any[] = []

  @ViewChild('messageInput') messageInput: ElementRef
  @ViewChild('conversationContainer') conversationContainer: ElementRef
  @ViewChild('filePreview') filePreviewComponent!: WebUiFilePreviewComponent

  chat: any
  drawerMode: 'over' | 'side' = 'side'
  drawerOpened: boolean = false
  private _unsubscribeAll: Subject<any> = new Subject<any>()
  currentDate: Date = new Date()

  readonly formControl = new FormControl('')
  selectedFiles$: BehaviorSubject<Array<DocumentInput>> = new BehaviorSubject<Array<DocumentInput>>([])

  messageInputValue: string = ''
  insideLegalCase: boolean = false
  roomId: string = undefined
  roomType: string
  lastMessageEventId: string
  typingIndicator: any = {
    timer: undefined,
    value: false,
    typingStartTime: undefined,
  }
  typingMembers: any[] = []

  /**
   * Constructor
   */
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _chatService: ChatService,
    private _fuseMediaWatcherService: FuseMediaWatcherService,
    private _ngZone: NgZone,
    private store: ChatStore,
    private route: ActivatedRoute,
    private http: HttpClient,
    private readonly toast: WebUiToastService,
  ) {
    // console.log('conversation loaded')
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Decorated methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Resize on 'input' and 'ngModelChange' events
   *
   * @private
   */
  @HostListener('input')
  @HostListener('ngModelChange')
  private _resizeMessageInput(): void {
    // This doesn't need to trigger Angular's change detection by itself
    this._ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        // Set the height to 'auto' so we can correctly read the scrollHeight
        this.messageInput.nativeElement.style.height = 'auto'

        // Detect the changes so the height is applied
        this._changeDetectorRef.detectChanges()

        // Get the scrollHeight and subtract the vertical padding
        this.messageInput.nativeElement.style.height = `${this.messageInput.nativeElement.scrollHeight}px`

        // Detect the changes one more time to apply the final height
        this._changeDetectorRef.detectChanges()
      })
    })
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // to check if we are inside the legal-case
    this.route.data.subscribe((data) => {
      // console.log('conversation route data', data)
      this.insideLegalCase = data?.insideLegalCase
    })

    // to load the room
    this.route.params.pipe(takeUntil(this._unsubscribeAll)).subscribe((params) => {
      // console.log('params', params)
      this.roomId = params['id']
      this.store.getRoom(this.roomId)
      this.messageInput?.nativeElement?.focus()
    })

    // to load the room once client gets ready
    // replacement of this is implemented inside syncClient method when state==='PREPARED' in chat.store
    // this.store.isClientReady$.pipe(takeUntil(this._unsubscribeAll)).subscribe((_) => {
    //   this.store.getRoom(this.roomId)
    // })

    this.store.newMessageIndicator$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((_) => {
        if(_ != undefined && this.conversationContainer.nativeElement.scrollTop < -40) {
        // console.log("indicator val changed", _)
        this.toast.success('New message')
      }
    })

    this.vm$.pipe(takeUntil(this._unsubscribeAll)).subscribe((vm) => {
      // console.log('userID', vm)
      this.myMatrixUserId = vm.myMatrixUserId
      // console.log('room data changed')
      this.room = vm.room
      if (this.room) {
        this.convertRoomData(this.room)
      }
      this._changeDetectorRef.markForCheck()
      this._changeDetectorRef.detectChanges()
    })

    // Subscribe to media changes
    this._fuseMediaWatcherService.onMediaChange$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(({ matchingAliases }) => {
        // Set the drawerMode if the given breakpoint is active
        if (matchingAliases.includes('lg')) {
          this.drawerMode = 'side'
        } else {
          this.drawerMode = 'over'
        }

        // Mark for check
        this._changeDetectorRef.markForCheck()
      })
  }

  ngAfterViewInit() {
    this.messageInput.nativeElement.focus()
  }

  convertRoomData(room) {
    this.roomType = room.currentState.events.get('m.room.topic')?.get('')?.event?.content?.topic ?? 'direct'
    this.typingMembers = Object.values(room.currentState.members)
      .filter((member: any) => {
        return member.typing === true && member.userId !== this.myMatrixUserId
      })
      .map((member: any) => member.name)
    // this.typingMembers.length && console.log('typing members', this.typingMembers, room.roomId)

    let filteredEvents = room.timeline.filter((event) => {
      return (event.event.type === 'm.room.message' || event.event.type === 'm.room.member') && event.error == null
    })

    let messages = []
    filteredEvents.forEach((event) => {
      if (event.event.type.trim() === 'm.room.message') {
        if(event.event.content.msgtype === 'm.text') {
          messages.push({
            message: event.event.content.body,
            createdAt: new Date(event.localTimestamp),
            type: event.event.content.msgtype,
            sender: event.sender,
            eventId: event.event.event_id,
            status: event.status
          })
        } else {
          let fileArray = event.event.content?.files?.map((file) => {
            return {
              file: file,
              createdAt: new Date(event.localTimestamp),
              type: event.event.content.msgtype,
              sender: event.sender,
              eventId: event.event.event_id,
              status: event.status
            }
          }) ?? []
          messages.push(...fileArray)
        }

      } else if(event.event.type === 'm.room.member' && this.roomType !== 'direct') {
        let message;
        if(event.event.content.membership === 'join') {
          message = event.sender.userId === this.myMatrixUserId ? 'You are added to the conversation' : event.event.content.displayname + ' is added to the conversation'
        } else if(event.event.content.membership === 'leave') {
          message = event.sender.userId === this.myMatrixUserId ? 'You have been removed from the conversation' : event.event.content.displayname + ' has been removed from the conversation'
        }
        messages.push({
          message: message,
          type: event.event.type,
          membership: event.event.content.membership,
          user: event.event.content.displayname,
          eventId: event.event.event_id,
          createdAt: new Date(event.localTimestamp),
          sender: event.sender,
          status: event.status
        })
      }
    })

    this.messages = messages
    let lastMessageEventId = this.messages?.at(-1)?.eventId || ''
    this.fullyReadConversation(lastMessageEventId)
    this.anotherUsers = Object.values(room.currentState.members).filter(
      (member: any) => member.userId !== this.myMatrixUserId,
    )
    // console.log('conversation messages', this.messages, this.isUserAtTheTop())
    this.messages.length < 15 && this.scrollHandler()
  }

  fullyReadConversation(lastMessageEventId) {
    if(lastMessageEventId !== this.lastMessageEventId) {
      this.lastMessageEventId = lastMessageEventId
      // const headers = { Authorization: `Bearer ${localStorage.getItem('chatAccessToken')}` }
      const headers = { Authorization: `Bearer ${localStorage.getItem('chatAccessToken')}` }
      this.http
        .post(
          `${environment.matrix_url}/_matrix/client/v3/rooms/${this.roomId}/read_markers `,
          {
            'm.read': lastMessageEventId,
            'm.read.private': lastMessageEventId,
          },
          { headers },
        )
        .subscribe((res) => {
          // console.log('read_marker', res)
        })
    }
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
   * Open the group info
   */
  openGroupInfo(): void {
    // // console.log("openGroupInfo")
    // Open the drawer
    this.drawerOpened = true

    // Mark for check
    this._changeDetectorRef.markForCheck()
  }

  /**
   * Reset the chat
   */
  resetChat(): void {
    this._chatService.resetChat()

    // Close the group info in case it's opened
    this.drawerOpened = false

    // Mark for check
    this._changeDetectorRef.markForCheck()
  }

  /**
   * Toggle mute notifications
   */
  toggleMuteNotifications(): void {
    // Toggle the muted
    this.chat.muted = !this.chat.muted

    // Update the chat on the server
    this._chatService.updateChat(this.chat.id, this.chat).subscribe()
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

  fChanged(files) {
    // console.log('fChanged', files)
    this.selectedFiles$.next([...this.selectedFiles$.getValue(), ...files])
    this._resizeMessageInput()
  }

  getAbbrName(s: string) {
    const maxLength = 30 //30 Characters + ... returned
    if (!s) return ''
    return s.length > 30 ? s.slice(0, 30) + '...' : s
  }

  fileDeleted(file, index) {
    let data = this.selectedFiles$.getValue()
    data.splice(index, 1)
    this.selectedFiles$.next(data)
    this._resizeMessageInput()
    // // console.log(typeof data )
  }

  openDocument(file: any) {
    this.store
      .getFileBuffer(file)
      .then((file) => {
        console.log('openDocument', file)
        this.filePreviewComponent?.document.next(file)
      })
      .catch((error) => {
        console.log('error while downloading', error)
      })
  }

  trim(onlyLeft = false) {
    this.messageInputValue = onlyLeft ? this.messageInputValue.trimStart() : this.messageInputValue.trim()
    this._resizeMessageInput()
  }

  sendMessage(event) {
    event.preventDefault()
    if (this.selectedFiles$.getValue().length > 0) {
      this.store.convertFileToUrl(this.roomId, this.selectedFiles$.getValue())
      this.selectedFiles$.next([])
    } else if (this.messageInputValue.trim().length > 0) {
      let type = 'm.text'
      let urlRegex = /^(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])$/
      if (urlRegex.test(this.messageInputValue.trim())) {
        type = 'm.link'
      }
      this.store.sendMessage(this.roomId, this.messageInputValue.trim(), type)
      this.messageInputValue = ''
    }
    this.conversationContainer.nativeElement.scrollTop = 0
    this._resizeMessageInput()
    this.messageInput.nativeElement.focus()
  }

  onFocus() {
    // this.sendTyping(true)
  }

  onBlur() {
    this.trim()
    // this.sendTyping(false)
  }

  onKeyDown(event: KeyboardEvent) {
    console.log("keydown", event)
    if(event.key !== 'Enter') {
      if(this.typingIndicator.value === false) {
        this.typingIndicator.value = true
        this.typingIndicator.typingStartTime = moment(new Date())
        this.sendTyping(true)
      } else {
        let diffInSeconds = moment.duration(moment(new Date()).diff(this.typingIndicator.typingStartTime)).asSeconds()
        console.log("diffInSeconds", diffInSeconds)
        if(diffInSeconds > 15) {
          this.typingIndicator.value = true
          this.typingIndicator.typingStartTime = moment(new Date())
          this.sendTyping(true)
        }
      }
      this.debounce(() => {
        if(this.typingIndicator.value) {
          console.log("debounced fun ran")
          this.typingIndicator.value = false
          this.typingIndicator.typingStartTime = undefined
          this.sendTyping(false)
        }
      })()
    }
  }

  debounce(callback) {
    return (...args) => {
      clearTimeout(this.typingIndicator.timer)
      this.typingIndicator.timer = setTimeout(() => {
          callback.apply(this, args)
      }, 3000)
    }
  }

  sendTyping(isTyping: boolean) {
    this.store.sendTyping(this.roomId, isTyping)
    // const headers = { Authorization: 'Bearer syt_cGNo_ZQCYDCajaeNbVxiMPXCc_41EXS1' }
    // this.http
    // .put(
    //     `https://matrix-uat.caseclinical.com/_matrix/client/v3/rooms/!vnoLTvTQaTCHDPoLxH:caseclinical.com/typing/@pch:caseclinical.com`,
    //     {
    //         "timeout": 30000,
    //         "typing": isTyping
    //     },
    //     { headers },
    // )
    // .subscribe((res) => {
    //     // console.log('typing', res)
    // })
  }

  scrollHandler() {
    setTimeout(() => {
      if (this.room.oldState.paginationToken && this.isUserAtTheTop()) {
        this.scrollback()
      }
    }, 1000)
  }

  isUserAtTheTop() {
    // we have taken col reverse css class that's why we will count all positions in negative
    const threshold = 20
    const position =
      this.conversationContainer.nativeElement.scrollTop - this.conversationContainer.nativeElement.offsetHeight
    const height = -1 * this.conversationContainer.nativeElement.scrollHeight
    return position < height + threshold
  }

  scrollback() {
    let scrollTop = this.conversationContainer.nativeElement.scrollTop
    this.store.scrollback(this.room, 50).then((isSuccessful) => {
      if (isSuccessful) {
        this.conversationContainer.nativeElement.scrollTop = scrollTop
        this._changeDetectorRef.markForCheck()
        this._changeDetectorRef.detectChanges()
      }
    })
  }
}
