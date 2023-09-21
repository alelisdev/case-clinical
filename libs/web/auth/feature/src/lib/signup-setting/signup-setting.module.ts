import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { SharedModule } from 'libs/shared/shared.module'
import { MatRadioModule } from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';
import { FuseCardModule } from '@fuse/components/card'
import { FuseAlertModule } from '@fuse/components/alert'
import { MatSelectModule } from '@angular/material/select';
import { SettingsModule } from '../settings/settings.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MatFormFieldModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatProgressSpinnerModule,
    FuseCardModule,
    MatSelectModule,
    FuseAlertModule,
    MatRadioModule,
    SettingsModule,
    MatStepperModule,
  ],
})
export class SignupSettingModule {}
