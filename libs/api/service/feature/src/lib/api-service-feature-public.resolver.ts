
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListServiceInput,
  ApiServiceDataAccessPublicService,
  Service,
} from '@case-clinical/api/service/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiServiceFeaturePublicResolver {
  constructor(private readonly service: ApiServiceDataAccessPublicService) {}
           
  @Query(() => [Service], { nullable: true })
  publicServices(
    @Args({ name: 'input', type: () => UserListServiceInput, nullable: true }) input?: UserListServiceInput,
  ) {
    return this.service.publicServices(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountServices(
    @Args({ name: 'input', type: () => UserListServiceInput, nullable: true }) input?: UserListServiceInput,
  ) {
    return this.service.publicCountServices(input)
  }

  @Query(() => [Service], { nullable: true })
  publicSelectServices(
    @Args({ name: 'input', type: () => UserListServiceInput, nullable: true }) input?: UserListServiceInput,
  ) {
    return this.service.publicSelectServices(input)
  }

  @Query(() => Service, { nullable: true })
  publicService(@Args('serviceId') serviceId: string) {
    return this.service.publicService(serviceId)
  }
}
