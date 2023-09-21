import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebFormsUiTaskItemComponent } from './web-forms-ui-task-item.component'
import { WebUiPageHeaderModule } from '@case-clinical/web/ui/page-header'

@NgModule({
  exports: [WebFormsUiTaskItemComponent],
  declarations: [WebFormsUiTaskItemComponent],
  imports: [CommonModule, RouterModule, WebUiFormModule, WebUiButtonModule, WebUiPageHeaderModule],
})
export class WebFormsUiTaskItemModule {}
