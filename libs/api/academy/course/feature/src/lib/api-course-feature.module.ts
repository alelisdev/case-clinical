
import { Module } from '@nestjs/common'
import { ApiCourseDataAccessModule } from '@case-clinical/api/academy/course/data-access'

import { ApiCourseFeatureAdminResolver } from './api-course-feature-admin.resolver'
import { ApiCourseFeaturePublicResolver } from './api-course-feature-public.resolver'
import { ApiCourseFeatureUserResolver } from './api-course-feature-user.resolver'

@Module({
  imports: [ApiCourseDataAccessModule],
  providers: [
        ApiCourseFeatureAdminResolver,
        ApiCourseFeaturePublicResolver,
        ApiCourseFeatureUserResolver
    ],
})
export class ApiCourseFeatureModule {}
