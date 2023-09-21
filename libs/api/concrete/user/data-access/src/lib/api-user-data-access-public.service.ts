
import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput } from '@case-clinical/api/core/data-access'

import { AdminListUserInput } from './dto/admin-list-user.input'

@Injectable()
export class ApiUserDataAccessPublicService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

}

