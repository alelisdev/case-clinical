import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'
import { ApiCourseDataAccessAdminService } from './api-course-data-access-admin.service'
import { ApiCourseDataAccessPublicService } from './api-course-data-access-public.service'
import { ApiCourseDataAccessUserService } from './api-course-data-access-user.service'
import { Module } from '@nestjs/common'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiCourseDataAccessAdminService, ApiCourseDataAccessUserService, ApiCourseDataAccessPublicService],
  exports: [ApiCourseDataAccessAdminService, ApiCourseDataAccessUserService, ApiCourseDataAccessPublicService],
})
export class ApiCourseDataAccessModule {}
