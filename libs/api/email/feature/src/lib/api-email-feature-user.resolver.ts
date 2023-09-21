import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateEmailInput,
  UserListEmailInput,
  UserUpdateEmailInput,
  ApiEmailDataAccessUserService,
  Email,
  Search,
} from '@case-clinical/api/email/data-access'
import { CorePaging } from '@case-clinical/api/core/data-access'
import { CtxUser, GqlAuthGuard } from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiEmailFeatureUserResolver {
  constructor(private readonly service: ApiEmailDataAccessUserService) {}

  @Query(() => [Email], { nullable: true })
  userEmails(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListEmailInput, nullable: true }) input?: UserListEmailInput,
  ) {
    return this.service.userEmails(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountEmails(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListEmailInput, nullable: true }) input?: UserListEmailInput,
  ) {
    return this.service.userCountEmails(user.id, input)
  }

  @Query(() => Email, { nullable: true })
  userEmail(@CtxUser() user: User, @Args('emailId') emailId: string) {
    return this.service.userEmail(user.id, emailId)
  }

  @Mutation(() => Email, { nullable: true })
  userCreateEmail(@CtxUser() user: User, @Args('input') input: UserCreateEmailInput) {
    return this.service.userCreateEmail(user.id, input)
  }

  @Mutation(() => Email, { nullable: true })
  userUpdateEmail(@CtxUser() user: User, @Args('emailId') emailId: string, @Args('input') input: UserUpdateEmailInput) {
    return this.service.userUpdateEmail(user.id, emailId, input)
  }

  @Mutation(() => Email, { nullable: true })
  userDeleteEmail(@CtxUser() user: User, @Args('emailId') emailId: string) {
    return this.service.userDeleteEmail(user.id, emailId)
  }

  @Query(() => [Search], { nullable: true })
  userSearchEmails(@CtxUser() user: User, @Args('email') email: string) {
    return this.service.userSearchEmails(user.id, email)
  }
}
