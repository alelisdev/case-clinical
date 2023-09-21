import { Route } from '@angular/router';
import { LandingHomeComponent } from './home.component';
import { StartComponent } from './start/start.component';
import {StepComponent} from './stepping/stepping.component';

export const landingHomeRoutes: Route[] = [
    {
        path     : '',
        component: LandingHomeComponent
    },
    {
        path     : 'start',
        component: StartComponent
    },
    {
        path : 'apply',
        component: StepComponent
    }
];
