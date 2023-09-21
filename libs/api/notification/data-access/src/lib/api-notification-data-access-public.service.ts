
import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput } from '@case-clinical/api/core/data-access'

import { AdminListNotificationInput } from './dto/admin-list-notification.input'

@Injectable()
export class ApiNotificationDataAccessPublicService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

}

