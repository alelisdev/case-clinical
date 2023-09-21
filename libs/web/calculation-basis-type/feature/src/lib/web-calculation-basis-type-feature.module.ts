
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebCalculationBasisTypeFeatureComponent } from './web-calculation-basis-type-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-calculation-basis-type-list/web-calculation-basis-type-list.module').then((m) => m.WebCalculationBasisTypeListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-calculation-basis-type-create/web-calculation-basis-type-create.module').then((m) => m.WebCalculationBasisTypeCreateModule),
      },
      {
        path: ':calculationBasisTypeId',
        component: WebCalculationBasisTypeFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-calculation-basis-type-detail/web-calculation-basis-type-detail.module').then((m) => m.WebCalculationBasisTypeDetailModule),
          },
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'details'
          },
        ],
      },
    ]
),
    WebUiPageModule,
    WebUiSidebarPageModule,
  ],
  declarations: [WebCalculationBasisTypeFeatureComponent],
})
export class WebCalculationBasisTypeFeatureModule {}

