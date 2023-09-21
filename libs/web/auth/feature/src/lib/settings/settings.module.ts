/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { CommonModule } from '@angular/common';
import { CoreFormlySettingModule } from '@case-clinical/core/formly-setting'
import { FeatureItemComponent } from './settings-feature/feature.item.component';
import { FuseAlertModule } from '@fuse/components/alert'
import { FuseCardModule } from '@fuse/components/card';
import { FuseNavigationModule } from '@fuse/components/navigation';
import { MatButtonModule } from '@angular/material/button'
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio'
import { MatSelectModule } from '@angular/material/select'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { NgModule } from '@angular/core'
import { NormalSettingsComponent } from './normal-settings/normal-settings.component';
import { FormlySettingsComponent } from './formly-settings/formly-settings.component'
import { RoleSelectComponent } from './settings-role/role-select.component';
import { RouterModule } from '@angular/router'
import { ServerUrlPipe } from './pipes/server-url.pipe';
import { SettingsAccountComponent } from './account/account.component'
import { SettingsComponent } from './settings.component'
import { SettingsFeatureComponent } from './settings-feature/settings-feature.component'
import { SettingsNotificationsComponent } from './notifications/notifications.component'
import { SettingsPlanBillingComponent } from './plan-billing/plan-billing.component'
import { SettingsRoleComponent } from './settings-role/settings-role.component'
import { settingsRoutes } from './settings.routing'
import { SettingsSecurityComponent } from './security/security.component'
import { SettingsService } from './business-logic/settings.service'
import { SettingsTeamComponent } from './team/team.component'
import { SettingsTenantComponent } from './settings-tenant/settings-tenant.component'
import { SharedModule } from 'libs/shared/shared.module'
import { SignUpSettingsComponent } from './sign-up-settings/sign-up-settings.component';
import { ThemeSettingsModule } from '@fuse/services/settings'
import { UiFormFieldModule, WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui';
import { WebFeaturesTableViewComponent } from './settings-role/tables/features-table';
import { WebNavigationTableViewComponent } from './settings-role/tables/routing-table-view.component';
import { WebRoleTableViewComponent } from './team/roles-table';
import { WebUiButtonModule } from '@case-clinical/web/ui/button';
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiPaginationModule } from '@case-clinical/web/ui/pagination'
import { WebUiTabModule } from '@case-clinical/web/ui/tab';

@NgModule({
  declarations: [
    FeatureItemComponent,
    NormalSettingsComponent,
    FormlySettingsComponent,
    RoleSelectComponent,
    ServerUrlPipe,
    SettingsAccountComponent,
    SettingsComponent,
    SettingsFeatureComponent,
    SettingsNotificationsComponent,
    SettingsPlanBillingComponent,
    SettingsRoleComponent,
    SettingsSecurityComponent,
    SettingsTeamComponent,
    SettingsTenantComponent,
    SignUpSettingsComponent,
    WebFeaturesTableViewComponent,
    WebNavigationTableViewComponent,
    WebRoleTableViewComponent,
  ],
  imports: [
    CommonModule,
    CoreFormlySettingModule,
    FuseAlertModule,
    FuseAlertModule,
    FuseCardModule,
    FuseNavigationModule,
    MatButtonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatFormFieldModule,
    MatIconModule,
    MatIconModule,
    MatInputModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRadioModule,
    MatSelectModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatStepperModule,
    MatTabsModule,
    RouterModule.forChild(settingsRoutes),
    SharedModule,
    ThemeSettingsModule,
    UiFormFieldModule,
    WebDatatableUiModule,
    WebDatatableUiModule,
    WebUiButtonModule,
    WebUiFormlyDesignerModule,
    WebUiFormlyDesignerModule,
    WebUiFormModule,
    WebUiFormModule,
    WebUiPaginationModule,
    WebUiTabModule,
  ],
  providers: [SettingsService],
})
export class SettingsModule {}
