
import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput } from '@case-clinical/api/core/data-access'

import { AdminListPermissionInput } from './dto/admin-list-permission.input'

@Injectable()
export class ApiPermissionDataAccessPublicService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

}

