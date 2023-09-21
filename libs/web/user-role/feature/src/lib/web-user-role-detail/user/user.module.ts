
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
                              import('./user-list/user-list.module').then((m) => m.UserListModule),
                          },
                          {
                            path: 'create',
                            loadChildren: () =>
                              import('./user-create/user-create.module').then((m) => m.UserCreateModule),
                          },
                          {
                            path: ':userId',
                            children: [
                              {
                                path: '',
                                loadChildren: () =>
                                  import('./user-detail/user-detail.module').then((m) => m.UserDetailModule),
                              },
                              {
                                path: 'edit',
                                loadChildren: () =>
                                  import('./user-edit/user-edit.module').then((m) => m.UserEditModule),
                              },
                            ],
                          },
                        ]),
                      ],
                    })
                    export class UserModule {}
                    