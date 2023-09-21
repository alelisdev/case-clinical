import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Subject, takeUntil } from 'rxjs'
import { ChatStore } from './chat.store'

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  // providers: [ChatStore],
})
export class ChatComponent {
  readonly vm$ = this.store.vm$
  private _unsubscribeAll: Subject<any> = new Subject<any>()
  /**
   * Constructor
   */
  constructor(private store: ChatStore, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((params) => {
        // console.log("params", params)
        if(params['legalCaseId']) {
          this.store.setInsideLegalCase(true)
        } else {
          this.store.setInsideLegalCase(false)
        }
      })
    // this.store.matrixLogin().subscribe()
    // this.store.startClient()
  }

  ngOnDestroy() {
    this._unsubscribeAll.next(null)
    this._unsubscribeAll.complete()
    // this.store.stopClient()
  }
}
