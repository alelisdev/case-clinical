
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateWriteOffInput,
  AdminListWriteOffInput,
  AdminUpdateWriteOffInput,
  ApiWriteOffDataAccessAdminService,
  WriteOff
} from '@case-clinical/api/write-off/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListCaseAccountInput, CaseAccount } from '@case-clinical/api/case-account/data-access'
import { AdminListWriteOffStatusInput, WriteOffStatus } from '@case-clinical/api/write-off-status/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiWriteOffFeatureAdminResolver {
  constructor(private readonly service: ApiWriteOffDataAccessAdminService) {}

  @Query(() => [WriteOff], { nullable: true })
  adminWriteOffs(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListWriteOffInput, nullable: true }) input?: AdminListWriteOffInput,
  ) {
    return this.service.adminWriteOffs(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountWriteOffs(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListWriteOffInput, nullable: true }) input?: AdminListWriteOffInput,
  ) {
    return this.service.adminCountWriteOffs(admin.id, input)
  }





  @Query(() => WriteOff, { nullable: true })
  adminWriteOff(@CtxUser() admin: User, @Args('writeOffId') writeOffId: string) {
    return this.service.adminWriteOff(admin.id, writeOffId)
  }

  @Mutation(() => WriteOff, { nullable: true })
  adminCreateWriteOff(@CtxUser() admin: User, @Args('input') input: AdminCreateWriteOffInput,) {
    return this.service.adminCreateWriteOff(admin.id, input)
  }

  @Mutation(() => WriteOff, { nullable: true })
  adminUpdateWriteOff(
    @CtxUser() admin: User,
    @Args('writeOffId') writeOffId: string,
    @Args('input') input: AdminUpdateWriteOffInput,
  ) {
    return this.service.adminUpdateWriteOff(admin.id, writeOffId, input)
  }

  @Mutation(() => WriteOff, { nullable: true })
  adminDeleteWriteOff(@CtxUser() admin: User, @Args('writeOffId') writeOffId: string) {
    return this.service.adminDeleteWriteOff(admin.id, writeOffId)
  }
}

