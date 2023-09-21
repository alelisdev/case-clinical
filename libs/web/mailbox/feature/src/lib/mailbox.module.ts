import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FuseFindByKeyPipeModule } from '@fuse/pipes/find-by-key';
import { FuseNavigationModule } from '@fuse/components/navigation';
import { FuseScrollbarModule } from '@fuse/directives/scrollbar';
import { FuseScrollResetModule } from '@fuse/directives/scroll-reset';
// import { SharedModule } from 'libs/shared/shared.module';
import { MailboxComponent } from './mailbox.component';
import { MailboxDetailsComponent } from './details/details.component';
import { MailboxListComponent } from './list/list.component';
import { MailboxSettingsComponent } from './settings/settings.component';
import { MailboxSidebarComponent } from './sidebar/sidebar.component';
import { mailboxRoutes } from './mailbox.routing';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
// import { WebUiMailComposeModule } from 'libs/web/ui/mail-compose/mail-compose.module'
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { SharedModule } from 'libs/shared/shared.module';
import { MailAuthComponent } from './auth/mail-auth.component';
import { WebUiButtonModule } from '@case-clinical/web/ui/button';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MailboxInterceptor } from './mailbox.interceptor';
import { MailBoxAuthGuard } from './mailbox-auth-guard.service';
import { MailboxFoldersResolver, MailboxLabelsResolver, MailboxMailResolver, MailboxMailsResolver } from './mailbox.resolvers';
import { MailboxService } from './mailbox.service';
import { DatePipe } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion'
import { NgSelectModule } from '@ng-select/ng-select'
import { WebUiMailComposeModule } from './mail-compose/mail-compose.module';
import { WebUiFilePreviewModule } from './file-preview/web-ui-file-preview.module';


@NgModule({
    declarations: [
        MailboxComponent,
        MailboxDetailsComponent,
        MailboxListComponent,
        MailboxSettingsComponent,
        MailboxSidebarComponent,
        MailAuthComponent
    ],
    imports     : [
        RouterModule.forChild(mailboxRoutes),
        MatButtonModule,
        MatCheckboxModule,
        MatDialogModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatProgressBarModule,
        MatSelectModule,
        MatSidenavModule,
        FuseFindByKeyPipeModule,
        FuseNavigationModule,
        FuseScrollbarModule,
        FuseScrollResetModule,
        SharedModule,
        HttpClientModule,
        WebUiMailComposeModule,
        WebUiButtonModule,
        WebUiFilePreviewModule,
        MatExpansionModule,
        NgSelectModule
    ],
    providers: [
        MailboxService,
        MailBoxAuthGuard,
        MailboxFoldersResolver,
        MailboxLabelsResolver,
        MailboxMailsResolver,
        MailboxMailResolver,
        DatePipe,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: MailboxInterceptor,
            multi: true
        },
    ]
})
export class MailboxModule
{
}
