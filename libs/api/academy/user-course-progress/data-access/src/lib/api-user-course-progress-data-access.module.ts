
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'
import { ApiUserCourseProgressDataAccessAdminService } from './api-user-course-progress-data-access-admin.service'
import { ApiUserCourseProgressDataAccessUserService } from './api-user-course-progress-data-access-user.service'
import { ApiUserCourseProgressDataAccessPublicService } from './api-user-course-progress-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiUserCourseProgressDataAccessAdminService, ApiUserCourseProgressDataAccessUserService, ApiUserCourseProgressDataAccessPublicService],
  exports: [ApiUserCourseProgressDataAccessAdminService, ApiUserCourseProgressDataAccessUserService, ApiUserCourseProgressDataAccessPublicService],
})
export class ApiUserCourseProgressDataAccessModule {}
