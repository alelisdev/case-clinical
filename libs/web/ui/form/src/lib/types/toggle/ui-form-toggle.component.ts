import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { FieldType } from '@ngx-formly/core'

@Component({
  templateUrl: './ui-form-toggle.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls:['./style.scss']
})
export class UiFormToggleComponent extends FieldType implements OnInit, OnDestroy{
  formControl!: FormControl
  subscriber;
  defaultOptions = {
    templateOptions: {
      options: [],
    },
  }

  ngOnInit(): void {
    try {
      const defaultValue = this.to.options[0].value;
      this.formControl.setValue(defaultValue);
      if(this.to.valueChanged && this.to.valueChanged instanceof Function) {
        this.to.valueChanged(defaultValue);
      }
    } catch (e) {}
    this.subscriber = this.formControl.valueChanges.subscribe((value) => {
      if(this.to.valueChanged && this.to.valueChanged instanceof Function) {
        this.to.valueChanged(value);
      }
    })
  }

  ngOnDestroy(): void {
    this.subscriber?.unsubscribe();
  }

  get getFormat():string {
    if(!this.to.format)
      return "text";
    return this.to.format;
  }

  get getSize():string {
    if(!this.to.size)
      return "auto";
    return this.to.size;
  }

  get getRadius():string{
    if(!this.to.borderRadius)
      return "0";
    return this.to.borderRadius;
  }

  notexisted(item):boolean{
    if(item == null || item == undefined)
      return true;

    if(item.length == 0)
      return true;
    return false;
  }
}
