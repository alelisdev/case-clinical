
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateReconciliationPeriodTypeInput,
  AdminListReconciliationPeriodTypeInput,
  AdminUpdateReconciliationPeriodTypeInput,
  ApiReconciliationPeriodTypeDataAccessAdminService,
  ReconciliationPeriodType
} from '@case-clinical/api/reconciliation-period-type/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiReconciliationPeriodTypeFeatureAdminResolver {
  constructor(private readonly service: ApiReconciliationPeriodTypeDataAccessAdminService) {}

  @Query(() => [ReconciliationPeriodType], { nullable: true })
  adminReconciliationPeriodTypes(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListReconciliationPeriodTypeInput, nullable: true }) input?: AdminListReconciliationPeriodTypeInput,
  ) {
    return this.service.adminReconciliationPeriodTypes(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountReconciliationPeriodTypes(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListReconciliationPeriodTypeInput, nullable: true }) input?: AdminListReconciliationPeriodTypeInput,
  ) {
    return this.service.adminCountReconciliationPeriodTypes(admin.id, input)
  }





  @Query(() => ReconciliationPeriodType, { nullable: true })
  adminReconciliationPeriodType(@CtxUser() admin: User, @Args('reconciliationPeriodTypeId') reconciliationPeriodTypeId: string) {
    return this.service.adminReconciliationPeriodType(admin.id, reconciliationPeriodTypeId)
  }

  @Mutation(() => ReconciliationPeriodType, { nullable: true })
  adminCreateReconciliationPeriodType(@CtxUser() admin: User, @Args('input') input: AdminCreateReconciliationPeriodTypeInput,) {
    return this.service.adminCreateReconciliationPeriodType(admin.id, input)
  }

  @Mutation(() => ReconciliationPeriodType, { nullable: true })
  adminUpdateReconciliationPeriodType(
    @CtxUser() admin: User,
    @Args('reconciliationPeriodTypeId') reconciliationPeriodTypeId: string,
    @Args('input') input: AdminUpdateReconciliationPeriodTypeInput,
  ) {
    return this.service.adminUpdateReconciliationPeriodType(admin.id, reconciliationPeriodTypeId, input)
  }

  @Mutation(() => ReconciliationPeriodType, { nullable: true })
  adminDeleteReconciliationPeriodType(@CtxUser() admin: User, @Args('reconciliationPeriodTypeId') reconciliationPeriodTypeId: string) {
    return this.service.adminDeleteReconciliationPeriodType(admin.id, reconciliationPeriodTypeId)
  }
}

