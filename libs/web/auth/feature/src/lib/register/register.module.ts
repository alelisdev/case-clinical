import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { WebAuthDataAccessModule } from '@case-clinical/web/auth/data-access'
import { AuthPageModule } from '@case-clinical/web/auth/ui'
import { RegisterComponent } from './register.component'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { DocumentViewerModule } from '@txtextcontrol/tx-ng-document-viewer'
import { MaterialExampleModule } from './material-example.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
const routes: Routes = [{ path: '', component: RegisterComponent }]

@NgModule({
  declarations: [RegisterComponent],
  imports: [CommonModule,     
    WebUiFormModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialExampleModule,
    DocumentViewerModule,
    RouterModule.forChild(routes), 
    AuthPageModule, 
    WebAuthDataAccessModule],
})
export class RegisterModule {}
