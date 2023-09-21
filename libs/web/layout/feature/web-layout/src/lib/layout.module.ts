import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout.component';
import { EmptyLayoutModule } from '@case-clinical/empty-layout';
import { CenteredLayoutModule } from '@case-clinical/centered-layout';
import { EnterpriseLayoutModule } from '@case-clinical/enterprise-layout';
import { MaterialLayoutModule } from '@case-clinical/material-layout';
import { ModernLayoutModule } from '@case-clinical/modern-layout';
import { ClassicLayoutModule } from '@case-clinical/classic-layout';
import { ClassyLayoutModule } from '@case-clinical/classy-layout';
import { CompactLayoutModule } from '@case-clinical/compact-layout';
import { DenseLayoutModule } from '@case-clinical/dense-layout';
import { FuturisticLayoutModule } from '@case-clinical/futuristic-layout';
import { ThinLayoutModule } from '@case-clinical/thin-layout';
import { ThemeSettingsModule } from '@fuse/services/settings';
import { SharedModule } from 'libs/shared/shared.module';

const layoutModules = [
    // Empty
    EmptyLayoutModule,

    // Horizontal navigation
    CenteredLayoutModule,
    EnterpriseLayoutModule,
    MaterialLayoutModule,
    ModernLayoutModule,

    // Vertical navigation
    ClassicLayoutModule,
    ClassyLayoutModule,
    CompactLayoutModule,
    DenseLayoutModule,
    FuturisticLayoutModule,
    ThinLayoutModule
];

@NgModule({
    declarations: [
        LayoutComponent
    ],
    imports     : [
        SharedModule,
        ThemeSettingsModule,
        ...layoutModules
    ],
    exports     : [
        LayoutComponent,
        ...layoutModules
    ]
})
export class LayoutModule
{
}
