
import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput } from '@case-clinical/api/core/data-access'

import { AdminListUserCourseProgressInput } from './dto/admin-list-user-course-progress.input'

@Injectable()
export class ApiUserCourseProgressDataAccessPublicService {
  constructor(private readonly data: ApiCoreDataAccessService) {}
}

