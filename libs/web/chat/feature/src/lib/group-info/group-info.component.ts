import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ChatStore } from '../chat.store';
import { Chat } from '../chat.types';

@Component({
    selector       : 'chat-group-info',
    templateUrl    : './group-info.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupInfoComponent
{
    @Input() room: any;
    @Input() drawer: MatDrawer;

    myUserId: string;
    myMatrixUserId: string;
    joinedMembers: Array<any> = []
    invitedMembers: Array<any> = []
    private _unsubscribeAll: Subject<any> = new Subject<any>()

    readonly vm$ = this.store.vm$

    /**
     * Constructor
     */
    constructor(private store: ChatStore, private route: ActivatedRoute)
    {
        this.route.params
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((id) => {
                this.drawer?.close()
            })

        this.store.myMatrixUserId$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((id) => {
                this.myMatrixUserId = id
            })
    }

    ngDoCheck() {
        // console.log("groupInfooooooo", {...this.room})
        if(this.room?.currentState?.members) {
            let joinedMembers = Object.values(this.room.currentState.members).filter((member: any) => member.userId !== this.myMatrixUserId && member.membership === 'join')
            joinedMembers.sort((a: any, b: any) => {
                let fa = a.name.toLowerCase()
                let fb = b.name.toLowerCase()
                if(fa < fb) {
                    return -1
                }
                if(fa > fb) {
                    return 1
                }
                return 0
            })
            joinedMembers.unshift({ userId: this.myMatrixUserId, name: 'You' })
            this.joinedMembers = joinedMembers

            let invitedMembers = Object.values(this.room.currentState.members).filter((member: any) => member.userId !== this.myMatrixUserId && member.membership === 'invite')
            invitedMembers.sort((a: any, b: any) => {
                let fa = a.name.toLowerCase()
                let fb = b.name.toLowerCase()
                if(fa < fb) {
                    return -1
                }
                if(fa > fb) {
                    return 1
                }
                return 0
            })
            this.invitedMembers = invitedMembers
        }
    }
}
