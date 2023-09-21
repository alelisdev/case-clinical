import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService } from '@case-clinical/api/core/data-access'

@Injectable()
export class ApiTenantDataAccessPublicService {
  constructor(private readonly data: ApiCoreDataAccessService) {}
}
