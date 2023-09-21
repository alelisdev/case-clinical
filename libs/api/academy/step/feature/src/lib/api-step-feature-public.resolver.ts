
import { Resolver } from '@nestjs/graphql'

import {
  ApiStepDataAccessPublicService,
} from '@case-clinical/api/academy/step/data-access'


@Resolver()
export class ApiStepFeaturePublicResolver {
  constructor(private readonly service: ApiStepDataAccessPublicService) {}

}

