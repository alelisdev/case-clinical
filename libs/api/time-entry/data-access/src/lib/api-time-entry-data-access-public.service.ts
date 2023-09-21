
import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput } from '@case-clinical/api/core/data-access'

import { AdminListTimeEntryInput } from './dto/admin-list-time-entry.input'

@Injectable()
export class ApiTimeEntryDataAccessPublicService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

}

