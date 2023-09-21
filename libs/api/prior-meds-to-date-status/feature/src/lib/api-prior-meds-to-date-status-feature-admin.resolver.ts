
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreatePriorMedsToDateStatusInput,
  AdminListPriorMedsToDateStatusInput,
  AdminUpdatePriorMedsToDateStatusInput,
  ApiPriorMedsToDateStatusDataAccessAdminService,
  PriorMedsToDateStatus
} from '@case-clinical/api/prior-meds-to-date-status/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiPriorMedsToDateStatusFeatureAdminResolver {
  constructor(private readonly service: ApiPriorMedsToDateStatusDataAccessAdminService) {}

  @Query(() => [PriorMedsToDateStatus], { nullable: true })
  adminPriorMedsToDateStatuses(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListPriorMedsToDateStatusInput, nullable: true }) input?: AdminListPriorMedsToDateStatusInput,
  ) {
    return this.service.adminPriorMedsToDateStatuses(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountPriorMedsToDateStatuses(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListPriorMedsToDateStatusInput, nullable: true }) input?: AdminListPriorMedsToDateStatusInput,
  ) {
    return this.service.adminCountPriorMedsToDateStatuses(admin.id, input)
  }





  @Query(() => PriorMedsToDateStatus, { nullable: true })
  adminPriorMedsToDateStatus(@CtxUser() admin: User, @Args('priorMedsToDateStatusId') priorMedsToDateStatusId: string) {
    return this.service.adminPriorMedsToDateStatus(admin.id, priorMedsToDateStatusId)
  }

  @Mutation(() => PriorMedsToDateStatus, { nullable: true })
  adminCreatePriorMedsToDateStatus(@CtxUser() admin: User, @Args('input') input: AdminCreatePriorMedsToDateStatusInput,) {
    return this.service.adminCreatePriorMedsToDateStatus(admin.id, input)
  }

  @Mutation(() => PriorMedsToDateStatus, { nullable: true })
  adminUpdatePriorMedsToDateStatus(
    @CtxUser() admin: User,
    @Args('priorMedsToDateStatusId') priorMedsToDateStatusId: string,
    @Args('input') input: AdminUpdatePriorMedsToDateStatusInput,
  ) {
    return this.service.adminUpdatePriorMedsToDateStatus(admin.id, priorMedsToDateStatusId, input)
  }

  @Mutation(() => PriorMedsToDateStatus, { nullable: true })
  adminDeletePriorMedsToDateStatus(@CtxUser() admin: User, @Args('priorMedsToDateStatusId') priorMedsToDateStatusId: string) {
    return this.service.adminDeletePriorMedsToDateStatus(admin.id, priorMedsToDateStatusId)
  }
}

