
import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput } from '@case-clinical/api/core/data-access'

import { AdminListNavigationInput } from './dto/admin-list-navigation.input'

@Injectable()
export class ApiNavigationDataAccessPublicService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

}

