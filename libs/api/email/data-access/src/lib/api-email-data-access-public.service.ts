
import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput } from '@case-clinical/api/core/data-access'

import { AdminListEmailInput } from './dto/admin-list-email.input'

@Injectable()
export class ApiEmailDataAccessPublicService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

}

