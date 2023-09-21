
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateChatInput,
  AdminListChatInput,
  AdminUpdateChatInput,
  ApiChatDataAccessAdminService,
  Chat
} from '@case-clinical/api/chat/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListMessageInput, Message } from '@case-clinical/api/message/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiChatFeatureAdminResolver {
  constructor(private readonly service: ApiChatDataAccessAdminService) {}

  @Query(() => [Chat], { nullable: true })
  adminChats(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListChatInput, nullable: true }) input?: AdminListChatInput,
  ) {
    return this.service.adminChats(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountChats(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListChatInput, nullable: true }) input?: AdminListChatInput,
  ) {
    return this.service.adminCountChats(admin.id, input)
  }



  @Query(() => [Message], { nullable: true })
  adminChatMessages(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListMessageInput, nullable: true }) input?: AdminListMessageInput,
  ) {
    return this.service.adminChatMessages(admin.id, input)
  }



  @Query(() => CorePaging, { nullable: true })
  adminCountChatMessages(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListMessageInput, nullable: true }) input?: AdminListMessageInput,
  ) {
    return this.service.adminCountChatMessages(admin.id, input)
  }


  @Query(() => Chat, { nullable: true })
  adminChat(@CtxUser() admin: User, @Args('chatId') chatId: string) {
    return this.service.adminChat(admin.id, chatId)
  }

  @Mutation(() => Chat, { nullable: true })
  adminCreateChat(@CtxUser() admin: User, @Args('input') input: AdminCreateChatInput,) {
    return this.service.adminCreateChat(admin.id, input)
  }

  @Mutation(() => Chat, { nullable: true })
  adminUpdateChat(
    @CtxUser() admin: User,
    @Args('chatId') chatId: string,
    @Args('input') input: AdminUpdateChatInput,
  ) {
    return this.service.adminUpdateChat(admin.id, chatId, input)
  }

  @Mutation(() => Chat, { nullable: true })
  adminDeleteChat(@CtxUser() admin: User, @Args('chatId') chatId: string) {
    return this.service.adminDeleteChat(admin.id, chatId)
  }
}

