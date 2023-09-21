import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { FormService } from '@case-clinical/web/ui/form';
import { FuseConfigService } from '@fuse/services/config';
import { Injectable } from "@angular/core";
import { switchMap, tap } from 'rxjs';
import { UserCreateSettingInput, WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast';

export interface FormlySettingsState {
  loading: boolean,
  query: string,
  canGoNext: boolean,
  formlySetting?: any,
}

@Injectable()
export class FormlySettingsStore extends ComponentStore<FormlySettingsState> {
  constructor(
    private formService: FormService,
    private toast: WebUiToastService,
    private data: WebCoreDataAccessService,
    private fuseConfigService: FuseConfigService,
  ) {
    super({
      query: "",
      loading: false,
      canGoNext: false,
    });

    this.patchState({ formlySetting: {} })
  }

  loading$ = this.select(s => s.loading)

  formlySetting$ = this.select(s => s.formlySetting);
  canGoNext$ = this.select(s => s.canGoNext, { debounce: true })

  vm$ = this.select(
    this.loading$,
    this.canGoNext$,
    this.formlySetting$,
    (
      loading,
      canGoNext,
      formlySetting
    ) => ({
      loading,
      canGoNext,
      formlySetting
    })
  )

  loadFormlySettingsEffect = this.effect<void>($ => $.pipe(
    tap(() => { this.patchState({ loading: true }) }),
    switchMap(() => this.data.userSettings({ input: { name: "formly_Page_Settings" } }).pipe(
      tapResponse(
        (response) => {
          const data = response.data?.items ?? [];
          if (data.length > 0)
            this.patchState({
              loading: false,
              formlySetting: {
                id: data[0].id,
                name: data[0].name,
                value: {
                  selectLanguage: data[0].value ? JSON.parse(data[0].value).language : '',
                  selectDateFormat: data[0].value ? JSON.parse(data[0].value).dateFormat : '',
                  selectCurrency: data[0].value ? JSON.parse(data[0].value).currency : '',
                  timeFormat: data[0].value ? JSON.parse(data[0].value).timeFormat : '',
                  id: data[0].id
                }
              }
            })
        },
        () => {
          this.patchState({
            loading: false
          })
        }
      )
    )
    )
  ))

  createFormlySettingsEffect = this.effect<any>(data$ => data$.pipe(
    tap((data) => { this.patchState({ loading: true }) }),
    switchMap((data) => {

      const inputData: UserCreateSettingInput = {
        name: "formly_Page_Settings",
        value: JSON.stringify({
          language: data?.selectLanguage ?? "en",
          currency: data?.selectCurrency ?? "$",
          timeFormat: data?.timeFormat ?? '12',
          dateFormat: data?.selectDateFomat ?? "MM/DD/YYYY",
        })
      };
      return this.data.userCreateSetting({ input: inputData }).pipe(
        tapResponse(
          (response) => {
            const setting = response.data?.created;
            const config = JSON.parse(setting?.value ?? '{}');
            this.fuseConfigService.setFormlyConfig(config.language, config.currency, config.dateFormat, config.timeFormat);
            this.toast.success('Successfully created PageSetting', { duration: 3000 });
            this.patchState({
              loading: false,
              canGoNext: true,
            })
          },
          (error: any) => {
            if (error.graphQLErrors) {
              this.toast.error(error.message, { duration: 3000 })
            } else {
              this.toast.error(error.Message, { duration: 3000 })
              this.formService.setErrors(error.Data)
              this.patchState({
                loading: false
              })
            }
          }
        )
      )
    })
  ))

  updateFormlySettingsEffect = this.effect<any>(data$ => data$.pipe(
    tap((data) => { this.patchState({ loading: true }) }),
    switchMap((data) => {

      const updateData = JSON.stringify({
        language: data?.selectLanguage,
        currency: data?.selectCurrency,
        dateFormat: data?.selectDateFormat,
        timeFormat: data?.timeFormat
      });
      console.log({ updateData })
      return this.data.userUpdateSetting({ settingId: this.get().formlySetting?.id, input: { value: updateData, name: this.get().formlySetting?.name }}).pipe(
        tapResponse(
          (response) => {
            const config = JSON.parse(response.data?.updated?.value ?? '{}');
            this.fuseConfigService.setFormlyConfig(config.language, config.currency, config.dateFormat, config.timeFormat);
            this.toast.success('Successfully updated pageSetting', { duration: 3000 })
            this.patchState({
              loading: false,
              canGoNext: true,
            })
          },
          (error: any) => {
            if (error.graphQLErrors) {
              this.toast.error(error.message, { duration: 3000 })
            } else {
              this.toast.error(error.Message, { duration: 3000 })
              this.formService.setErrors(error.Data)
              this.patchState({
                loading: false
              })
            }
          }
        )
      );
    })
  ))
}
