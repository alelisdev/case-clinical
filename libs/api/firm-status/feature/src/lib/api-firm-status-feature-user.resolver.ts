
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateFirmStatusInput,
  UserListFirmStatusInput,
  UserUpdateFirmStatusInput,
  UserUpdateFirmStatusesInput,
  ApiFirmStatusDataAccessUserService,
  FirmStatus,
} from '@case-clinical/api/firm-status/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiFirmStatusFeatureUserResolver {
  constructor(private readonly service: ApiFirmStatusDataAccessUserService) {}

  @Query(() => [FirmStatus], { nullable: true })
  userFirmStatuses(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListFirmStatusInput, nullable: true }) input?: UserListFirmStatusInput,
  ) {
    return this.service.userFirmStatuses(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountFirmStatuses(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListFirmStatusInput, nullable: true }) input?: UserListFirmStatusInput,
  ) {
    return this.service.userCountFirmStatuses(user.id, input)
  }

  @Query(() => [FirmStatus], { nullable: true })
  userSelectFirmStatuses(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListFirmStatusInput, nullable: true }) input?: UserListFirmStatusInput,
  ) {
    return this.service.userSelectFirmStatuses(user.id, input)
  }







  @Query(() => FirmStatus, { nullable: true })
  userFirmStatus(@CtxUser() user: User, @Args('firmStatusId') firmStatusId: string) {
    return this.service.userFirmStatus(user.id, firmStatusId)
  }

  @Mutation(() => FirmStatus, { nullable: true })
  userCreateFirmStatus(@CtxUser() user: User, @Args('input') input: UserCreateFirmStatusInput,) {
    return this.service.userCreateFirmStatus(user.id, input)
  }

  @Mutation(() => FirmStatus, { nullable: true })
  userUpdateFirmStatus(
    @CtxUser() user: User,
    @Args('firmStatusId') firmStatusId: string,
    @Args('input') input: UserUpdateFirmStatusInput,
  ) {
    return this.service.userUpdateFirmStatus(user.id, firmStatusId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateFirmStatuses(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateFirmStatusesInput,
  ) {
    return this.service.userUpdateFirmStatuses(user.id, input)
  }

  @Mutation(() => FirmStatus, { nullable: true })
  userDeleteFirmStatus(@CtxUser() user: User, @Args('firmStatusId') firmStatusId: string) {
    return this.service.userDeleteFirmStatus(user.id, firmStatusId)
  }
}

