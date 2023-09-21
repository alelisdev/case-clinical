import { FormlySettingsStore } from '@case-clinical/core/formly-setting'
import { Injectable, Injector } from '@angular/core'
import { ProviderBaseState, ProviderBaseStore } from '../provider-page.base.store'

export interface SettingState extends ProviderBaseState {
  loading: boolean
  query: string
}

@Injectable()
export class SettingStore extends ProviderBaseStore<SettingState> {
  constructor(injector: Injector, public formlySettingStore: FormlySettingsStore) {
    super(injector)
  }

  /********* Selectors Start *********/
  loading$ = this.select((s) => s.loading)
  formlySetting$ = this.formlySettingStore.formlySetting$

  vm$ = this.select(this.loading$, this.user$, this.vendor$, (loading, user, vendor) => ({
    loading,
    user,
    vendor,
  }))
  /********* Selectors End *********/

  loadFormlySetting() {
    this.formlySettingStore.loadFormlySettingsEffect()
  }

  updateFormlySetting(formData: any) {
    console.log(formData)
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
