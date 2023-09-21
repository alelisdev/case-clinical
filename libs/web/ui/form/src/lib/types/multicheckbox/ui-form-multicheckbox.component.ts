import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { FieldType } from '@ngx-formly/core'
import { FormService } from '../../form.service'
import { DataContextService } from '../../context-provider/data-context.service'
import { Subject, takeUntil } from 'rxjs'
import { cloneDeep } from 'lodash'
import { Observable } from 'rxjs'
import { TailwindService } from './../../../../../formly-designer/src/lib/services/tailwind.service'

@Component({
  template: `
    <div class="mt-4 sm:mt-0 sm:col-span-2">
      <div class="max-w-lg space-y-4">
        <div class="" [style]="style" [ngClass]="innerClass">
          <div *ngFor="let group of groupData">
            <div *ngFor="let option of group | formlySelectOptions: field | async; let i = index">
              <div class="relative flex items-center py-1">
                <div class="flex items-center h-5">
                  <input
                    type="checkbox"
                    
                    class="focus:ring-blue-500 mt-0 h-4 w-4 text-blue-600 border-gray-300 dark:bg-gray-800 dark:border-gray-600 rounded"
                    [id]="id + '_' + i"
                    [value]="option.value"
                    [checked]="isChecked(option)"
                    (change)="onChange(option.value, $event.target)"
                    [disabled] = "isDisabled"
                  />
                </div>
                <div class="ml-3 text-sm">
                  <label class="font-medium mb-0 text-gray-700 dark:text-gray-300" [for]="id + '_' + i">
                    {{ option.label }}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiFormMulticheckboxComponent extends FieldType implements OnInit, OnDestroy {
  formControl!: FormControl
  isDisabled:boolean
  subscriber
  private _unsubscribeAll: Subject<any> = new Subject<any>()
  defaultOptions = {
    templateOptions: {
      options: [],
    },
  }
  data: any[] | Observable<any[]>
  columnData: any[] | Observable<any[]>
  groupData: any[]= []
  innerClass = ''
  style = ''
  constructor(
    private cdr: ChangeDetectorRef,
    private service: DataContextService,
    private formService: FormService,
    public tailwindService: TailwindService,
  ) {
    super()
  }
  ngOnInit(): void {
    this.subscriber = this.formControl.valueChanges.subscribe((value) => {
      if (this.to.valueChanged && this.to.valueChanged instanceof Function) {
        this.to.valueChanged(value)
      }
    })

    const dataKey = this.to.dataKey
    this.isDisabled = this.to.readOnly
    console.log("readonly = ", this.isDisabled)

    if (dataKey) {
      this.service
        .getDataStream()
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((_data) => {
          if (_data) {
            const data = this.formService.getValueForKey(dataKey, _data)
            if (data) {
              this.data = data
              this.cdr.detectChanges()
            }
          }
        })
    } else {
      this.data = this.to.options
    }
    let total = 0
    for (const item in this.data) {
      total++
    }
    this.columnData = this.data;
    console.log(this.columnData[1]);
    const columnCount = this.to.columnCount ?? 1
    const itemCount = Math.ceil(total / columnCount)
    for (let i = 0; i < columnCount; i++) {
      const temp = []
      for (let j = i * itemCount; j < (i + 1) * itemCount; j++) {
        if (this.columnData[j]) temp.push(this.columnData[j])
      }
      //console.log(temp);
      this.groupData[i] = temp
    }
    //console.log(this.groupData[0])
    for(const group of this.groupData){
      console.log(group);
    }
    const className = this.field.className
    const { innerClass } = this.tailwindService.splitClassName(className)

    this.innerClass = innerClass
    this.innerClass += ` grid grid-cols-1 sm:grid-cols-${this.to.columnCount ?? 1} md:grid-cols-${
      this.to.columnCount ?? 1
    } lg:grid-cols-${this.to.columnCount ?? 1} xl:grid-cols-${this.to.columnCount ?? 1} gap-4`
  }
  clone(field: any) {
    return cloneDeep(field)
  }
  ngOnDestroy(): void {
    this.subscriber?.unsubscribe()
    this._unsubscribeAll?.next(null)
    this._unsubscribeAll?.complete()
  }
  onChange(value: any, target: any): void { 
    console.log("multicheckbox", this.to.readOnly);
    if (this.to.type === 'array') {
      this.formControl.patchValue(
        target.checked
          ? [...(this.formControl.value || []), value]
          : [...(this.formControl.value || [])].filter((o) => o !== value),
      )
    } else {
      this.formControl.patchValue({
        ...this.formControl.value,
        [value]: target.checked,
      })
    }
    this.formControl.markAsTouched()
  }

  isChecked(option: any): boolean {
    const value = this.formControl.value

    return value && (this.to.type === 'array' ? value.indexOf(option.value) !== -1 : value[option.value])
  }
}
