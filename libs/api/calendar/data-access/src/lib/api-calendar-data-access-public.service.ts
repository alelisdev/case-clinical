
import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput } from '@case-clinical/api/core/data-access'

import { AdminListCalendarInput } from './dto/admin-list-calendar.input'

@Injectable()
export class ApiCalendarDataAccessPublicService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

}

