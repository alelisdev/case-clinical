import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatTooltipModule } from '@angular/material/tooltip'
import { NgModule } from '@angular/core'
import { NotificationCenterModule } from '@novu/notification-center-angular';
import { NotificationsComponent } from './notifications.component'
import { OverlayModule } from '@angular/cdk/overlay'
import { PortalModule } from '@angular/cdk/portal'
import { RouterModule } from '@angular/router'
import { SharedModule } from 'libs/shared/shared.module'

@NgModule({
    declarations: [NotificationsComponent],
    imports: [
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        NotificationCenterModule,
        OverlayModule,
        PortalModule,
        RouterModule,
        SharedModule,
    ],
    exports: [NotificationsComponent],
})
export class NotificationsModule {}
