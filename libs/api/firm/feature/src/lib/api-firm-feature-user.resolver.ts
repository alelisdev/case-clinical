
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateFirmInput,
  UserListFirmInput,
  UserUpdateFirmInput,
  UserUpdateFirmsInput,
  ApiFirmDataAccessUserService,
  Firm,
} from '@case-clinical/api/firm/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListFirmStatusInput, FirmStatus } from '@case-clinical/api/firm-status/data-access'
import { UserListDocumentInput, Document } from '@case-clinical/api/document/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiFirmFeatureUserResolver {
  constructor(private readonly service: ApiFirmDataAccessUserService) {}

  @Query(() => [Firm], { nullable: true })
  userFirms(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListFirmInput, nullable: true }) input?: UserListFirmInput,
  ) {
    return this.service.userFirms(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountFirms(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListFirmInput, nullable: true }) input?: UserListFirmInput,
  ) {
    return this.service.userCountFirms(user.id, input)
  }

  @Query(() => [Firm], { nullable: true })
  userSelectFirms(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListFirmInput, nullable: true }) input?: UserListFirmInput,
  ) {
    return this.service.userSelectFirms(user.id, input)
  }







  @Query(() => Firm, { nullable: true })
  userFirm(@CtxUser() user: User, @Args('firmId') firmId: string) {
    return this.service.userFirm(user.id, firmId)
  }

  @Mutation(() => Firm, { nullable: true })
  userCreateFirm(@CtxUser() user: User, @Args('input') input: UserCreateFirmInput,) {
    return this.service.userCreateFirm(user.id, input)
  }

  @Mutation(() => Firm, { nullable: true })
  userUpdateFirm(
    @CtxUser() user: User,
    @Args('firmId') firmId: string,
    @Args('input') input: UserUpdateFirmInput,
  ) {
    return this.service.userUpdateFirm(user.id, firmId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateFirms(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateFirmsInput,
  ) {
    return this.service.userUpdateFirms(user.id, input)
  }

  @Mutation(() => Firm, { nullable: true })
  userDeleteFirm(@CtxUser() user: User, @Args('firmId') firmId: string) {
    return this.service.userDeleteFirm(user.id, firmId)
  }
}

