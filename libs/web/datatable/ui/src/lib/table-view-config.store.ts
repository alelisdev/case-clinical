import { ColumnState } from '@ag-grid-community/core'
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { EventEmitter, Injectable } from '@angular/core';
import { switchMap, withLatestFrom } from 'rxjs';
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access';
import { WebUiToastService } from '@case-clinical/web/ui/toast';
import { ColDef } from 'ag-grid-community';

export interface FilterState {
  [key: string]: unknown;
}

interface ViewSetting {
  viewName?: string,
  filterSettings?: FilterState,
  columnDefs?: ColDef[]
}

interface View {
  settingId?: string,
  settingName?: string,
  viewSetting?: ViewSetting
}

export interface DataTableSettings {
  tableName: string
  views?: View[],
  currentViewId?: number,
}

@Injectable()
export class TableViewConfigStore extends ComponentStore<DataTableSettings> {
  constructor(
    private readonly webApiService: WebCoreDataAccessService,
    private readonly toast: WebUiToastService
  ) {
    super({
      tableName: ''
    })
  }

  readonly currentViewId$ = this.select(s => s.currentViewId)
  readonly settingId$ = this.select(s => s.currentViewId !== null && s.currentViewId >= 0 ? s.views[s.currentViewId].settingId : null)
  readonly settingName$ = this.select(s => s.currentViewId !== null && s.currentViewId >= 0 ? s.views[s.currentViewId].settingName : null)
  readonly viewName$ = this.select(s => s.currentViewId !== null && s.currentViewId >= 0 ? s.views[s.currentViewId].viewSetting?.viewName : null)
  readonly tableName$ = this.select((s) => s.tableName)
  readonly views$ = this.select((s) => s.views)
  readonly filterSettings$ = this.select(s => s.currentViewId !== null && s.currentViewId >= 0 ? s.views[s.currentViewId].viewSetting?.filterSettings : null)

  readonly exportName$ = this.select(
    this.viewName$,
    this.tableName$,
    (viewName, tableName) => {
      try {
        return viewName ?? tableName.split('-')[0];
      } catch (e) {
        return tableName;
      }
    }
  )

  readonly columnDefs$ = this.select(
    this.currentViewId$,
    this.views$,
    (
      currentViewId,
      views
    ) => {
      const columnDef = currentViewId !== null && currentViewId >= 0 ? views[currentViewId].viewSetting?.columnDefs : null;
      return columnDef;
    },
  )

  readonly viewNames$ = this.select((s) => {
    if(s.views) {
      return s.views.map((view, index) => ({id: index, name: view.viewSetting.viewName}))
    } else {
      return []
    }
  })

  readonly vm$ = this.select(
    this.viewNames$,
    this.filterSettings$,
    this.columnDefs$,
    ( viewNames, filterSettings, columnDefs ) => ({
      viewNames, filterSettings, columnDefs
    }),
  )

  readonly addView = this.updater((state, data: { viewName: string, resultEmitter: EventEmitter<any> }) => {
    const views = state.views ? Object.assign(state.views) : [];
    if(data.viewName.trim().length < 2) return state;
    if(data.viewName.trim() === "")
    {
      this.toast.error('View name is blank.', { duration: 3000 })
      return state;
    }

    const duplicateView = views.find((view) => view?.viewSetting?.viewName.toLowerCase() === data.viewName.trim().toLowerCase())
    if(duplicateView) {
      this.toast.error('View with the same name exists', { duration: 3000 })
      return state;
    }

    const newView: View = {
      settingId: "",
      settingName: state.tableName + "_view_" + data.viewName,
      viewSetting: {
        viewName: data.viewName,
        filterSettings: null,
        columnDefs: null
      }
    }
    views.push(newView)

    this.toast.success('Successfully created new view', { duration: 3000 })
    data.resultEmitter.emit({ id: state.views.length-1, name: data.viewName })
    return {
      ...state,
      views: views,
      currentViewId: state.views.length-1
    }
  })

  readonly editView = this.updater((state, data: {input: {id: number, name: string}, resultEmitter: EventEmitter<any>}) => {
    const views = state.views ? Object.assign(state.views) : [];
    const duplicateView = views.find((view) => view?.viewSetting?.viewName.toLowerCase() === data.input.name.trim().toLowerCase() && view?.viewSetting?.id !== views[data.input.id]?.viewSetting?.id )
    if(data.input.name.trim().length < 2) return state;
    if(data.input.name.trim() === "")
    {
      this.toast.error('View name is blank.', { duration: 3000 })
      return state;
    }

    if(duplicateView) {
      this.toast.error('View with the same name exists', { duration: 3000 })
      return state;
    }

    views[data.input.id].viewSetting.viewName = data.input.name;
    data.resultEmitter.emit({ ...data.input })
    this.toast.success('Susccessfully renamed new view', { duration: 3000 })
    return {
      ...state,
      views: views,
    }
  })

  readonly changeView = this.updater((state, id: number) => {
    return {
      ...state,
      currentViewId: id
    }
  })

  loadTableSettings({ tableName }: { tableName: string; }): void {
    this.webApiService.userSettings({
      input: {
        name: tableName,
        limit: 1000,
      }
    }).pipe(
      switchMap(async (settings) => (settings))
    ).subscribe({
      next: (settings) => {
        if (settings.errors) {
          console.error(settings.errors)
        }
        const views: View[] = settings.data.items.map((el: any) => {
          return {
            settingId: el.id,
            settingName: el.name,
            viewSetting: JSON.parse(el.value)
          }
        })
        console.log({ views })
        this.patchState({
          views: views,
          tableName: tableName
        })
      },
      error: error => {
        console.log(`error in error response`, error);
      }
    });
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  readonly saveViewEffect = this.effect<{ columnDefs: ColDef[], filterState: FilterState }>(($data) =>
    $data.pipe(
      withLatestFrom(this.settingId$, this.settingName$, this.viewName$, this.views$, this.currentViewId$),
      switchMap(([_data, _settingId, _settingName, _viewName, _views, _currentViewId]) => {
        // Preprocess column settings and optimize data to save db, Because the raw data is too long to save to db
        console.log({ name: _settingName, viewName: _viewName, })
        return this.webApiService.userUpdateSetting({
          settingId: _settingId,
          input: {
            name: _settingName,
            value: JSON.stringify({
              viewName: _viewName,

              filterSettings: _data.filterState,
              columnDefs: _data.columnDefs,
            })
          }
        }).pipe(
          tapResponse(
            (res) => {
              this.toast.success('Saved current view', { duration: 3000 })
              _views[_currentViewId].viewSetting.columnDefs = _data.columnDefs;
              _views[_currentViewId].viewSetting.filterSettings = _data.filterState
              _views[_currentViewId].settingId = res.data.updated.id;
              this.patchState({
                currentViewId: _currentViewId,
                views: _views
              })
            },
            error => {
              this.toast.error('Failed to save current view', { duration: 3000 })
            }
          )
        )
      })
    )
  )
}
