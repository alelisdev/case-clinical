import { Module } from '@nestjs/common'
import { ApiNovuNotificationDataAccessService } from './api-novu-notification-data-access-service';
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

@Module({
  controllers: [],
  imports: [ApiCoreDataAccessModule],
  providers: [
    ApiNovuNotificationDataAccessService
  ],
  exports: [
    ApiNovuNotificationDataAccessService
  ],
})
export class ApiNovuNotificationDataAccessModule {}
