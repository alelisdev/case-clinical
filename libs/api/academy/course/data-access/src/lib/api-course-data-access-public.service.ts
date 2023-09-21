import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput } from '@case-clinical/api/core/data-access'

@Injectable()
export class ApiCourseDataAccessPublicService {
  constructor(private readonly data: ApiCoreDataAccessService) {}
}

