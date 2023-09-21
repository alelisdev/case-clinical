
import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput } from '@case-clinical/api/core/data-access'

import { AdminListShortcutInput } from './dto/admin-list-shortcut.input'

@Injectable()
export class ApiShortcutDataAccessPublicService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

}

