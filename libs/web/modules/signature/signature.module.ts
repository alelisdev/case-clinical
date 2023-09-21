import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'libs/shared/shared.module';
import { signatureRoutes } from './signature.routing';
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer';
import { WebUiFormModule } from '@case-clinical/web/ui/form';
import { DocumentViewerModule } from '@txtextcontrol/tx-ng-document-viewer';
import { SignatureComponent } from './signature.component';

@NgModule({
    declarations: [
      SignatureComponent
    ],
    imports     : [
        RouterModule.forChild(signatureRoutes),
        MatButtonModule,
        MatIconModule,
        SharedModule,
        DocumentViewerModule,
        WebUiFormlyDesignerModule,
        WebUiFormModule,
    ]
})
export class SignatureModule
{
}

