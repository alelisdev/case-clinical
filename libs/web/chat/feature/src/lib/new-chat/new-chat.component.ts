import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core'
import { MatDrawer } from '@angular/material/sidenav'
import { User } from '@case-clinical/web/core/data-access'
import { Subject, takeUntil } from 'rxjs'
import { ChatService } from '../chat.service'
import { ChatStore } from '../chat.store'
import { Contact } from '../chat.types'

@Component({
  selector: 'chat-new-chat',
  templateUrl: './new-chat.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewChatComponent implements OnInit, OnDestroy {
  readonly vm$ = this.store.vm$
  @Input() drawer: MatDrawer
  myUserId: string;
  users: User[] = []
  private _unsubscribeAll: Subject<any> = new Subject<any>()

  /**
   * Constructor
   */
  constructor(private _chatService: ChatService, private store: ChatStore) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Contacts
    // this._chatService.contacts$
    //     .pipe(takeUntil(this._unsubscribeAll))
    //     .subscribe((contacts: Contact[]) => {
    //         this.contacts = contacts;
    //     });
    
    this.store.me$.subscribe((me) => {
      this.myUserId = me?.id
    })

    this.store
      .filterUsers()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((users) => {
        // console.log('users', users)
        this.users = users.filter((user) => user.userId !== this.myUserId)
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
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index: number, item: any): any {
    return item.id || index
  }

  createRoom(matrixUserId) {
    this.store.createRoom([matrixUserId]).subscribe((res) => {
      // console.log('create----------------', res)
      if (res.room_id) {
        this.drawer.close()
      }
    })
    // .then((res) => {
    //   // console.log('res create room', res)
    //   this.drawer.close()
    // })
    // .catch((err) => {
    //   // console.log('err create room', err)
    // })
  }
}
