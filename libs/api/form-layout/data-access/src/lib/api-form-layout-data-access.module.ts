import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access';
import { Module } from '@nestjs/common'
import { ApiFormLayoutDataAccessService } from './api-form-layout-data-access.service';

@Module({
  imports: [
    ApiCoreDataAccessModule
  ],
  providers: [
    ApiFormLayoutDataAccessService
  ],
  exports: [
    ApiFormLayoutDataAccessService
  ],
})
export class ApiFormLayoutDataAccessModule {}
