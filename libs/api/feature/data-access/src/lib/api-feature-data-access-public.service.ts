
import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput } from '@case-clinical/api/core/data-access'

import { AdminListFeatureInput } from './dto/admin-list-feature.input'

@Injectable()
export class ApiFeatureDataAccessPublicService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

}

