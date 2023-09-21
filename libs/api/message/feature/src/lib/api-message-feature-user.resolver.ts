
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateMessageInput,
  UserListMessageInput,
  UserUpdateMessageInput,
  ApiMessageDataAccessUserService,
  Message,
} from '@case-clinical/api/message/data-access'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiMessageFeatureUserResolver {
  constructor(private readonly service: ApiMessageDataAccessUserService) {}

  @Query(() => [Message], { nullable: true })
  userMessages(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListMessageInput, nullable: true }) input?: UserListMessageInput,
  ) {
    return this.service.userMessages(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountMessages(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListMessageInput, nullable: true }) input?: UserListMessageInput,
  ) {
    return this.service.userCountMessages(user.id, input)
  }






  @Query(() => Message, { nullable: true })
  userMessage(@CtxUser() user: User, @Args('messageId') messageId: string) {
    return this.service.userMessage(user.id, messageId)
  }

  @Mutation(() => Message, { nullable: true })
  userCreateMessage(@CtxUser() user: User, @Args('input') input: UserCreateMessageInput,) {
    return this.service.userCreateMessage(user.id, input)
  }

  @Mutation(() => Message, { nullable: true })
  userUpdateMessage(
    @CtxUser() user: User,
    @Args('messageId') messageId: string,
    @Args('input') input: UserUpdateMessageInput,
  ) {
    return this.service.userUpdateMessage(user.id, messageId, input)
  }

  @Mutation(() => Message, { nullable: true })
  userDeleteMessage(@CtxUser() user: User, @Args('messageId') messageId: string) {
    return this.service.userDeleteMessage(user.id, messageId)
  }
}

