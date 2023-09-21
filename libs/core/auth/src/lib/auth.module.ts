import { NgModule } from '@angular/core'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { AuthService } from '@case-clinical/core/auth'
import { AuthInterceptor } from '@case-clinical/core/auth'
import { NoAuthGuard } from './guards/noAuth.guard'
import { AuthGuard } from './guards/auth.guard'

@NgModule({
    imports: [HttpClientModule],
    providers: [
        AuthGuard,
        NoAuthGuard,
        AuthService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
    ],
})
export class AuthModule {}
