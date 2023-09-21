import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { OverlayModule } from '@angular/cdk/overlay'
import { PortalModule } from '@angular/cdk/portal'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MessagesComponent } from './messages.component'
import { SharedModule } from 'libs/shared/shared.module'

@NgModule({
    declarations: [MessagesComponent],
    imports: [
        RouterModule,
        OverlayModule,
        PortalModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        SharedModule,
    ],
    exports: [MessagesComponent],
})
export class MessagesModule {}
