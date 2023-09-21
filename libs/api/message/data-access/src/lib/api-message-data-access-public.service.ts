
import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput } from '@case-clinical/api/core/data-access'

import { AdminListMessageInput } from './dto/admin-list-message.input'

@Injectable()
export class ApiMessageDataAccessPublicService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

}

