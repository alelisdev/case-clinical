

import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiPageHeaderModule } from '@case-clinical/web/ui/page-header'
import { WebUiPanelModule } from '@case-clinical/web/ui/panel'
import { WebFormsUiChatComponent } from './web-chat-ui-form.component'
import { WebChatTableViewComponent } from './web-chat-table-view.component'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'


@NgModule({
  exports: [WebFormsUiChatComponent, WebChatTableViewComponent],
  declarations: [WebFormsUiChatComponent, WebChatTableViewComponent],
  imports: [CommonModule, RouterModule, WebUiFormModule, WebUiButtonModule, WebUiPageHeaderModule, WebUiPageModule, WebUiPanelModule, WebCoreFeatureModule],
})
export class WebFormsUiChatModule {}
