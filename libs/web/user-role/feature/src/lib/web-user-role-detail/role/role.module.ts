
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
                              import('./role-list/role-list.module').then((m) => m.RoleListModule),
                          },
                          {
                            path: 'create',
                            loadChildren: () =>
                              import('./role-create/role-create.module').then((m) => m.RoleCreateModule),
                          },
                          {
                            path: ':roleId',
                            children: [
                              {
                                path: '',
                                loadChildren: () =>
                                  import('./role-detail/role-detail.module').then((m) => m.RoleDetailModule),
                              },
                              {
                                path: 'edit',
                                loadChildren: () =>
                                  import('./role-edit/role-edit.module').then((m) => m.RoleEditModule),
                              },
                            ],
                          },
                        ]),
                      ],
                    })
                    export class RoleModule {}
                    