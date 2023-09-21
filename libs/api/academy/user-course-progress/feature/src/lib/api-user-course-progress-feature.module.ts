import { ApiUserCourseProgressDataAccessModule } from '@case-clinical/api/academy/user-course-progress/data-access'
import { ApiUserCourseProgressFeatureAdminResolver } from './api-user-course-progress-feature-admin.resolver'
import { ApiUserCourseProgressFeaturePublicResolver } from './api-user-course-progress-feature-public.resolver'
import { ApiUserCourseProgressFeatureUserResolver } from './api-user-course-progress-feature-user.resolver'
import { Module } from '@nestjs/common'

@Module({
  imports: [ApiUserCourseProgressDataAccessModule],
  providers: [
        ApiUserCourseProgressFeatureAdminResolver,
        ApiUserCourseProgressFeaturePublicResolver,
        ApiUserCourseProgressFeatureUserResolver
    ],
})
export class ApiUserCourseProgressFeatureModule {}
