
import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput } from '@case-clinical/api/core/data-access'

import { AdminListWhereDoesItHurtSpecialtyInput } from './dto/admin-list-where-does-it-hurt-specialty.input'

@Injectable()
export class ApiWhereDoesItHurtSpecialtyDataAccessPublicService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

}

