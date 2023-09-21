
import { Resolver } from '@nestjs/graphql'

import {
  ApiUserCourseProgressDataAccessPublicService,
} from '@case-clinical/api/academy/user-course-progress/data-access'


@Resolver()
export class ApiUserCourseProgressFeaturePublicResolver {
  constructor(private readonly service: ApiUserCourseProgressDataAccessPublicService) {}

}

