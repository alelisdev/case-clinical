import { of, switchMap } from 'rxjs';
import { DatePipe } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { FieldType } from '@ngx-formly/core'
import { InvalidDateValidator } from '../../validators';
import { dateIsValid } from '@case-clinical/shared/util/helpers';
@Component({
  template: `
    <input
      [class]="classes"
      [ngClass]="classNames"
      [max]="maxLimit"
      [type]="'date'"
      [formControl]="formControl"
      [formlyAttributes]="field"
      [class.is-invalid]="showError"
      [min]="minLimit"
      onclick="this.showPicker()"
    />
  `,
  styleUrls:['./style.scss']
})
export class UiFormDateComponent extends FieldType implements OnInit {
  formControl!: FormControl
  value = ''
  constructor(private datePipe: DatePipe) {
    super()

  }

  get maxLimit(){
    const today= new Date();
    if(this.to.limitTotoday)
    {
      return `${today.getFullYear()}-${(today.getMonth()+1).toString().padStart(2,'0')}-${today.getDate().toString().padStart(2,'0')}`;
    }
    return "";
  }
  get minLimit(){
    const today= new Date();
    if(this.to.fromToday)
    {
      return `${today.getFullYear()}-${(today.getMonth()+1).toString().padStart(2,'0')}-${today.getDate().toString().padStart(2,'0')}`;
    }
    return "1900-12-31";
  }
  
  ngOnInit(): void {

    if(this.formControl.value) {
      this.value = this.formControl.value;
      if(dateIsValid(this.value))
      {
        this.formControl.setValue(this.datePipe.transform(this.formControl.value, 'yyyy-MM-dd'))

      }else{
        this.formControl.setValue(this.value)

      }

    }
    this.formControl.valueChanges.subscribe(
      value => {
        if(this.value !== value) {
          this.value = value;
          if (this.to.valueChanged && this.to.valueChanged instanceof Function) {
            this.to.valueChanged(value)
          }
          this.formControl.setValue(this.datePipe.transform(value, 'yyyy-MM-dd'))
          
        }
      }
    )
  }

  get classNames(): string {
    return this.showError
      ? 'border-red-300 text-red-900 placeholder-red-400 focus:outline-none focus:ring-red-500 focus:border-red-500'
      : ''
  }

  get classes(): string {
    return 'shadow-sm dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md block w-full sm:text-sm'
  }
  formatDate(date: Date) {
    this.value = this.datePipe.transform(date, 'MM/dd/yyyy');
  }
}
