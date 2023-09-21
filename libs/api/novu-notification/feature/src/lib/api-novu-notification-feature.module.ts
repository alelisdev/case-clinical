import { ApiNovuNotificationDataAccessModule } from '@case-clinical/api/novu-notification/data-access';
import { Module } from '@nestjs/common'
import { ApiNovuNotificationFeatureResolver } from './api-novu-notification-resolver';

@Module({
  imports: [
    ApiNovuNotificationDataAccessModule
  ],
  controllers: [],
  providers: [
    ApiNovuNotificationFeatureResolver
  ],
  exports: [],
})
export class ApiNovuNotificationFeatureModule {}
