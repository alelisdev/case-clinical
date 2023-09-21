
import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput } from '@case-clinical/api/core/data-access'

import { AdminListWhereDoesItHurtInput } from './dto/admin-list-where-does-it-hurt.input'

@Injectable()
export class ApiWhereDoesItHurtDataAccessPublicService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

}

