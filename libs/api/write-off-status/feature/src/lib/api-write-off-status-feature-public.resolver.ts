
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListWriteOffStatusInput,
  ApiWriteOffStatusDataAccessPublicService,
  WriteOffStatus,
} from '@case-clinical/api/write-off-status/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiWriteOffStatusFeaturePublicResolver {
  constructor(private readonly service: ApiWriteOffStatusDataAccessPublicService) {}
           
  @Query(() => [WriteOffStatus], { nullable: true })
  publicWriteOffStatuses(
    @Args({ name: 'input', type: () => UserListWriteOffStatusInput, nullable: true }) input?: UserListWriteOffStatusInput,
  ) {
    return this.service.publicWriteOffStatuses(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountWriteOffStatuses(
    @Args({ name: 'input', type: () => UserListWriteOffStatusInput, nullable: true }) input?: UserListWriteOffStatusInput,
  ) {
    return this.service.publicCountWriteOffStatuses(input)
  }

  @Query(() => [WriteOffStatus], { nullable: true })
  publicSelectWriteOffStatuses(
    @Args({ name: 'input', type: () => UserListWriteOffStatusInput, nullable: true }) input?: UserListWriteOffStatusInput,
  ) {
    return this.service.publicSelectWriteOffStatuses(input)
  }

  @Query(() => WriteOffStatus, { nullable: true })
  publicWriteOffStatus(@Args('writeOffStatusId') writeOffStatusId: string) {
    return this.service.publicWriteOffStatus(writeOffStatusId)
  }
}
