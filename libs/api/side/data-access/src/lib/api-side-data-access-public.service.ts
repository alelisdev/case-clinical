
import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput } from '@case-clinical/api/core/data-access'

import { AdminListSideInput } from './dto/admin-list-side.input'

@Injectable()
export class ApiSideDataAccessPublicService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

}

