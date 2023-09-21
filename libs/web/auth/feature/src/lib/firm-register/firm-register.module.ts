import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { WebAuthDataAccessModule } from '@case-clinical/web/auth/data-access'
import { AuthPageModule } from '@case-clinical/web/auth/ui'
import { WebFirmCreateStepperComponent } from './web-firm-create-stepper.component'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { DocumentViewerModule } from '@txtextcontrol/tx-ng-document-viewer'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

const routes: Routes = [{ path: '', component: WebFirmCreateStepperComponent }]

@NgModule({
  declarations: [WebFirmCreateStepperComponent],
  imports: [CommonModule,     
    WebUiFormModule,
    FormsModule,
    ReactiveFormsModule,
    DocumentViewerModule,
    RouterModule.forChild(routes), 
    AuthPageModule, 
    WebAuthDataAccessModule],
})
export class FirmRegisterModule {}
