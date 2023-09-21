
import { Resolver } from '@nestjs/graphql'

import {
  ApiRoleFeatureDataAccessPublicService,
} from '@case-clinical/api/role-feature/data-access'


@Resolver()
export class ApiRoleFeatureFeaturePublicResolver {
  constructor(private readonly service: ApiRoleFeatureDataAccessPublicService) {}

}

