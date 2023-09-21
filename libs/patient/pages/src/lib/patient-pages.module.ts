import { BookingsComponent } from './bookings/bookings.component'
import { BookingSuccessComponent } from './booking-success/booking-success.component'
import { ChangePasswordComponent } from './change-password/change-password.component'
import { CheckoutComponent } from './checkout/checkout.component'
import { CommonModule } from '@angular/common'
import { ConfirmAppointmentComponent } from './confirm-appointment/confirm-appointment.component'
import { CoreFormlySettingModule } from '@case-clinical/core/formly-setting'
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component'
import { DoctorsComponent } from './doctors/doctors.component'
import { FavoriteDoctorsComponent } from './favorite-doctors/favorite-doctors.component'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { NgModule } from '@angular/core'
import { NotificationsComponent } from './notifications/notifications.component'
import { PatientPortalStore } from './patient-portal.store'
import { ProfileComponent } from './profile/profile.component'
import { RouterModule } from '@angular/router'
import { SettingComponent } from './setting/setting.component'
import { SharedModule } from './../../../../shared/shared.module'
import { WebAuthStore } from '@case-clinical/web/auth/data-access'
import { WebPatientFeatureStore } from '@case-clinical/web/patient/shared'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebAppointmentFeatureStore } from '@case-clinical/web/appointment/shared';
@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    SharedModule,
    WebUiFormlyDesignerModule,
    WebUiFormModule,
    CoreFormlySettingModule,
    RouterModule.forChild([
      {
        path: 'dashboard',
        data: {
          initialize: ['patientPortalStore'],
        },
        loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'checkout',
        component: CheckoutComponent,
      },
      {
        path: 'setting',
        component: SettingComponent,
      },
      {
        path: 'booking',
        children: [
          {
            path: 'success',
            children: [
              {
                path: ':bookingId',
                component: BookingSuccessComponent,
              },
            ],
          },
          {
            path: ':doctorId',
            children: [
              {
                path: '',
                component: BookingsComponent,
              },
              {
                path: ':locationId',
                component: BookingsComponent,
              },
            ],
          },
        ],
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent,
      },
      {
        path: 'favorites',
        component: FavoriteDoctorsComponent,
      },
      {
        path: 'notifications',
        component: NotificationsComponent,
      },
      {
        path: 'appointments',
        children: [
          {
            path: ':appointmentId',
            children: [
              {
                path: 'confirm',
                component: ConfirmAppointmentComponent,
              },
              {
                path: '',
                pathMatch: 'full',
                redirectTo: 'confirm',
              },
            ]
          }
        ]
      },
      {
        path: 'providers',
        // component: DoctorsComponent,
        children: [
          { path: '', component: DoctorsComponent },
          {
            path: ':doctorId',
            // component: WebEmailFeatureComponent,
            children: [
              {
                path: 'details',
                component: DoctorProfileComponent,
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
  declarations: [
    BookingsComponent,
    BookingSuccessComponent,
    ChangePasswordComponent,
    CheckoutComponent,
    ConfirmAppointmentComponent,
    DoctorProfileComponent,
    DoctorsComponent,
    FavoriteDoctorsComponent,
    NotificationsComponent,
    ProfileComponent,
    SettingComponent,
  ],
  providers: [PatientPortalStore, WebPatientFeatureStore, WebAuthStore, WebAppointmentFeatureStore],
})
export class PatientPagesModule {}
