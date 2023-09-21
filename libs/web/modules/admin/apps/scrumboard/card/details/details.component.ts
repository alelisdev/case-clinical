import { ChangeDetectionStrategy, Output, EventEmitter, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { debounceTime, Subject, takeUntil, tap } from 'rxjs';
import * as moment from 'moment';
import { assign } from 'lodash-es';
import { Board, BoardLabel, BoardCard } from '@case-clinical/web/core/data-access';
import { BoardDetailsStore } from '../../board/board.details.store';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'scrumboard-card-details',
  templateUrl: './details.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScrumboardCardDetailsComponent implements OnInit, OnDestroy {
  @ViewChild('labelInput') labelInput: ElementRef<HTMLInputElement>;

  board: Board;
  card: BoardCard;
  cardForm: FormGroup;
  labels: BoardLabel[];
  filteredLabels: BoardLabel[];

  // Private
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _formBuilder: FormBuilder,
    private store: BoardDetailsStore,
    public matDialogRef: MatDialogRef<ScrumboardCardDetailsComponent>,
  ) {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Get the board
    this.store.board$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((board) => {

        // Board data
        this.board = board;

        // Get the labels
        this.labels = this.filteredLabels = board.labels;
      });

    // Prepare the card form
    this.cardForm = this._formBuilder.group({
      id: [''],
      title: ['', Validators.required],
      description: [''],
      boardListId: [''],
      position: [''],
      dueDate: [null]
    });

    // Update card when there is a value change on the card form
    this.cardForm.valueChanges
      .pipe(
        tap((value) => {
          // Update the card object
          this.card = assign(this.card, value);
        }),
        debounceTime(300),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((value) => {

        // Update the card on the server
        // this._scrumboardService.updateCard(value.id, value).subscribe();
        console.log("Updated Server, ", value)
        // Mark for check
        this._changeDetectorRef.markForCheck();
      });

    // Get the card details
    this.store.selectedCard$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((card) => {
        this.card = card;

        // Fill the form
        this.cardForm.patchValue({
          id: this.card.id,
          title: this.card.title,
          description: this.card.description,
          boardListId: this.card.boardListId,
          position: this.card.position,
          dueDate: this.card.dueDate
        });
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
   * Return whether the card has the given label
   *
   * @param label
   */
  hasLabel(label: BoardLabel): boolean {
    return !!this.card.labels.find(cardLabel => cardLabel.id === label.id);
  }

  /**
   * Filter labels
   *
   * @param event
   */
  filterLabels(event): void {
    // Get the value
    const value = event.target.value.toLowerCase();

    // Filter the labels
    this.filteredLabels = this.labels.filter(label => label.title.toLowerCase().includes(value));
  }

  update(){
    console.log("CardForm Value: ", this.cardForm.value)
    this.store.updateCardEffect(this.cardForm.value)
  }
  /**
   * Filter labels input key down event
   *
   * @param event
   */
  filterLabelsInputKeyDown(event): void {
    // Return if the pressed key is not 'Enter'
    if (event.key !== 'Enter') {
      return;
    }

    // If there is no label available...
    if (this.filteredLabels.length === 0) {
      // Return
      return;
    }

    // If there is a label...
    const label = this.filteredLabels[0];
    const isLabelApplied = this.card.labels.find(cardLabel => cardLabel.id === label.id);

    // If the found label is already applied to the card...
    if (isLabelApplied) {
      // Remove the label from the card
      this.removeLabelFromCard(label);
    }
    else {
      // Otherwise add the label to the card
      this.addLabelToCard(label);
    }
  }

  /**
   * Toggle card label
   *
   * @param label
   * @param change
   */
  toggleProductTag(label: BoardLabel, change: MatCheckboxChange): void {
    if (change.checked) {
      this.addLabelToCard(label);
    }
    else {
      this.removeLabelFromCard(label);
    }
  }

  /**
   * Add label to the card
   *
   * @param label
   */
  addLabelToCard(label: BoardLabel): void {
    // Add the label
    this.card.labels.unshift(label);

    // Update the card form data
    this.cardForm.get('labels').patchValue(this.card.labels);

    // Mark for check
    this._changeDetectorRef.markForCheck();
  }

  /**
   * Remove label from the card
   *
   * @param label
   */
  removeLabelFromCard(label: BoardLabel): void {
    // Remove the label
    this.card.labels.splice(this.card.labels.findIndex(cardLabel => cardLabel.id === label.id), 1);

    // Update the card form data
    this.cardForm.get('labels').patchValue(this.card.labels);

    // Mark for check
    this._changeDetectorRef.markForCheck();
  }

  /**
   * Check if the given date is overdue
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
   * Read the given file for demonstration purposes
   *
   * @param file
   */
  private _readAsDataURL(file: File): Promise<any> {
    // Return a new promise
    return new Promise((resolve, reject) => {

      // Create a new reader
      const reader = new FileReader();

      // Resolve the promise on success
      reader.onload = (): void => {
        resolve(reader.result);
      };

      // Reject the promise on error
      reader.onerror = (e): void => {
        reject(e);
      };

      // Read the file as the
      reader.readAsDataURL(file);
    });
  }
}
