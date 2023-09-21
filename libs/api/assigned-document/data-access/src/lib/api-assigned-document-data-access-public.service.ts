
import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput } from '@case-clinical/api/core/data-access'

import { AdminListAssignedDocumentInput } from './dto/admin-list-assigned-document.input'

@Injectable()
export class ApiAssignedDocumentDataAccessPublicService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

}

