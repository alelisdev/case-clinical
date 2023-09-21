
import { Resolver } from '@nestjs/graphql'

import {
  ApiPlanDataAccessPublicService,
} from '@case-clinical/api/plan/data-access'


@Resolver()
export class ApiPlanFeaturePublicResolver {
  constructor(private readonly service: ApiPlanDataAccessPublicService) {}

}

