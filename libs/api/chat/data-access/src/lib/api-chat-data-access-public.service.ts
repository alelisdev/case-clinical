
import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput } from '@case-clinical/api/core/data-access'

import { AdminListChatInput } from './dto/admin-list-chat.input'

@Injectable()
export class ApiChatDataAccessPublicService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

}

