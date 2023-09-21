
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateChatInput,
  UserListChatInput,
  UserUpdateChatInput,
  ApiChatDataAccessUserService,
  Chat,
} from '@case-clinical/api/chat/data-access'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListMessageInput, Message } from '@case-clinical/api/message/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiChatFeatureUserResolver {
  constructor(private readonly service: ApiChatDataAccessUserService) {}

  @Query(() => [Chat], { nullable: true })
  userChats(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListChatInput, nullable: true }) input?: UserListChatInput,
  ) {
    return this.service.userChats(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountChats(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListChatInput, nullable: true }) input?: UserListChatInput,
  ) {
    return this.service.userCountChats(user.id, input)
  }



  @Query(() => [Message], { nullable: true })
  userChatMessages(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListMessageInput, nullable: true }) input?: UserListMessageInput,
  ) {
    return this.service.userChatMessages(user.id, input)
  }



  @Query(() => CorePaging, { nullable: true })
  userCountChatMessages(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListMessageInput, nullable: true }) input?: UserListMessageInput,
  ) {
    return this.service.userCountChatMessages(user.id, input)
  }



  @Query(() => Chat, { nullable: true })
  userChat(@CtxUser() user: User, @Args('chatId') chatId: string) {
    return this.service.userChat(user.id, chatId)
  }

  @Mutation(() => Chat, { nullable: true })
  userCreateChat(@CtxUser() user: User, @Args('input') input: UserCreateChatInput,) {
    return this.service.userCreateChat(user.id, input)
  }

  @Mutation(() => Chat, { nullable: true })
  userUpdateChat(
    @CtxUser() user: User,
    @Args('chatId') chatId: string,
    @Args('input') input: UserUpdateChatInput,
  ) {
    return this.service.userUpdateChat(user.id, chatId, input)
  }

  @Mutation(() => Chat, { nullable: true })
  userDeleteChat(@CtxUser() user: User, @Args('chatId') chatId: string) {
    return this.service.userDeleteChat(user.id, chatId)
  }
}

