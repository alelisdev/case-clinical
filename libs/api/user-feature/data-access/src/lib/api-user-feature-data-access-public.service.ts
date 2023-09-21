
import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput } from '@case-clinical/api/core/data-access'

import { AdminListUserFeatureInput } from './dto/admin-list-user-feature.input'

@Injectable()
export class ApiUserFeatureDataAccessPublicService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

}

