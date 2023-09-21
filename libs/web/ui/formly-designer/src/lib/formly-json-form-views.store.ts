import { ComponentStore } from '@ngrx/component-store';
import { Injectable } from "@angular/core";
import { of, switchMap } from 'rxjs';

export interface FormlyJsonFormViewsState {
  views: Record<string, { formId: string, title: string }[]>,
  currentViewId: Record<string, string>
}

@Injectable()
export class FormlyJsonFormViewsStore extends ComponentStore<FormlyJsonFormViewsState> {
  constructor(
  ) {
    super({
      views: {},
      currentViewId: {},
    })
  }

  views$ = this.select((s) => s.views);
  currentViewId$ = this.select((s) => s.currentViewId);

  setViews = this.updater((s, views: any) => ({
    ...s,
    views: {
      ...s.views,
      [views.formName]: views.views
    }
  }))

  setCurrentViewId = this.updater((s, currentViewId: any) => ({
    ...s,
    currentViewId: {
      ...s.currentViewId,
      [currentViewId.formName]: currentViewId.currentViewId as string
    }
  }))

  getViews(formName: string) {
    return this.views$.pipe(switchMap((views) => of(views[formName])));
  }

  getCurrentViewId(formName: string) {
    return this.currentViewId$.pipe(switchMap( currentViewId => of(currentViewId[formName]) ));
  }
}
