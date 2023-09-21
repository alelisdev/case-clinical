import { CommonModule } from '@angular/common'
import { FormlySettingsStore } from './formly-settings.store'
import { NgModule } from '@angular/core'

@NgModule({
  imports: [CommonModule],
  providers: [FormlySettingsStore]
})
export class CoreFormlySettingModule {}
