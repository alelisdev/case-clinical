import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation, ChangeDetectorRef } from '@angular/core'
import { FormControl } from '@angular/forms'
import { MatSelect } from '@angular/material/select';
import { FieldType } from '@ngx-formly/core'
import { Observable, Subject, takeUntil } from 'rxjs';
import { FormService } from '../../form.service';
import { DataContextService } from '../../context-provider/data-context.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./style.scss'],
  selector: 'ui-form-dropdown',
  template: `
    <mat-form-field appearance="outline" class="w-full"  [ngClass]="{'error': showError}">
        <mat-select
          *ngIf="useModel"
            [value]="value"
            [formControl]="formControl"
            [disabled]="to.readonly"
            (selectionChange)="onSelectionChanged($event)" >
            <ng-container *ngFor="let item of data">
                <mat-option [value]="item[valueProp]">{{item[labelProp]}}</mat-option>
            </ng-container>
        </mat-select>
        <mat-select
          *ngIf="!useModel"
            [value]="value"
            [disabled]="to.readonly"
            (selectionChange)="onSelectionChanged($event)" >
            <ng-container *ngFor="let item of data">
                <mat-option [value]="item[valueProp]">{{item[labelProp]}}</mat-option>
            </ng-container>
        </mat-select>
    </mat-form-field>
  `,
})
export class UiFormDropdownComponent extends FieldType implements OnInit, OnDestroy {
  @ViewChild(MatSelect) matSelect: MatSelect;
  private _unsubscribeAll: Subject<any> = new Subject();
  formControl!: FormControl
  value: any = '';
  selectedValue: any;
  valueProp = 'id';
  labelProp = 'title';
  formStateKey: any = undefined;
  data = [];

  useModel = true;
  contextDataKey;
  constructor(private formService: FormService, private contextService: DataContextService, private changeDetectorRef: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    if (this.to.useModel) this.useModel = this.to.useModel === 0;
    let key;
    if (this.useModel)
      key = this.field.key as string;
    else
      this.contextDataKey = this.to.contextDataKey;

    if (this.to.labelProp) this.labelProp = this.to.labelProp;
    if (this.to.valueProp) this.valueProp = this.to.valueProp;

    // Get Items Array
    // First try to get from the templateOptions.items
    if (this.to.items && this.to.items.length > 0) {
      this.data = this.to.items;
    } else {
      const dataKey = this.to.dataKey;
      if (dataKey) {
        const source = this.formService.getValueForKey(dataKey, this.contextService.getData());
        if (source instanceof Array) {
          this.data = source;
        } else if (source instanceof Observable) {
          source.pipe(takeUntil(this._unsubscribeAll)).subscribe(data => {
            this.data = data;
            if (this.to.autoSelect && this.data?.length > 0) {
              this.value = this.data[0][this.valueProp];
              this.changeDetectorRef.detectChanges();
            }


            if (this.value && this.useModel) {
              const index = this.data?.findIndex((el) => el[this.valueProp] === this.value);
              if (index === -1) {
                this.value = undefined;
                this.formControl.setValue(undefined);
                this.matSelect.value = null;
              }
            }
          })
        }
      }
    }

    if (this.useModel) {
      if (key.length > 2 && (key.endsWith('Id') || key.endsWith('id'))) {
        this.formStateKey = key.substring(0, key.length - 2);
      } else {
        this.formStateKey = `selected${key}`;
      }

      if (this.formControl.value !== null && this.formControl.value !== undefined) {
        this.value = this.formControl.value;
        if (this.to.valueChanged && this.to.valueChanged instanceof Function) this.to.valueChanged(this.value, this.formControl);
      }

      this.formControl.valueChanges.pipe(takeUntil(this._unsubscribeAll)).subscribe((changes) => {
        if (this.value !== changes) {
          this.value = changes
          this.matSelect.value = this.value;
          let selectedObject;
          if (this.value) {
            selectedObject = this.data.find((el) => el[this.valueProp] === this.value);
            this.formState[this.formStateKey] = selectedObject;
          }
          if (this.to.valueChanged && this.to.valueChanged instanceof Function) this.to.valueChanged(this.value, selectedObject, this.contextService.getData(), this.form);
          this.changeDetectorRef.detectChanges();
        }
      })
    } else {
      this.contextService.getDataStream().pipe(takeUntil(this._unsubscribeAll)).subscribe(() => {
        const value = this.contextService.getValue(this.contextDataKey, true);
        if(this.value !== value) {
          this.value = value
          if(this.matSelect) this.matSelect.value = this.value;
          this.changeDetectorRef.detectChanges();
        }
      });
    }
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  onSelectionChanged($event) {
    this.value = $event.value;
    if (this.useModel) {
      this.formControl.setValue($event.value)
    } else {
      this.matSelect.value = this.value;
      let selectedObject;
      if (this.value) {
        selectedObject = this.data.find((el) => el[this.valueProp] === this.value);
      }
      if (this.to.valueChanged && this.to.valueChanged instanceof Function) this.to.valueChanged(this.value, selectedObject, this.contextService.getData());
      this.changeDetectorRef.detectChanges();
    }
  }
}
