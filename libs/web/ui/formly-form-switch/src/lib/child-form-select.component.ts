import { Component, Input, OnInit, OnDestroy, Injector } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form';
import { FormlyJsonFormViewsStore } from '@case-clinical/web/ui/formly-designer';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'ui-formly-form-select',
  styleUrls: ['./child-form-select.component.scss'],
  template: `
  <ng-container *ngIf="currentViewId$ | async as vid">
    <ui-context-provider *ngIf="formlyJsonFormViewsStore && formData" [data]="formData" class='flex'>
      <form #ngForm *ngIf="fields" class="relative w-full">
        <formly-form [model]="{childFormLayoutId: vid}" [fields]="fields" [options]="options" class="w-full"></formly-form>
      </form>
    </ui-context-provider>
  </ng-container>
  `,
})
export class ChildFormSelectComponent implements OnInit, OnDestroy {
  @Input() formName: string;
  subscriber: any;
  formlyJsonFormViewsStore: FormlyJsonFormViewsStore|undefined;
  views$?: Observable<{ formId: string; title: string; }[]>;
  currentViewId$?: Observable<string>;
  hidden = false;
  formData: any|undefined
  model = {}
  options: any|undefined;

  fields = [
    WebUiFormField.fieldRow([
      WebUiFormField.dropdown('childFormLayoutId', { label: 'Select Child Form Layout', hideLabel: true, compact: true, dataKey: 'views', valueChanged: (id: string) => { this.viewIdDidChange(id); } }, { className: 'w-full' }),
    ], 'w-full p-1', { className: 'w-full p-1' })
  ]

  constructor(private injector: Injector) {

  }

  ngOnDestroy(): void {
    this.subscriber?.unsubscribe();
  }

  ngOnInit() {
    this.formlyJsonFormViewsStore = this.injector.get(FormlyJsonFormViewsStore);
    if(this.formlyJsonFormViewsStore) {
      this.views$ = this.formlyJsonFormViewsStore.getViews(this.formName).pipe(tap(views => {
        if(views?.length < 2) {
          this.hidden = true;
        } else {
          this.hidden = false;
        }
       }));
      this.currentViewId$ = this.formlyJsonFormViewsStore.getCurrentViewId(this.formName);
      this.formData = {
        views: this.views$,
      }
      this.options = {
        formState: this.formData
      };
    }
  }

  viewIdDidChange(viewId: string) {
    this.formlyJsonFormViewsStore?.setCurrentViewId({ formName: this.formName, currentViewId: viewId });
  }
}
