
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListUserInput,
  ApiUserDataAccessPublicService,
  User,
} from '@case-clinical/api/user/data-access'



@Resolver()
export class ApiUserFeaturePublicResolver {
  constructor(private readonly service: ApiUserDataAccessPublicService) {}
           
  @Query(() => [User], { nullable: true })
  publicUsers(
    @Args({ name: 'input', type: () => UserListUserInput, nullable: true }) input?: UserListUserInput,
  ) {
    return this.service.publicUsers(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountUsers(
    @Args({ name: 'input', type: () => UserListUserInput, nullable: true }) input?: UserListUserInput,
  ) {
    return this.service.publicCountUsers(input)
  }

  @Query(() => [User], { nullable: true })
  publicSelectUsers(
    @Args({ name: 'input', type: () => UserListUserInput, nullable: true }) input?: UserListUserInput,
  ) {
    return this.service.publicSelectUsers(input)
  }

  @Query(() => User, { nullable: true })
  publicUser(@Args('userId') userId: string) {
    return this.service.publicUser(userId)
  }
}
