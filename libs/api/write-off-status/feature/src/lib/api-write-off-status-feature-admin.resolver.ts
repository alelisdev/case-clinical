
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateWriteOffStatusInput,
  AdminListWriteOffStatusInput,
  AdminUpdateWriteOffStatusInput,
  ApiWriteOffStatusDataAccessAdminService,
  WriteOffStatus
} from '@case-clinical/api/write-off-status/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiWriteOffStatusFeatureAdminResolver {
  constructor(private readonly service: ApiWriteOffStatusDataAccessAdminService) {}

  @Query(() => [WriteOffStatus], { nullable: true })
  adminWriteOffStatuses(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListWriteOffStatusInput, nullable: true }) input?: AdminListWriteOffStatusInput,
  ) {
    return this.service.adminWriteOffStatuses(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountWriteOffStatuses(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListWriteOffStatusInput, nullable: true }) input?: AdminListWriteOffStatusInput,
  ) {
    return this.service.adminCountWriteOffStatuses(admin.id, input)
  }





  @Query(() => WriteOffStatus, { nullable: true })
  adminWriteOffStatus(@CtxUser() admin: User, @Args('writeOffStatusId') writeOffStatusId: string) {
    return this.service.adminWriteOffStatus(admin.id, writeOffStatusId)
  }

  @Mutation(() => WriteOffStatus, { nullable: true })
  adminCreateWriteOffStatus(@CtxUser() admin: User, @Args('input') input: AdminCreateWriteOffStatusInput,) {
    return this.service.adminCreateWriteOffStatus(admin.id, input)
  }

  @Mutation(() => WriteOffStatus, { nullable: true })
  adminUpdateWriteOffStatus(
    @CtxUser() admin: User,
    @Args('writeOffStatusId') writeOffStatusId: string,
    @Args('input') input: AdminUpdateWriteOffStatusInput,
  ) {
    return this.service.adminUpdateWriteOffStatus(admin.id, writeOffStatusId, input)
  }

  @Mutation(() => WriteOffStatus, { nullable: true })
  adminDeleteWriteOffStatus(@CtxUser() admin: User, @Args('writeOffStatusId') writeOffStatusId: string) {
    return this.service.adminDeleteWriteOffStatus(admin.id, writeOffStatusId)
  }
}

