
import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput } from '@case-clinical/api/core/data-access'

import { AdminListRoleFeatureInput } from './dto/admin-list-role-feature.input'

@Injectable()
export class ApiRoleFeatureDataAccessPublicService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

}

