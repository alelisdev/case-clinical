import { WebUiNavsModule } from './../../../../../navs/src/lib/web-ui-navs.module';
import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { UiFormFieldModule } from '../form-field/ui-form-field.module'
import { UiFormNavbarComponent } from './ui-form-navbar.component'
import { NotificationCenterModule } from '@novu/notification-center-angular';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button'
import { MatDividerModule } from '@angular/material/divider'
import { MatIconModule } from '@angular/material/icon'
import { MatMenuModule } from '@angular/material/menu'

@NgModule({
  declarations: [UiFormNavbarComponent],
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    CommonModule,
    UiFormFieldModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    NotificationCenterModule,
    WebUiNavsModule,
    FormlyModule.forChild({
      wrappers: [
        {
          name: 'navbar',
          component: UiFormNavbarComponent,
        },
      ],
    }),
  ],
})
export class UiFormNavbarModule {}
