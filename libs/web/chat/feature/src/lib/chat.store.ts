import { HttpClient, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { Contact, User, WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { environment } from '@case-clinical/web/core/feature'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { BehaviorSubject, map, Subject, take, takeUntil } from 'rxjs'
declare const matrixcs: any
export interface ChatState {
  errors?: any
  loading?: boolean
  loadingRooms?: boolean
  joiningRooms?: boolean
  loadingRoom?: boolean
  syncing?: boolean
  contacts?: Contact[]
  me?: User
  users?: User[]
  searchTerm?: string
  rooms?: any[]
  room?: any
  messages?: any[]
  isClientReady?: boolean
  isClientLoading?: boolean
  activeRoomId?: string
  chatAccessToken?: string
  myMatrixUserId?: string
  insideLegalCase?: boolean
  newMessageIndicator?: boolean
}
@Injectable({
  providedIn: 'root'
})
export class ChatStore extends ComponentStore<ChatState> {
  private client: any
  private myUserId: string
  private myMatrixUserId: string
  private isEventSubscribed: boolean
  private retryCount: number
  private retry401Count: number
  private insideLegalCase = false
  private readonly MATRIX_CHAT_URL = environment?.matrix_chat_url
  private readonly MATRIX_URL = environment?.matrix_url
  constructor(
    private readonly toast: WebUiToastService,
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly http: HttpClient,
  ) {
    super({
      loading: false,
      isClientReady: false,
      isClientLoading: true,
      loadingRooms: true,
      loadingRoom: true,
      // newMessageIndicator: true
    })
    // this.me().subscribe()
    this.isEventSubscribed = false
    this.retryCount = 0
    this.retry401Count = 0
  }
  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly loadingRooms$ = this.select((s) => s.loadingRooms)
  readonly joiningRooms$ = this.select((s) => s.joiningRooms)
  readonly loadingRoom$ = this.select((s) => s.loadingRoom)
  readonly syncing$ = this.select((s) => s.syncing)
  readonly contacts$ = this.select((s) => s.contacts || [])
  readonly me$ = this.select((s) => s.me)
  readonly users$ = this.select((s) => s.users || [])
  readonly room$ = this.select((s) => s.room)
  readonly rooms$ = this.select((s) => s.rooms || [])
  readonly messages$ = this.select((s) => s.messages || [])
  readonly isClientReady$ = this.select((s) => s.isClientReady)
  readonly activeRoomId$ = this.select((s) => s.activeRoomId)
  readonly chatAccessToken$ = this.select((s) => s.chatAccessToken)
  readonly myMatrixUserId$ = this.select((s) => s.myMatrixUserId)
  readonly newMessageIndicator$ = this.select((s) => s.newMessageIndicator)
  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.loadingRooms$,
    this.loadingRoom$,
    this.syncing$,
    this.contacts$,
    this.me$,
    this.users$,
    this.room$,
    this.rooms$,
    this.messages$,
    this.isClientReady$,
    this.activeRoomId$,
    this.chatAccessToken$,
    this.myMatrixUserId$,
    (
      errors,
      loading,
      loadingRooms,
      loadingRoom,
      syncing,
      contacts,
      me,
      users,
      room,
      rooms,
      messages,
      isClientReady,
      activeRoomId,
      chatAccessToken,
      myMatrixUserId,
    ) => ({
      errors,
      loading,
      loadingRooms,
      loadingRoom,
      syncing,
      contacts,
      me,
      users,
      room,
      rooms,
      messages,
      isClientReady,
      activeRoomId,
      chatAccessToken,
      myMatrixUserId,
    }),
    { debounce: true },
  )

  setInsideLegalCase = (insideLegalCase: boolean) => {
    this.insideLegalCase = insideLegalCase
    this.patchState({ insideLegalCase })
  }

  readonly matrixLogin = () => {
    this.patchState({ loading: true })
    return this.data.userChatLogin().pipe(
      tapResponse(
        (res: any) => {
          console.log("chat success", res)
          if (res.data.item == null) {
            let urlArray = this.router.url.split('/')
            if(urlArray.at(-1) === 'chat' || urlArray.at(-2) === 'chat') {
              this.toast.error("You don't have permission to access this feature. Please contact Admin 1")
              this.router.navigate(['dashboards', 'project'])
            }
            this.patchState({ isClientLoading: false })
            return
          }
          localStorage.setItem('chatAccessToken', res.data.item.access_token)
          localStorage.setItem('chatRefreshToken', res.data.item.refresh_token)
          this.myMatrixUserId = res.data.item.user_id
          this.patchState({ myMatrixUserId: res.data.item.user_id })
          this.startClient()
        },
        (errors: any) => {
          console.log("chat error", errors)
          let urlArray = this.router.url.split('/')
          if(urlArray.at(-1) === 'chat' || urlArray.at(-2) === 'chat') {
            this.toast.error("You don't have permission to access this feature. Please contact Admin 2")
            this.router.navigate(['dashboards', 'project'])
          }
          this.patchState({
            errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
            loading: false,
            isClientLoading: false
          })
        },
      ),
      map((result) => {
        return result.data.items
      }),
    )
  }
  readonly filterContacts = (term) =>
    this.data.userContacts({ input: { name: term, limit: 1000 } }).pipe(
      tapResponse(
        (res: any) => {
          let contacts = res.data.items
          this.patchState({ contacts })
          return contacts
        },
        (errors: any) =>
          this.patchState({
            errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
          }),
      ),
      map((result) => {
        return result.data.items
      }),
    )
  readonly filterUsers = () =>
    this.data.userChatList().pipe(
      tapResponse(
        (res: any) => {
          let users = res.data.items.filter((user) => {
            let firstName = user.user.firstName ? `${user.user.firstName} ` : ''
            let lastName = user.user.lastName ?? ''
            user.user.name = firstName + lastName
            return user.userId !== this.myUserId
          })
          this.patchState({ users })
          return users
        },
        (errors: any) =>
          this.patchState({
            errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
          }),
      ),
      map((result) => {
        return result.data.items
      }),
    )
  readonly me = () =>
    this.data.me().pipe(
      tapResponse(
        (res: any) => {
          let me = res.data.me
          let firstName = me.firstName ? `${me.firstName} ` : ''
          let lastName = me.lastName ?? ''
          me.name = firstName + lastName
          // me.name = me.firstName + ' ' + me.lastName
          this.myUserId = me.id
          this.patchState({ me })
          return me
        },
        (errors: any) =>
          this.patchState({
            errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
          }),
      ),
      map((result) => {
        return result.data.me
      }),
    )

  startClient = () => {
    this.patchState({ syncing: true, isClientLoading: true })
    // console.log('-------------------', this.MATRIX_URL)
    this.client = matrixcs.createClient({
      baseUrl: this.MATRIX_URL,
      // accessToken: 'syt_Y2xkMXI1Y3dlMDAwMGcxajdnZGYyb3d6Mg_sENHALXtmRRuvQdcWguF_04WCSw',
      accessToken: localStorage.getItem('chatAccessToken'),
      userId: this.myMatrixUserId,
    })
    this.client.startClient()
    this.syncClient()
  }

  syncClient = () => {
    // console.log('inside sync')
    this.client.on('sync', (state: any, prevState: any, res: any) => {
      // console.log(2, state, prevState, res) // state will be 'PREPARED' when the client is ready to use
      if (state === 'PREPARED') {
        this.retryCount = 0
        // if (!this.isEventSubscribed) {
        // this.isEventSubscribed = true
        this.subscibeToEvents()
        this.patchState({ isClientLoading: false, isClientReady: true, loading: false, syncing: false })
        this.getRooms()
        this.get((s) => s.activeRoomId) && this.getRoom(this.get((s) => s.activeRoomId))
        // }
      } else if (state === 'ERROR' && prevState !== null) {
        this.patchState({ loading: false, isClientLoading: false, loadingRoom: false, loadingRooms: false, syncing: false })
        this.retryCount += 1
        // this.isEventSubscribed = false
        if (this.retryCount < 6) {
          if (res.error.errcode === 'M_UNKNOWN_TOKEN' && res.error.httpStatus === 401) {
            this.handle401(null, null)
              .then((res) => {
                // console.log(111, res)
                this.startClient()
              })
              .catch((err) => {
                // console.log(444, err)
              })
          } else if(this.router.url.split('/').at(-1) === 'chat' || this.router.url.split('/').at(-2) === 'chat') {
            this.toast.error('Some error has occured. Please try again')
            this.router.navigate(['dashboards', 'project'])
          }
        } else if(this.router.url.split('/').at(-1) === 'chat' || this.router.url.split('/').at(-2) === 'chat') {
          this.toast.error('Some error has occured. Please try again after some time')
          this.router.navigate(['dashboards', 'project'])
        }
      }
    })
  }
  subscibeToEvents = () => {
    this.client.on('event', (event: any) => {
      // console.log(event.getType())
      // console.log(event)
      if (!event.getType().includes('m.presence')) {
        if(!this.get((s) => s.joiningRooms)) {
          this.getRooms()
        }
        this.getRoom(this.get((s) => s.activeRoomId))
        if(
          event.getType() === 'm.room.message' &&
          event.event.room_id === this.get((s) => s.activeRoomId) &&
          event.event.sender !== this.get((s) => s.myMatrixUserId)
        ) {
          // console.log("toast fired")
          this.patchState({ newMessageIndicator: !this.get((s) => s.newMessageIndicator) })
        }
      }
    })
    this.client.on('Room', (event: any) => {
      // console.log(event.getType())
      // console.log(event)
    })
  }
  createRoom = (users: Array<string>) => {
    this.patchState({ loadingRooms: true })
    let input = {
      fromId: this.myMatrixUserId,
      toId: users[0],
      access_token: localStorage.getItem('chatAccessToken'),
      refresh_token: localStorage.getItem('chatRefreshToken'),
    }
    return this.data.createChatRoom({ input }).pipe(
      tapResponse(
        (res: any) => {
          let item = res.data.item
          if (item.room_id) {
            if (item.access_token && item.refresh_token) {
              this.setTokens(item.access_token, item.refresh_token)
            }
            let urlArray = this.router.url.split('/')
            urlArray.at(-1) === 'chat'
              ? this.router.navigate([...urlArray, item.room_id])
              : this.router.navigate([...urlArray.slice(0, -1), item.room_id])
          } else {
            this.toast.error('Error while creating new room')
          }

          this.patchState({ loadingRooms: false })
        },
        (errors: any) =>
          this.patchState({
            errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
            loadingRooms: false,
          }),
      ),
      map((result) => {
        return result.data.item
      }),
    )
  }
  getRooms = () => {
    if(this.get((s) => !s.isClientLoading)) {
      if(this.get((s) => !s.isClientReady)) {
        this.toast.error("You don't have permission to access this feature. Please contact Admin")
        this.router.navigate(['dashboards', 'project'])
        return
      } else {
        this.patchState({ loadingRooms: true, joiningRooms: true })
        let rooms = this.client.getRooms()
        // console.log('rooms', rooms)

        // rooms in which current user has been invited but not yet joined
        let invitedRooms = rooms.filter((room: any) => {
          return room.selfMembership === 'invite'
        })

        let promises = []
        invitedRooms.forEach((room) => {
          promises.push(this.joinRoom(room.roomId))
        })

        Promise.allSettled(promises).then((_) => {
          let wantedRooms = rooms.map((room) => {
            // room.timeline = room.timeline.reverse()
            // // console.log("new timeline", room.name, room.timeline)
            let lastMessageEvent = room.timeline.findLast(
              (event) => (event.event.type === 'm.room.message' || (event.event.type === 'm.room.member' && event.event.sender === this.get((s) => s.myMatrixUserId))) && event.status === null 
            )
            let lastMessage
            if (lastMessageEvent?.event.type === 'm.room.message') {
              if(lastMessageEvent.event.content.msgtype === 'm.text') {
                lastMessage = lastMessageEvent?.event.content.body
              } else {
                lastMessage = 'File'
              }
            } else {
              lastMessage = ''
            }

            let roomType = room.currentState.events.get('m.room.topic')?.get('')?.event?.content?.topic

            let typingMembers = Object.values(room.currentState.members)
              .filter((member: any) => {
                return member.typing === true && member.userId !== this.get((s) => s.myMatrixUserId)
              })
              .map((member: any) => member.name)
            typingMembers.length && console.log('typing members', typingMembers, room.roomId)
            // // console.log("lastMessageEvev", room.name, lastMessageEvent)
            // let anotherUsers: any[] = Object.values(room.currentState.members).filter(
            //   (member: any) => member.userId !== this.myMatrixUserId,
            // )
            // // console.log("another Users", anotherUsers)
            return {
              // name: anotherUsers?.length === 1 ? anotherUsers[0]?.name : room?.name,
              name: room.name,
              lastMessage: lastMessage,
              lastMessageAt: lastMessage ? new Date(lastMessageEvent?.localTimestamp) : null,
              lastMessageTimeStamp: lastMessageEvent?.localTimestamp ?? -1,
              roomId: room.roomId,
              unreadMessagesCount: room.notificationCounts.total,
              lastEventId: lastMessageEvent?.event.event_id,
              roomType: roomType ?? 'direct',
              typingMembers: typingMembers,
            }
          })
          // console.log('typing members', typingMembers)
          wantedRooms.sort((a, b) => b.lastMessageTimeStamp - a.lastMessageTimeStamp)
          // // console.log("wantedRooms", wantedRooms)
          this.patchState({ rooms: wantedRooms, loadingRooms: false, joiningRooms: false })
          // this.roomId && this.getRoom(this.roomId)
        })
      }
    }
  }
  getRoom = (roomId: string) => {
    // console.log("roomId", roomId)
    this.patchState({ loadingRoom: true, activeRoomId: roomId })
    let room = this.client?.getRoom(roomId)
    console.log('room', room, roomId)
    if(room === null && roomId) {
      if(this.insideLegalCase) {
        this.patchState({ room: room, loadingRoom: false })
        this.toast.error("You don't have permission to access this feature. Please contact Admin")
        return this.router.navigate([...this.router.url.split('/').slice(0, -2), 'overview'])
      }
      this.patchState({ room: room, loadingRoom: false })
      this.toast.error('You are not part of this conversation anymore')
      return this.router.navigate([...this.router.url.split('/').slice(0, -1)])
    }
    room && this.patchState({ room: room, loadingRoom: false })
  }
  joinRoom = (roomId: string) => {
    // return new Promise((resolve, reject) => {
    // this.patchState({ loadingRooms: true })
    let input = {
      roomId: roomId,
      access_token: localStorage.getItem('chatAccessToken'),
      refresh_token: localStorage.getItem('chatRefreshToken'),
    }
    return new Promise((resolve, reject) => {
      this.data.joinChatRoom({ input }).pipe(
          take(1),
          tapResponse(
            (res: any) => {
              // console.log('JOIN_ROOM_RES', res)
              let item = res.data.item
              if (item.room_id) {
                if (item.access_token && item.refresh_token) {
                  this.setTokens(item.access_token, item.refresh_token)
                }
                resolve(item)
              } else {
                this.toast.error('Error while joining new room')
                reject(item)
              }
              // this.patchState({ loadingRooms: false })
            },
            (errors: any) => {
              // console.log('JOIN_ROOM_ERR', errors)
              reject(errors)
              this.patchState({
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
                // loadingRooms: false,
              })
            },
        )
      ).subscribe()
    })
    // })
  }
  sendMessage = (roomId: string, message: string, type: string = 'm.text') => {
    var content = {
      body: message,
      msgtype: type,
    }
    this.client
      .sendEvent(roomId, 'm.room.message', content, '')
      .then((res: any) => {
        // message sent successfully
        // console.log('res', res)
        // this.getRoom(roomId)
      })
      .catch((err: any) => {
        // console.log(err)
        if (err.errcode === 'M_UNKNOWN_TOKEN' && err.error === 'Access token has expired') {
          // this.handle401(null, null).then((_) => {
          // })
          // this.sendMessage(roomId, message)
        } else if (err.errcode === 'M_TOO_LARGE') {
          this.toast.error('Message is too large')
        }
      })
  }
  convertFileToUrl = (roomId: string, files: Array<Object>) => {
    this.http
      .post(`${this.MATRIX_CHAT_URL}/v1/room/media/upload`, {
        files,
        token: localStorage.getItem('chatAccessToken'),
      })
      .subscribe({
        next: (response: HttpResponse<any>) => {
          // console.log('file uploaded', response)
          response?.body?.length 
            ? this.sendFiles(roomId, response.body) 
            : this.toast.error('Error while uploading file')
        },
        error: (err: Error) => {
          // console.log('error while uploading file', err)
          this.toast.error('Error while uploading file')
        },
      })
  }
  sendFiles = (roomId: string, files: Array<Object>) => {
    let content = {
      body: 'File',
      files: files,
      msgtype: 'm.file',
    }
    this.client
      .sendEvent(roomId, 'm.room.message', content, '')
      .then((res: any) => {
        // message sent successfully
        // console.log('file res', res)
        // this.getRoom(roomId)
      })
      .catch((err: any) => {
        // console.log('file err', err)
        if (err.errcode === 'M_UNKNOWN_TOKEN' && err.error === 'Access token has expired') {
          // this.handle401(null, null).then((_) => {
          // })
          // this.sendMessage(roomId, message)
        } else if (err.errcode === 'M_TOO_LARGE') {
          this.toast.error('File is too large')
        }
      })
  }
  getFileBuffer = (file: any) => {
    return new Promise((resolve, reject) => {
      let serverName = file.url.split('//')[1].split('/')[0]
      let mediaId = file.url.split('//')[1].split('/')[1]
      this.http
        .post(`${this.MATRIX_CHAT_URL}/v1/room/media/download`, {
          token: localStorage.getItem('chatAccessToken'),
          serverName,
          mediaId,
        })
        .subscribe((response: HttpResponse<any>) => {
          // console.log('file downloaded', response.body.body)
          if (response.body.status === 200) {
            file.attachment = response.body.body
            resolve(file)
          } else {
            reject(response.body)
            this.toast.error('Error while downloading file')
          }
          // this.sendFiles(roomId, response.body)
        })
    })
  }
  sendTyping = (roomId: string, isTyping: boolean) => {
    this.client
      .sendTyping(roomId, isTyping, null)
      .then((res: any) => {
        // console.log('typing', res)
      })
      .catch((err: any) => {
        console.log('typing error', err)
      })
  }
  
  scrollback = async (room: any, limit: number) => {
    this.patchState({ loadingRoom: true })
    return this.client
      .scrollback(room, limit)
      .then((res: any) => {
        // console.log('scrollback', res)
        this.patchState({ loadingRoom: false, room: res })
        return true
      })
      .catch((err: any) => {
        // console.log('scrollback err', err)
        return false
      })
  }

  handle401(req: HttpRequest<any>, next: HttpHandler) {
    const destroy$ = new Subject()
    // console.log('handle401')
    return new Promise((resolve, reject) => {
      this.http
        .post(`${this.MATRIX_CHAT_URL}/v1/refresh`, {
          refreshToken: localStorage.getItem('chatRefreshToken'),
        })
        .pipe(takeUntil(destroy$))
        .subscribe({
          next: (res: any) => {
            // console.log('>>', res)
            if (res.status === 401) {
              if (this.retry401Count < 6) {
                this.retry401Count += 1
                this.handle401(null, null)
              } else {
                this.removeAccessToken()
                reject(res)
                this.toast.error('Some Problem has occured. Please try again after some time')
                this.router.navigate(['dashboards', 'project'])
              }
            } else {
              this.retry401Count = 0
              const chatAccessToken = res.body.access_token
              const chatRefreshToken = res.body.refresh_token
              // console.log('>>', chatAccessToken, chatRefreshToken)
              this.setTokens(chatAccessToken, chatRefreshToken)

              // console.log('---------------start----------------------')
              if (req && next) {
                let _req = req.clone({
                  headers: req.headers.set('Authorization', `Bearer ${chatAccessToken}`),
                })
                next.handle(_req).subscribe()
                // console.log('----------------end---------------------')
              }
              destroy$.next(null)
              destroy$.complete()
              resolve(res)
            }
          },
          error: (err) => {
            if (this.retry401Count < 6) {
              this.retry401Count += 1
              this.handle401(null, null)
            } else {
              this.removeAccessToken()
              reject(err)
              this.toast.error('Some Problem has occured. Please try again after some time')
              this.router.navigate(['dashboards', 'project'])
            }
          },
        })
    })
  }
  removeAccessToken() {
    localStorage.removeItem('chatAccessToken')
  }
  setTokens(access: string, refresh: string) {
    localStorage.setItem('chatAccessToken', access)
    localStorage.setItem('chatRefreshToken', refresh)
    // console.log('Token set')
  }
  stopClient() {
    this.isEventSubscribed = false
    this.retryCount = 0
    this.retry401Count = 0
    this.client?.stopClient()
  }
}
