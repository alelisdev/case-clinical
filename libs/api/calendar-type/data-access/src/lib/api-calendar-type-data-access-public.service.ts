
import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput } from '@case-clinical/api/core/data-access'

import { AdminListCalendarTypeInput } from './dto/admin-list-calendar-type.input'

@Injectable()
export class ApiCalendarTypeDataAccessPublicService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

}

