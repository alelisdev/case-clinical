
import { Component,ChangeDetectionStrategy, ViewChild, NgZone, ChangeDetectorRef, TemplateRef } from '@angular/core'
import { FormControl,SelectControlValueAccessor } from '@angular/forms'
import { DialogService } from '@ngneat/dialog'
import { FieldType } from '@ngx-formly/core'
import { take } from 'rxjs/operators'

@Component({
  templateUrl: `./user-feature-permission-select.component.html`
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFeaturePermissionSelectComponent extends FieldType {
  formControl!: FormControl
  defaultOptions = {
    templateOptions: {
      options: [],
      compareWith(o1: any, o2: any): any {

        return o1 === o2
      },
    },
  }

  // workaround for https://github.com/angular/angular/issues/10010
  @ViewChild(SelectControlValueAccessor) set selectAccessor(s: any) {
    if (!s) {
      return
    }

    const writeValue = s.writeValue.bind(s)
    if (s._getOptionId(s.value) === null) {
      writeValue(s.value)
    }

    s.writeValue = (value: any) => {
      const id = s._idCounter
      writeValue(value)
      if (value === null) {
        this.ngZone.onStable
          .asObservable()
          .pipe(take(1))
          .subscribe(() => {
            if (
              id !== s._idCounter &&
              s._getOptionId(value) === null &&
              s._elementRef.nativeElement.selectedIndex !== -1
            ) {
              writeValue(value)
            }
          })
      }
    }
  }

  get classNames(): string {
    return 'mt-1 block w-full pl-3 py-2 text-base dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md'
  }

  constructor(private ngZone: NgZone,
    private ref: ChangeDetectorRef,
    private readonly dialog: DialogService
  ) {
    super()
  }


  openDialog<T>(
    tpl: TemplateRef<any>,
    {
      userFeaturePermission,
    }: { userFeaturePermission ?: T },
  ) {
    this.dialog.open(tpl, { data: { userFeaturePermission }, closeButton: false })
  }

  getUserFeaturePermissionValue(value) {
    return { ...value, userFeaturePermissionId: this.model.userFeaturePermissionId }
  }

}

