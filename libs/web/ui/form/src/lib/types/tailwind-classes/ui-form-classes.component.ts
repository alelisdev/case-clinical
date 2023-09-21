import { Component, OnDestroy } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { Subject } from 'rxjs';
import { TailwindService } from './../../../../../formly-designer/src/lib/services/tailwind.service';

@Component({
  template: `
    <div class="w-full h-full flex flex-row flex-wrap gap-2">
      <div
        *ngFor="let className of getClassList(to.classNameList); let i = index"
        class="flex flex-row gap-2 items-center bg-gray-800 dark:bg-gray-100 rounded-xl p-2 text-white dark:text-gray-800"
        style="gap: 4px;"
      >
        <span>{{ className }}</span>
        <svg (click)="deleteClassName(className)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-white dark:text-gray-800">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
    </div>
  `,
})
export class UiFormClassesComponent extends FieldType implements OnDestroy {
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  formControl!: FormControl

  classNameList = []

  constructor(private tailwindService: TailwindService) {
    super()
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  deleteClassName(className: string) {
    if(this.to.valueRemoved) this.to.valueRemoved(className)
  }

  getClassList(className: string) {
    if(!className) return [];
    return className?.trim()?.split(' ').map((el) => el.trim());
  }
}
