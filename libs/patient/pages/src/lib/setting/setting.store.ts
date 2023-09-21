import { Injectable, Injector } from "@angular/core";
import { PatientBaseState, PatientBaseStore } from '../patient-pages.base.store';
import { FormlySettingsStore } from '@case-clinical/core/formly-setting'

export interface SettingState extends PatientBaseState{
  loading: boolean,
  query: string,
}

@Injectable()
export class SettingStore extends PatientBaseStore<SettingState> {
  constructor(injector: Injector, public formlySettingStore: FormlySettingsStore) {
    super(injector)
    this.formlySettingStore.loadFormlySettingsEffect();
  }

  loading$ = this.select(s => s.loading)
  formlySetting$ = this.formlySettingStore.formlySetting$;

  vm$ = this.select(
    this.loading$,
    this.user$,
    this.membership$,
    (
      loading,
      user,
      membership,
    ) => {
      return {
        loading,
        user,
        membership,
      }
    }
  )

  loadFormlySetting() {
    this.formlySettingStore.loadFormlySettingsEffect();
  }

  updateFormlySetting(formData: any) {
    if (formData?.id) {
      const { id, selectCurrency, selectDateFormat, selectLanguage, timeFormat } = formData
      this.formlySettingStore.updateFormlySettingsEffect({ id, selectCurrency, timeFormat, selectDateFormat, selectLanguage })
    } else {
      const { selectCurrency, selectDateFormat, selectLanguage, timeFormat } = formData
      this.formlySettingStore.createFormlySettingsEffect({ selectCurrency, selectDateFormat, timeFormat, selectLanguage })
    }
  }

  override getInitialState(): SettingState {
    return {
      query:"",
      loading:false
    }
  }
}
