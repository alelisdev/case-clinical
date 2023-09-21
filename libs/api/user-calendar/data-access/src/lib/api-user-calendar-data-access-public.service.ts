
import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput } from '@case-clinical/api/core/data-access'

import { AdminListUserCalendarInput } from './dto/admin-list-user-calendar.input'

@Injectable()
export class ApiUserCalendarDataAccessPublicService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

}

