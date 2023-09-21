import { takeUntil } from 'rxjs/operators';
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core';
import { Subject } from 'rxjs';
import { FormControl } from '@angular/forms'

@Component({
  selector: 'ui-formly-field-base-grid',
  template: `

  `,
})
export abstract class UiFormGridBaseFieldType extends FieldType implements OnInit, OnDestroy {
  override formControl!: FormControl;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  data: any[] = [];

  constructor(
  ) {
    super();

    this.onSave = this.onSave.bind(this);
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  ngOnInit(): void {

    if(this.formControl.value) {
      this.data = this.formControl.value;
    }

    this.formControl.valueChanges.pipe(takeUntil(this._unsubscribeAll)).subscribe(value => {
      this.data = value;
    })
  }

  onSave(data: any) {
    const updatedIndex = this.data.findIndex(el => el.id === data.id);
    if(updatedIndex !== -1) {
      this.data[updatedIndex] = data;
      this.data = this.data.map((el, index) => {
        if(index === updatedIndex) return data;
        else return el;
      });
    } else {
      this.data = [
        ...this.data,
      ]
    }
  }
}
