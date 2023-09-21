
import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput } from '@case-clinical/api/core/data-access'

import { AdminListTranslationInput } from './dto/admin-list-translation.input'

@Injectable()
export class ApiTranslationDataAccessPublicService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

}

