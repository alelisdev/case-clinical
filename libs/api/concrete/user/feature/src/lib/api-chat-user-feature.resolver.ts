import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  ApiChatUsersDataAccessService,
  ChatLoginModel,
  ChatModel,
  User,
  UserChatRoom,
  UserCreateChatRoom,
  UserJoinChatRoom,
} from '../../../../user/data-access/src'
import { CtxUser, GqlAuthAdminGuard } from '../../../../../auth/util/src'
// import { RefreshDocument } from '@case-clinical/shared/util/sdk'

@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiChatUserFeatureResolver {
  constructor(private readonly service: ApiChatUsersDataAccessService) {}

  @Query(() => [ChatModel], { nullable: true })
  async userChatList(@CtxUser() user: User) {
    return await this.service.getChatUsers()
  }

  @Query(() => ChatLoginModel, { nullable: true })
  async userChatLogin(@CtxUser() user: User) {
    return await this.service.loginMatrixUser(user.id)
  }

  @Mutation(() => UserChatRoom, { nullable: true })
  async createChatRoom(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserCreateChatRoom, nullable: true }) input?: UserCreateChatRoom,
  ) {
    return await this.service.createChatRoom(input)
  }

  @Mutation(() => UserChatRoom, { nullable: true })
  async joinChatRoom(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserJoinChatRoom, nullable: true }) input?: UserJoinChatRoom,
  ) {
    return await this.service.joinChatRoom(input)
  }
}
