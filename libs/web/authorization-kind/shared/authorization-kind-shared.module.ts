
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AuthorizationKindBusinessProviderService } from './authorization-kind.business-provider.service'
import { WebAuthorizationKindFeatureStore } from './authorization-kind.store'


@NgModule({
  imports: [
    CommonModule,
],
  providers: [AuthorizationKindBusinessProviderService, WebAuthorizationKindFeatureStore],
})
export class WebAuthorizationKindSharedModule {}

