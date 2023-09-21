import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Subject, takeUntil } from 'rxjs';
import * as moment from 'moment';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Board, Card } from 'libs/web/modules/admin/apps/scrumboard/scrumboard.models';
import { BoardDetailsStore } from './board.details.store';
import { BoardList } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ScrumboardCardDetailsComponent } from '../card/details/details.component';

@Component({
  selector: 'scrumboard-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    BoardDetailsStore,
  ]
})
export class ScrumboardBoardComponent implements OnInit, OnDestroy {
  @ViewChild('dlg') dlgTpl!: TemplateRef<any>;

  private readonly _maxListCount: number = 200;
  private readonly _positionStep: number = 65536;
  private readonly _maxPosition: number = this._positionStep * 500;

  board$ = this.store.board$;
  listTitleForm: FormGroup;
  ref;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _formBuilder: FormBuilder,
    public store: BoardDetailsStore,

    private dialog: MatDialog,
    private _fuseConfirmationService: FuseConfirmationService,
  ) {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Initialize the list title form
    this.listTitleForm = this._formBuilder.group({
      title: ['']
    });

  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Focus on the given element to start editing the list title
   *
   * @param listTitleInput
   */
  renameList(listTitleInput: HTMLElement): void {
    // Use timeout so it can wait for menu to close
    setTimeout(() => {
      listTitleInput.focus();
    });
  }

  /**
   * Add new list
   *
   * @param title
   */
  addList(title: string): void {
    this.store.addListEffect(title);
  }

  /**
   * Update the list title
   *
   * @param event
   * @param list
   */
  updateListTitle(event: any, list: BoardList): void {
    // Get the target element
    const element: HTMLInputElement = event.target;

    // Get the new title
    const newTitle = element.value;

    // If the title is empty...
    if (!newTitle || newTitle.trim() === '') {
      // Reset to original title and return
      element.value = list.title;
      return;
    }

    if(list.title !== newTitle.trim())
      this.store.renameBoardListEffect({ listId: list.id, title: newTitle.trim() })
  }

  /**
   * Delete the list
   *
   * @param id
   */
  deleteList(id): void {
    // Open the confirmation dialog
    const confirmation = this._fuseConfirmationService.open({
      title: 'Delete list',
      message: 'Are you sure you want to delete this list and its cards? This action cannot be undone!',
      actions: {
        confirm: {
          label: 'Delete'
        }
      }
    });

    // Subscribe to the confirmation dialog closed action
    confirmation.afterClosed().subscribe((result) => {

      // If the confirm button pressed...
      if (result === 'confirmed') {
        this.store.deleteBoardListEffect(id);
      }
    });
  }

  /**
   * Add new card
   */
  addCard(list: BoardList, title: string): void {
    // Create a new card model
    const card = {
      boardListId: list.id,
      title: title
    };
    // Save the card
    this.store.addCardEffect(card);
  }

  /**
   * List dropped
   *
   * @param event
   */
  listDropped(event: CdkDragDrop<BoardList[]>): void {
    // Move the item
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

    // Calculate the positions
    const updated = this._calculatePositions(event);
    console.log(updated);
    if(updated?.length > 0) {
      const { id, position } = updated[0];
      this.store.changeListPositionEffect({ boardListId: id, position });
    }
  }

  /**
   * Card dropped
   *
   * @param event
   */
  cardDropped(event: CdkDragDrop<Card[]>): void {
    // Move or transfer the item
    if (event.previousContainer === event.container) {
      // Move the item
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      const updated = this._calculatePositions(event);
      const {boardListId} = updated[0]
      const boardList = [event.container.data[event.previousIndex], event.container.data[event.currentIndex]];
      console.log("data: ", event)
      for(const item of boardList){
        //console.log(item)
        const { id, title, description, position, dueDate} = item
        this.store.updateCardEffect({id, title, description ,boardListId, position, dueDate})
      }
      //console.log("Moved in one container: ", updated)
    }
    else {
      // Transfer the item
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      // Update the card's list it
      //const updated = this._calculatePositions(event);
      //const {boardListId} = event.previousContainer.data
      
      event.container.data[event.currentIndex].listId = event.container.id;
      const boardListId =  event.container.id;
      const { id, title, description, position, dueDate} = event.container.data[event.currentIndex]
      this.store.updateCardEffect({id, title, description ,boardListId, position, dueDate})
      console.log("Moved in other container", event)
    }

    // Calculate the positions
    const updated = this._calculatePositions(event);

    // Update the cards
    // this._scrumboardService.updateCards(updated).subscribe();
  }

  /**
   * Check if the given ISO_8601 date string is overdue
   *
   * @param date
   */
  isOverdue(date: string): boolean {
    return moment(date, moment.ISO_8601).isBefore(moment(), 'days');
  }

  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Calculate and set item positions
   * from given CdkDragDrop event
   *
   * @param event
   * @private
   */
  private _calculatePositions(event: CdkDragDrop<any[]>): any[] {
    // Get the items
    let items = event.container.data;
    const currentItem = items[event.currentIndex];
    const prevItem = items[event.currentIndex - 1] || null;
    const nextItem = items[event.currentIndex + 1] || null;

    // If the item moved to the top...
    if (!prevItem) {
      // If the item moved to an empty container
      if (!nextItem) {
        currentItem.position = this._positionStep;
      }
      else {
        currentItem.position = nextItem.position / 2;
      }
    }
    // If the item moved to the bottom...
    else if (!nextItem) {
      currentItem.position = prevItem.position + this._positionStep;
    }
    // If the item moved in between other items...
    else {
      currentItem.position = (prevItem.position + nextItem.position) / 2;
    }

    // Check if all item positions need to be updated
    if (!Number.isInteger(currentItem.position) || currentItem.position >= this._maxPosition) {
      // Re-calculate all orders
      items = items.map((value, index) => {
        value.position = (index + 1) * this._positionStep;
        return value;
      });

      // Return items
      return items;
    }

    // Return currentItem
    return [currentItem];
  }

  open(): void {
    this.ref = this.dialog.open(this.dlgTpl)
  }
}
