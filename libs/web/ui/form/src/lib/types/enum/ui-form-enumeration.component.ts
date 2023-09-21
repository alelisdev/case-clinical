import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { MatSelect } from '@angular/material/select';
import { Observable } from 'rxjs';

@Component({
  styleUrls: ['./style.css'],
  template: `
    <mat-form-field class="fuse-mat-no-subscript w-full" style="font-size: 12px;">
      <mat-select
          [value]="value"
          [disabled]="to.readonly"
          (selectionChange)="onSelectionChanged($event)">
          <ng-container *ngFor="let item of Items">
              <mat-option [value]="item">{{item}}</mat-option>
          </ng-container>
      </mat-select>
  </mat-form-field>
  `,
})
export class UiEnumerationComponent extends FieldType implements OnInit, OnChanges {
  @ViewChild(MatSelect) matSelect: MatSelect;
  formControl!: FormControl

  values: string[];
  value: any;

  constructor() {
    super();

    this.values = [];
  }


  ngOnInit(): void {
    this.values = this.to.values;
    if(this.formControl.value) {
      this.value = this.formControl.value;
      this.setInitialValue();
    }

    const dataKey = this.to.dataKey;
    if(dataKey) {
      const values = this.formState[dataKey];
      if(!values) {
        console.error(`Data Input Error\nYou have to provide data for key "${dataKey}" to the formData`)
      } else {
        if(values instanceof Array) {
          this.values = values;
          this.setInitialValue();
        } else if(values instanceof Observable) {
          values.forEach(values => {
            this.values = values;
            this.setInitialValue();
          })
        }
      }
    }

    this.formControl.valueChanges.subscribe((changes) => {
      if(this.value !== changes) {
        this.value = changes
        this.matSelect.value = this.value;
        this.setInitialValue();
      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.error('changes = ', changes)
  }

  public get Items() : string[] {
    return this.to.values ?? this.values;
  }

  setInitialValue() {
    if(this.values?.length > 0 && this.formControl.value && this.matSelect) {
      this.matSelect.value = this.value;
    }
  }

  onSelectionChanged($event) {
    this.value = $event.value;
    this.formControl.setValue($event.value)
  }
}
