import { AppointmentsComponent } from './appointments/appointments.component'
import { BlogAddComponent } from './blog-add/blog-add.component'
import { BlogDetailsComponent } from './blog-details/blog-details.component'
import { BlogsComponent } from './blogs/blogs.component'
import { ChangePasswordComponent } from './change-password/change-password.component'
import { CheckInComponent } from './checkIn/checkIn.component'
import { CommonModule } from '@angular/common'
import { CoreFormlySettingModule } from '@case-clinical/core/formly-setting'
import { DashboardComponent } from './dashboard/dashboard.component'
import { PaymentsComponent } from './payments/payments.component'
import { NgModule } from '@angular/core'
import { NotificationsComponent } from './notifications/notifications.component'
import { PatientProfileComponent } from './patient-profile/patient-profile.component'
import { PatientsComponent } from './patients/patients.component'
import { ProfileComponent } from './profile/profile.component'
import { ProviderDetailsComponent } from './provider-details/provider-details.component'
import { ProviderPortalStore } from './provider-portal.store'
import { ProvidersComponent } from './providers/providers.component'
import { RegisterComponent } from './register/register.component'
import { ReviewsComponent } from './reviews/reviews.component'
import { RouterModule } from '@angular/router'
import { SettingComponent } from './setting/setting.component'
import { SharedModule } from './../../../../shared/shared.module'
import { SheduleTimingComponent } from './shedule-timing/shedule-timing.component'
import { UiFormsSharedModule, UtilitySharedModule } from '@case-clinical/web/shared/ui'
import { WebAuthStore } from '@case-clinical/web/auth/data-access'
import { WebClinicalProviderFeatureStore } from '@case-clinical/web/clinical-provider/shared'
import { WebLocationFeatureStore } from '@case-clinical/web/location/shared'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebVendorFeatureStore } from '@case-clinical/web/vendor/shared'
import { EligibilityComponent } from './eligibility/eligibility.component'

@NgModule({
  declarations: [
    AppointmentsComponent,
    BlogAddComponent,
    BlogDetailsComponent,
    BlogsComponent,
    ChangePasswordComponent,
    CheckInComponent,
    DashboardComponent,
    PaymentsComponent,
    NotificationsComponent,
    PatientProfileComponent,
    PatientsComponent,
    ProfileComponent,
    ProviderDetailsComponent,
    ProvidersComponent,
    RegisterComponent,
    ReviewsComponent,
    SettingComponent,
    SheduleTimingComponent,
    EligibilityComponent,
  ],
  imports: [
    CommonModule,
    CoreFormlySettingModule,
    SharedModule,
    UiFormsSharedModule,
    UtilitySharedModule,
    WebUiFormlyDesignerModule,
    WebUiFormModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'eligibility',
        component: EligibilityComponent,
      },
      {
        path: 'appointments',
        children: [
          {
            path: '',
            component: AppointmentsComponent,
          },
          {
            path: ':appointmentId',
            children: [
              {
                path: 'checkIn',
                component: CheckInComponent,
              },
              {
                path: '',
                pathMatch: 'full',
                redirectTo: 'checkIn',
              },
            ],
          },
        ],
      },
      {
        path: 'schedule-timing',
        component: SheduleTimingComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'setting',
        component: SettingComponent,
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent,
      },
      {
        path: 'payments',
        component: PaymentsComponent,
      },
      {
        path: 'reviews',
        component: ReviewsComponent,
      },
      {
        path: 'notifications',
        component: NotificationsComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'providers',
        children: [
          {
            path: '',
            component: ProvidersComponent,
          },
          {
            path: ':providerId',
            children: [
              {
                path: 'details',
                component: ProviderDetailsComponent,
              },
              {
                path: '',
                pathMatch: 'full',
                redirectTo: 'details',
              },
            ],
          },
        ],
      },
      {
        path: 'patients',
        children: [
          { path: '', component: PatientsComponent },
          {
            path: ':patientId',
            children: [
              {
                path: 'details',
                component: PatientProfileComponent,
              },
              {
                path: '',
                pathMatch: 'full',
                redirectTo: 'details',
              },
            ],
          },
        ],
      },
      {
        path: 'blogs',
        children: [
          { path: '', component: BlogsComponent },
          { path: 'add', component: BlogAddComponent },
          {
            path: ':blogId',
            children: [
              {
                path: 'details',
                component: BlogDetailsComponent,
              },
              {
                path: '',
                pathMatch: 'full',
                redirectTo: 'details',
              },
            ],
          },
        ],
      },
    ]),
  ],
  providers: [
    ProviderPortalStore,
    WebAuthStore,
    WebClinicalProviderFeatureStore,
    WebVendorFeatureStore,
    WebLocationFeatureStore,
  ],
})
export class ProviderPagesModule {}
