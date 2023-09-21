import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { validationItems } from './validation-items';

@Component({
  styleUrls: ['./web-ui-form-validation.component.scss'],
  template: `
    <div class="flex-1 flex gap-2 mt-1" [ngClass]="{'flex-row': !to.narrow, 'flex-col': to.narrow}">
      <select
        style="height: 42px"
        class='w-50'
        (change)="keyDidChange($event.target.value)"
      >
        <option *ngFor="let item of items" [selected]="item.id===selectedValidationItem?.id" [value]="item.id">{{ item.title }}</option>
      </select>

      <ng-container [ngSwitch]="selectedValidationItem?.type">
        <div class="w-50" *ngSwitchCase="'bool'">
          <select
            class="w-full"
            (change)="valueDidChange($event.target.value)"
          >
            <option [value]="true" [selected]="value===true">True</option>
            <option [value]="false" [selected]="value===false">False</option>
          </select>
        </div>
        <div class="w-50" *ngSwitchCase="'int'">
          <input type='text' [(ngModel)]="value" mask="0*" class="w-full" (change)="valueDidChange($event.target.value)"/>
        </div>
        <div class="w-50" *ngSwitchDefault>
          <input type='text' [(ngModel)]="value" class="w-full" (change)="valueDidChange($event.target.value)"/>
        </div>
      </ng-container>
      <input [class]="classes" placeholder='Please enter validation message...' *ngIf="selectedValidationItem?.requreMessage" [(ngModel)]="message" class="flex-1" (keyup)="messageDidChange($event.target.value)"/>
    </div>
  `,
})
export class UiValidationComponent extends FieldType implements OnInit {
  formControl!: FormControl

  selectedValidationItem: any;
  value: any;
  message = ''

  valueMap: Record<string, any>
  items: any[]

  constructor(private changeDetectRef: ChangeDetectorRef) {
    super();

    this.valueMap = {}

    this.items = validationItems;
  }

  ngOnInit(): void {
    if(this.formControl.value) {
      const key = this.formControl.value['key'];
      const value = this.formControl.value['value'];
      this.message = this.formControl.value['message'];

      this.valueMap[key] = value;

      this.keyDidChange(key);
    } else {
      this.keyDidChange(this.items[0].id);
    }
  }

  get classes(): string {
    return 'shadow-sm bg-white text-black px-2 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md block w-full text-lg'
  }


  setValue() {
    this.formControl.setValue({key: this.selectedValidationItem.id, value: this.value, message: this.message})
  }

  keyDidChange(key) {
    this.selectedValidationItem = this.items.find(el => el.id === key);

    if(this.valueMap[key]) {
      this.value = this.valueMap[key];
    } else {
      this.value = this.selectedValidationItem.default;
    }

    if(this.selectedValidationItem.requreMessage) {
      this.message = this.message ?? ''
    }

    this.setValue();
  }

  valueDidChange(value) {
    switch(this.selectedValidationItem.type) {
      case 'bool':
        this.value = value;
        break;
      case 'int':
        this.value = Number(value);
        break;
      default:
        break;
    }
    this.valueMap[this.selectedValidationItem.id] = this.value;
    this.setValue();
  }

  messageDidChange(value) {
    this.message = value;
    this.setValue();
  }
}
