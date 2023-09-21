import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

import { WebUiStepComponent } from './web-ui-step.component'

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [WebUiStepComponent],
  exports: [WebUiStepComponent],
})
export class WebUiStepModule {}
