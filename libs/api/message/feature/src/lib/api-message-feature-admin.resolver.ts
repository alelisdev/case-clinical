
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateMessageInput,
  AdminListMessageInput,
  AdminUpdateMessageInput,
  ApiMessageDataAccessAdminService,
  Message
} from '@case-clinical/api/message/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiMessageFeatureAdminResolver {
  constructor(private readonly service: ApiMessageDataAccessAdminService) {}

  @Query(() => [Message], { nullable: true })
  adminMessages(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListMessageInput, nullable: true }) input?: AdminListMessageInput,
  ) {
    return this.service.adminMessages(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountMessages(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListMessageInput, nullable: true }) input?: AdminListMessageInput,
  ) {
    return this.service.adminCountMessages(admin.id, input)
  }





  @Query(() => Message, { nullable: true })
  adminMessage(@CtxUser() admin: User, @Args('messageId') messageId: string) {
    return this.service.adminMessage(admin.id, messageId)
  }

  @Mutation(() => Message, { nullable: true })
  adminCreateMessage(@CtxUser() admin: User, @Args('input') input: AdminCreateMessageInput,) {
    return this.service.adminCreateMessage(admin.id, input)
  }

  @Mutation(() => Message, { nullable: true })
  adminUpdateMessage(
    @CtxUser() admin: User,
    @Args('messageId') messageId: string,
    @Args('input') input: AdminUpdateMessageInput,
  ) {
    return this.service.adminUpdateMessage(admin.id, messageId, input)
  }

  @Mutation(() => Message, { nullable: true })
  adminDeleteMessage(@CtxUser() admin: User, @Args('messageId') messageId: string) {
    return this.service.adminDeleteMessage(admin.id, messageId)
  }
}

