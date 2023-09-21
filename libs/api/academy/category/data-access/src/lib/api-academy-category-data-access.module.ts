import { ApiAcademyCategoryDataAccessAdminService } from './api-academy-category-data-access-admin.service'
import { ApiAcademyCategoryDataAccessPublicService } from './api-academy-category-data-access-public.service'
import { ApiAcademyCategoryDataAccessUserService } from './api-academy-category-data-access-user.service'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'
import { Module } from '@nestjs/common'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiAcademyCategoryDataAccessAdminService, ApiAcademyCategoryDataAccessUserService, ApiAcademyCategoryDataAccessPublicService],
  exports: [ApiAcademyCategoryDataAccessAdminService, ApiAcademyCategoryDataAccessUserService, ApiAcademyCategoryDataAccessPublicService],
})
export class ApiAcademyCategoryDataAccessModule {}
