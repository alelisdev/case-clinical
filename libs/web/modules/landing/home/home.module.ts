import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'libs/shared/shared.module';
import { LandingHomeComponent } from './home.component';
import { landingHomeRoutes } from './home.routing';
import { LandingNavigationComponent } from './components/navigation.component';
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer';
import { WebUiFormModule } from '@case-clinical/web/ui/form';
import { StartComponent } from './start/start.component';
import {StepComponent} from './stepping/stepping.component';
@NgModule({
    declarations: [
      StartComponent,
        LandingHomeComponent,
        LandingNavigationComponent,
        StepComponent
    ],
    imports     : [
        RouterModule.forChild(landingHomeRoutes),
        MatButtonModule,
        MatIconModule,
        SharedModule,
        WebUiFormlyDesignerModule,
        WebUiFormModule,
    ]
})
export class LandingHomeModule
{
}
