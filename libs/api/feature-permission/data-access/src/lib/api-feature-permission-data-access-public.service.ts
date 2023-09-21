
import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput } from '@case-clinical/api/core/data-access'

import { AdminListFeaturePermissionInput } from './dto/admin-list-feature-permission.input'

@Injectable()
export class ApiFeaturePermissionDataAccessPublicService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

}

