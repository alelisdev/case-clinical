import { Route } from '@angular/router'
import { AcademyComponent } from './academy.component'
import { AcademyListComponent } from './list/list.component'
import { AcademyDetailsComponent } from './details/details.component'

export const academyRoutes: Route[] = [
  {
    path: '',
    component: AcademyComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: AcademyListComponent
      },
      {
        path: ':id',
        component: AcademyDetailsComponent
      },
    ],
  },
]
