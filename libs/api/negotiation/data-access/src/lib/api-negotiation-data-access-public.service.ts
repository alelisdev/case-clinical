
import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput } from '@case-clinical/api/core/data-access'

import { AdminListNegotiationInput } from './dto/admin-list-negotiation.input'

@Injectable()
export class ApiNegotiationDataAccessPublicService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

}

