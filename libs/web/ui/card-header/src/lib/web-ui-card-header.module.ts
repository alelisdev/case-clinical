import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiCardHeaderComponent } from './web-ui-card-header.component'
import { WebUiFormlyFormSwitchModule } from '@case-clinical/web/ui/formly-form-switch';

@NgModule({
  imports: [CommonModule, RouterModule, WebUiButtonModule, WebUiFormlyFormSwitchModule],
  declarations: [WebUiCardHeaderComponent],
  exports: [WebUiCardHeaderComponent],
})
export class WebUiCardHeaderModule {}
