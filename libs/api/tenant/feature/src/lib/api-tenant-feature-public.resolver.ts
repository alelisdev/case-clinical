import { Resolver } from '@nestjs/graphql'
import { ApiTenantDataAccessPublicService } from '@case-clinical/api/tenant/data-access'

@Resolver()
export class ApiTenantFeaturePublicResolver {
  constructor(private readonly service: ApiTenantDataAccessPublicService) {}
}
