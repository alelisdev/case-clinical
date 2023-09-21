
import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput } from '@case-clinical/api/core/data-access'

import { AdminListUserFeaturePermissionInput } from './dto/admin-list-user-feature-permission.input'

@Injectable()
export class ApiUserFeaturePermissionDataAccessPublicService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

}

