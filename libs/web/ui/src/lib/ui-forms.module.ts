
                    import { CommonModule } from '@angular/common'
                    import { RouterModule } from '@angular/router'
                    import { NgModule } from '@angular/core'

                    @NgModule({
                      imports: [
                        CommonModule,
                        RouterModule.forChild([

                          {
                            path: 'recommended-treatment',
                            loadChildren: () =>
                              import('./recommended-treatment-form/recommended-treatment-form.module').then((m) => m.RecommendedTreatmentFormModule),
                          },

                        ]),
                      ],
                    })
                    export class UiFormsModule {}
