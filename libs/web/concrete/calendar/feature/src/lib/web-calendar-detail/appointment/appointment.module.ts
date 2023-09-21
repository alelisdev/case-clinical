
                    import { CommonModule } from '@angular/common'
                    import { RouterModule } from '@angular/router'
                    import { NgModule } from '@angular/core'

                    @NgModule({
                      imports: [
                        CommonModule,
                        RouterModule.forChild([
                          {
                            path: '',
                            loadChildren: () =>
                              import('./appointment-list/appointment-list.module').then((m) => m.AppointmentListModule),
                          },
                          {
                            path: 'create',
                            loadChildren: () =>
                              import('./appointment-create/appointment-create.module').then((m) => m.AppointmentCreateModule),
                          },
                          {
                            path: ':appointmentId',
                            children: [
                              {
                                path: '',
                                loadChildren: () =>
                                  import('./appointment-detail/appointment-detail.module').then((m) => m.AppointmentDetailModule),
                              },
                              {
                                path: 'edit',
                                loadChildren: () =>
                                  import('./appointment-edit/appointment-edit.module').then((m) => m.AppointmentEditModule),
                              },
                            ],
                          },
                        ]),
                      ],
                    })
                    export class AppointmentModule {}
                    