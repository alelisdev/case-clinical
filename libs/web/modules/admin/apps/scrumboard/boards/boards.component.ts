import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import * as moment from 'moment';
import { BoardListStore } from './board.list.store';
import { DialogService } from '@ngneat/dialog';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';
import { WebUiFormField } from '@case-clinical/web/ui/form';

@Component({
  selector: 'scrumboard-boards',
  templateUrl: './boards.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    BoardListStore,
  ]
})
export class ScrumboardBoardsComponent implements OnInit, OnDestroy {
  @ViewChild('dlg') dlgTpl!: TemplateRef<any>;

  // Private
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  ref;
  boards$ = this.store.boards$;

  formData = {

  }

  model = {}
  form = new FormGroup({});
  options: FormlyFormOptions;
  fields: FormlyFieldConfig[];

  /**
   * Constructor
   */
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    public store: BoardListStore,
    private dialog: DialogService,
  ) {
    this.options = {
      formState: this.formData ? { ...this.formData } : {}
    };

    this.fields = [
      WebUiFormField.fieldRow([
        WebUiFormField.input('title', { label: "Title", required: true }, { className: 'w-full' }),
        WebUiFormField.textarea('description', { label: "Description", required: true }, { className: 'w-full' }),
        WebUiFormField.input('icon', { label: "Icon", required: true }, { className: 'w-full' }),
      ])
    ]
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.store.loadBoardsEffect();
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Format the given ISO_8601 date as a relative date
   *
   * @param date
   */
  formatDateAsRelative(date: string): string {
    return moment(date, moment.ISO_8601).fromNow();
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

  open(): void {
    this.ref = this.dialog.open(this.dlgTpl, {
      data: {
        value: {}
      },
      closeButton: false,
      height: 'auto',
      width: 'auto',
    })
  }

  submit() {
    const subscriber = this.store.actionResult$.subscribe((result) => {
      const { done } = result;
      if (done) {
        subscriber.unsubscribe();
        this.ref.close();
      }
    });
    this.store.createBoardEffect(this.form.value);
  }
}
