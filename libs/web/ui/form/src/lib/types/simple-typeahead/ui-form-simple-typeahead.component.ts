import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'

@Component({
  template: `
    <div [style]="Style">
      <ng-select
        [class]="to?.className || 'custom'"
        [items]="this.items"
        [placeholder]="to?.placeholder || ''"
        [bindLabel]="to?.labelProp ?? 'label'"
        [bindValue]="to?.valueProp ?? 'value'"
        [multiple]="to.multiple"
        [virtualScroll]="true"
        [loading]="loading"
        [formControl]="formControl"
        [groupBy]="to.groupBy"
        (open)="opened()"
        (close)="closed()"
        (clear)="onClear()"
        [compareWith]="to?.compareWith"
        (change)="to?.onChange($event);close()"
        (search)="changed($event)"
        >
        <ng-template ng-typetosearch-tmp>
          <div class="ng-option disabled">Start typing...</div>
        </ng-template>

        <ng-template ng-loadingtext-tmp let-searchTerm="searchTerm">
          <div class="ng-option disabled">Fetching data for "{{ searchTerm }}"</div>
        </ng-template>
    </ng-select>

    </div>
  `,
})
export class UiFormSimpleTypeaheadComponent extends FieldType implements OnInit, OnDestroy {
  formControl!: FormControl
  private ngUnsubscribe: Subject<boolean> = new Subject<boolean>()

  open = false;
  items = []
  loading = false;
  itemCount = 0;
  term = ""

  constructor(private detectChange: ChangeDetectorRef) {
    super()
  }

  public get Style() : string {
    if(!this.open) return "";
    if(this.term !== '' && this.itemCount === 0) return 'height: 80px';
    const height = this.itemCount * 40 + 40;
    if(this.term === '') return 'height: 280px';
    return height > 280 ? 'height: 280px' : `height: ${height}px`;
    return this.open ? 'height: 280px' : ""
  }

  opened() {
    this.open = true;
    this.detectChange.detectChanges()
  }

  onClear() {
    this.term = "";
    this.itemCount = 0;
    this.detectChange.detectChanges()
  }

  closed() {
    this.open = false;
    this.term = ""
    this.itemCount = 0;
    this.detectChange.detectChanges()
  }

  ngOnInit(): void {
    if(this.to.source) {
      this.loading = true;
      this.to.source.pipe(takeUntil(this.ngUnsubscribe)).subscribe((value) => {
        this.items = value;
        this.loading = false;
      })
    }
  }

  close() {
    console.log('Changed...')
    this.open = false;
    this.detectChange.detectChanges()
  }

  changed({ term, items }) {
    this.term = term;
    this.itemCount = items.length;
    this.detectChange.detectChanges()
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }
}
