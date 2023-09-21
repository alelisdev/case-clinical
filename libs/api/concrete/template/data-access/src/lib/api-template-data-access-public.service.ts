
import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput } from '@case-clinical/api/core/data-access'

import { AdminListTemplateInput } from './dto/admin-list-template.input'

@Injectable()
export class ApiTemplateDataAccessPublicService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

}

