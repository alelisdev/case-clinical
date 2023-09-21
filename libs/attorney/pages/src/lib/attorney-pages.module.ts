import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DashboardComponent } from './dashboard/dashboard.component'
import { AppointmentsComponent } from './appointments/appointments.component'
import { DoctorsSearchComponent } from './doctors-search/doctors-search.component'
import { MembersComponent } from './members/members.component'
import { InvoicesComponent } from './invoices/invoices.component'
import { StatusesComponent } from './statuses/statuses.component'
import { TasksComponent } from './tasks/tasks.component'
import { ProfileComponent } from './profile/profile.component'
import { ChangePasswordComponent } from './change-password/change-password.component'
import { NotificationsComponent } from './notifications/notifications.component'
import { RouterModule } from '@angular/router'
import { SharedModule } from './../../../../shared/shared.module'
import { UiFormsSharedModule, UtilitySharedModule } from '@case-clinical/web/shared/ui'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { DoctorDetailsComponent } from './doctor-details/doctor-details.component'
import { AttorneyPortalStore } from './attorney-portal.store'
import { WebAttorneyFeatureStore } from '@case-clinical/web/attorney/shared'
import { WebAuthStore } from '@case-clinical/web/auth/data-access'
import { SettingComponent } from './setting/setting.component'
import { FavoriteDoctorsComponent } from './favorite-doctors/favorite-doctors.component'
import { CoreFormlySettingModule } from '@case-clinical/core/formly-setting'
import { WebAppointmentFeatureStore } from '@case-clinical/web/appointment/shared'
import { WebCaseStatusFeatureStore } from '@case-clinical/web/case-status/shared'
import { MemberDetailsComponent } from './member-details/member-details.component'
@NgModule({
  declarations: [
    DashboardComponent,
    AppointmentsComponent,
    DoctorsSearchComponent,
    DoctorDetailsComponent,
    MembersComponent,
    InvoicesComponent,
    StatusesComponent,
    TasksComponent,
    ProfileComponent,
    FavoriteDoctorsComponent,
    ChangePasswordComponent,
    NotificationsComponent,
    SettingComponent,
    MemberDetailsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    WebUiFormlyDesignerModule,
    WebUiFormModule,
    UtilitySharedModule,
    UiFormsSharedModule,
    CoreFormlySettingModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'appointments',
        component: AppointmentsComponent,
      },
      {
        path: 'tasks',
        component: TasksComponent,
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
        path: 'invoices',
        component: InvoicesComponent,
      },
      {
        path: 'members',
        children: [
          {
            path: '',
            component: MembersComponent,
          },
          {
            path: ':memberId',
            children: [
              {
                path: 'details',
                component: MemberDetailsComponent,
              },
              {
                path: '',
                pathMatch: 'full',
                redirectTo: 'details',
              }
            ]
          }
        ]
      },
      {
        path: 'statuses',
        component: StatusesComponent,
      },
      {
        path: 'favorites',
        component: FavoriteDoctorsComponent,
      },
      {
        path: 'notifications',
        children: [
          {
            path: '',
            component: NotificationsComponent,
          },
        ],
      },
      {
        path: 'setting',
        component: SettingComponent,
      },
      {
        path: 'providers',
        children: [
          {
            path: '',
            component: DoctorsSearchComponent,
          },
          {
            path: ':clinicalProviderLocationId',
            children: [
              {
                path: 'details',
                component: DoctorDetailsComponent,
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
    AttorneyPortalStore,
    WebAttorneyFeatureStore,
    WebAuthStore,
    WebAppointmentFeatureStore,
    WebCaseStatusFeatureStore,
  ],
})
export class AttorneyPagesModule {}
