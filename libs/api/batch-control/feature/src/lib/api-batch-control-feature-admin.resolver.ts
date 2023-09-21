
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateBatchControlInput,
  AdminListBatchControlInput,
  AdminUpdateBatchControlInput,
  ApiBatchControlDataAccessAdminService,
  BatchControl
} from '@case-clinical/api/batch-control/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiBatchControlFeatureAdminResolver {
  constructor(private readonly service: ApiBatchControlDataAccessAdminService) {}

  @Query(() => [BatchControl], { nullable: true })
  adminBatchControls(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListBatchControlInput, nullable: true }) input?: AdminListBatchControlInput,
  ) {
    return this.service.adminBatchControls(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountBatchControls(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListBatchControlInput, nullable: true }) input?: AdminListBatchControlInput,
  ) {
    return this.service.adminCountBatchControls(admin.id, input)
  }





  @Query(() => BatchControl, { nullable: true })
  adminBatchControl(@CtxUser() admin: User, @Args('batchControlId') batchControlId: string) {
    return this.service.adminBatchControl(admin.id, batchControlId)
  }

  @Mutation(() => BatchControl, { nullable: true })
  adminCreateBatchControl(@CtxUser() admin: User, @Args('input') input: AdminCreateBatchControlInput,) {
    return this.service.adminCreateBatchControl(admin.id, input)
  }

  @Mutation(() => BatchControl, { nullable: true })
  adminUpdateBatchControl(
    @CtxUser() admin: User,
    @Args('batchControlId') batchControlId: string,
    @Args('input') input: AdminUpdateBatchControlInput,
  ) {
    return this.service.adminUpdateBatchControl(admin.id, batchControlId, input)
  }

  @Mutation(() => BatchControl, { nullable: true })
  adminDeleteBatchControl(@CtxUser() admin: User, @Args('batchControlId') batchControlId: string) {
    return this.service.adminDeleteBatchControl(admin.id, batchControlId)
  }
}

