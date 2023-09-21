import { Component, OnDestroy, OnInit } from '@angular/core'
import { Observable, Subject, takeUntil } from 'rxjs'
import { UiFormBaseField } from '../../types/base-field-type';

@Component({
  templateUrl: './ui-form-table.component.html'
})
export class UiFormTableComponent extends UiFormBaseField implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  manualArrangement = false;
  headers = []

  columnFields = []
  childTableFields = [];

  showCheckBox = false;
  data = []
  selectedIndexes = [];
  headStyle = ''
  bodyStyle = ''

  emitChange() {
    if(this.to.selectionChanged && (this.to.selectionChanged instanceof Function)) {
      const selectedData = [];
      for(let i = 0; i < this.data.length; i++) {
        if(this.selectedIndexes.includes(i)) selectedData.push(this.data[i]);
      }
      this.to.selectionChanged(selectedData);
    }
  }

  log(field: any) {
    console.log(field);
  }

  isPlainHeader(header: any) {
    return (typeof header) === 'string';
  }

  onSelectionChanged(idx: number, $target: any) {
    if ($target.checked) {
      this.selectedIndexes.push(idx);
    } else {
      this.selectedIndexes = this.selectedIndexes.filter((el) => idx !== el);
    }
    this.emitChange();
  }


  onAllCheckBoxChanged(target: any) {
    if(target.checked) {
      this.selectedIndexes = Array.from(Array(this.data?.length ?? 0).keys());
    } else {
      this.selectedIndexes = [];
    }
    this.emitChange();
  }

  public get isAllCheckBoxChecked() : boolean {
    return this.selectedIndexes.length === this.data?.length;
  }

  isChecked(idx: number) {
    return this.selectedIndexes.includes(idx);
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.showCheckBox = this.to.showCheckBox ?? false;
    const dataKey = this.to.dataKey;

    if (dataKey) {
      const source = this.service.getValue(dataKey);
      if(source instanceof Observable) {
        source.pipe(takeUntil(this._unsubscribeAll)).subscribe(data => {
          this.data = data
        })
      } else {
        this.service.getDataStream().pipe(takeUntil(this._unsubscribeAll)).subscribe(_data => {
          if (_data) {
            const data = _data[dataKey];
            this.data = data;
            this.cd.markForCheck();
            this.cd.detectChanges();
          }
        })
      }
    } else {
      this.manualArrangement = true;
    }

    this.field.fieldGroup?.map((field) => {
      const type = field.wrappers?.at(0);
      try {
        if(type === 'table-column') {
          if(field.fieldGroup.length > 1) this.headers.push(field.fieldGroup[1])
          else this.headers.push(field.templateOptions['title']);
          this.columnFields.push(field.fieldGroup[0]);
        } else if(type === 'table') {
          this.childTableFields.push(field);
        }
      } catch (e) {
        if(type === 'table-column') {
          this.headers.push("No title");
          this.columnFields.push(undefined);
        }
      }
    })

    console.log(this.childTableFields);

    if(this.manualArrangement) this.headers = this.to.header
    if(this.to.headStyle) this.headStyle = `${this.to.headStyle}`
  }


  ngOnDestroy(): void {
    super.ngOnDestroy();

    this._unsubscribeAll?.next(null);
    this._unsubscribeAll?.complete();
  }
}
