import { AttorneyBaseState, AttorneyBaseStore } from '../attorney-page.base.store'
import { FormlySettingsStore } from '@case-clinical/core/formly-setting'
import { Injectable, Injector } from '@angular/core'

export interface SettingState extends AttorneyBaseState {
  loading: boolean
  query: string
}

@Injectable()
export class SettingStore extends AttorneyBaseStore<SettingState> {
  constructor(injector: Injector, public formlySettingStore: FormlySettingsStore) {
    super(injector)
  }

  loading$ = this.select((s) => s.loading)
  formlySetting$ = this.formlySettingStore.formlySetting$

  vm$ = this.select(this.loading$, this.user$, (loading, user) => {
    return {
      loading,
      user,
    }
  })

  loadFormlySetting() {
    this.formlySettingStore.loadFormlySettingsEffect()
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
      query: '',
      loading: false,
    }
  }
}
