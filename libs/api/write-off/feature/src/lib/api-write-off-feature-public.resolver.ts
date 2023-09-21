
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListWriteOffInput,
  ApiWriteOffDataAccessPublicService,
  WriteOff,
} from '@case-clinical/api/write-off/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiWriteOffFeaturePublicResolver {
  constructor(private readonly service: ApiWriteOffDataAccessPublicService) {}
           
  @Query(() => [WriteOff], { nullable: true })
  publicWriteOffs(
    @Args({ name: 'input', type: () => UserListWriteOffInput, nullable: true }) input?: UserListWriteOffInput,
  ) {
    return this.service.publicWriteOffs(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountWriteOffs(
    @Args({ name: 'input', type: () => UserListWriteOffInput, nullable: true }) input?: UserListWriteOffInput,
  ) {
    return this.service.publicCountWriteOffs(input)
  }

  @Query(() => [WriteOff], { nullable: true })
  publicSelectWriteOffs(
    @Args({ name: 'input', type: () => UserListWriteOffInput, nullable: true }) input?: UserListWriteOffInput,
  ) {
    return this.service.publicSelectWriteOffs(input)
  }

  @Query(() => WriteOff, { nullable: true })
  publicWriteOff(@Args('writeOffId') writeOffId: string) {
    return this.service.publicWriteOff(writeOffId)
  }
}
