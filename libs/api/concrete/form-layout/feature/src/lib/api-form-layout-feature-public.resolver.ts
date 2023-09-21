import { FormLayout } from '../../../data-access/src/lib/models/form-layout.model';
import { Args, Query, Resolver } from '@nestjs/graphql'

import { ApiFormLayoutDataAccessService } from '@case-clinical/api/form-layout/data-access'

@Resolver()
export class ApiFormLayoutFeaturePublicResolver {
  constructor(private readonly service: ApiFormLayoutDataAccessService) { }

  @Query(() => FormLayout, { nullable: true })
  publicFormLayout(
    @Args({ name: 'formName', type: () => String, nullable: true }) formName?: string,
  ) {
    return this.service.publicFormLayout(formName)
  }
}

