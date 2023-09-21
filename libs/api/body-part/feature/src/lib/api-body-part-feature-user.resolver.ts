
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateBodyPartInput,
  UserListBodyPartInput,
  UserUpdateBodyPartInput,
  UserUpdateBodyPartsInput,
  ApiBodyPartDataAccessUserService,
  BodyPart,
} from '@case-clinical/api/body-part/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiBodyPartFeatureUserResolver {
  constructor(private readonly service: ApiBodyPartDataAccessUserService) {}

  @Query(() => [BodyPart], { nullable: true })
  userBodyParts(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListBodyPartInput, nullable: true }) input?: UserListBodyPartInput,
  ) {
    return this.service.userBodyParts(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountBodyParts(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListBodyPartInput, nullable: true }) input?: UserListBodyPartInput,
  ) {
    return this.service.userCountBodyParts(user.id, input)
  }

  @Query(() => [BodyPart], { nullable: true })
  userSelectBodyParts(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListBodyPartInput, nullable: true }) input?: UserListBodyPartInput,
  ) {
    return this.service.userSelectBodyParts(user.id, input)
  }







  @Query(() => BodyPart, { nullable: true })
  userBodyPart(@CtxUser() user: User, @Args('bodyPartId') bodyPartId: string) {
    return this.service.userBodyPart(user.id, bodyPartId)
  }

  @Mutation(() => BodyPart, { nullable: true })
  userCreateBodyPart(@CtxUser() user: User, @Args('input') input: UserCreateBodyPartInput,) {
    return this.service.userCreateBodyPart(user.id, input)
  }

  @Mutation(() => BodyPart, { nullable: true })
  userUpdateBodyPart(
    @CtxUser() user: User,
    @Args('bodyPartId') bodyPartId: string,
    @Args('input') input: UserUpdateBodyPartInput,
  ) {
    return this.service.userUpdateBodyPart(user.id, bodyPartId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateBodyParts(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateBodyPartsInput,
  ) {
    return this.service.userUpdateBodyParts(user.id, input)
  }

  @Mutation(() => BodyPart, { nullable: true })
  userDeleteBodyPart(@CtxUser() user: User, @Args('bodyPartId') bodyPartId: string) {
    return this.service.userDeleteBodyPart(user.id, bodyPartId)
  }
}

