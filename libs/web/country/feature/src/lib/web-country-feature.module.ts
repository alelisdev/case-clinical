
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebCountryFeatureComponent } from './web-country-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-country-list/web-country-list.module').then((m) => m.WebCountryListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-country-create/web-country-create.module').then((m) => m.WebCountryCreateModule),
      },
      {
        path: ':countryId',
        component: WebCountryFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-country-detail/web-country-detail.module').then((m) => m.WebCountryDetailModule),
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
  declarations: [WebCountryFeatureComponent],
})
export class WebCountryFeatureModule {}

