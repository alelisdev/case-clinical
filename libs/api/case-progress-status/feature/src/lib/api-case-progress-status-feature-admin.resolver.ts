
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateCaseProgressStatusInput,
  AdminListCaseProgressStatusInput,
  AdminUpdateCaseProgressStatusInput,
  ApiCaseProgressStatusDataAccessAdminService,
  CaseProgressStatus
} from '@case-clinical/api/case-progress-status/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiCaseProgressStatusFeatureAdminResolver {
  constructor(private readonly service: ApiCaseProgressStatusDataAccessAdminService) {}

  @Query(() => [CaseProgressStatus], { nullable: true })
  adminCaseProgressStatuses(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListCaseProgressStatusInput, nullable: true }) input?: AdminListCaseProgressStatusInput,
  ) {
    return this.service.adminCaseProgressStatuses(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountCaseProgressStatuses(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListCaseProgressStatusInput, nullable: true }) input?: AdminListCaseProgressStatusInput,
  ) {
    return this.service.adminCountCaseProgressStatuses(admin.id, input)
  }





  @Query(() => CaseProgressStatus, { nullable: true })
  adminCaseProgressStatus(@CtxUser() admin: User, @Args('caseProgressStatusId') caseProgressStatusId: string) {
    return this.service.adminCaseProgressStatus(admin.id, caseProgressStatusId)
  }

  @Mutation(() => CaseProgressStatus, { nullable: true })
  adminCreateCaseProgressStatus(@CtxUser() admin: User, @Args('input') input: AdminCreateCaseProgressStatusInput,) {
    return this.service.adminCreateCaseProgressStatus(admin.id, input)
  }

  @Mutation(() => CaseProgressStatus, { nullable: true })
  adminUpdateCaseProgressStatus(
    @CtxUser() admin: User,
    @Args('caseProgressStatusId') caseProgressStatusId: string,
    @Args('input') input: AdminUpdateCaseProgressStatusInput,
  ) {
    return this.service.adminUpdateCaseProgressStatus(admin.id, caseProgressStatusId, input)
  }

  @Mutation(() => CaseProgressStatus, { nullable: true })
  adminDeleteCaseProgressStatus(@CtxUser() admin: User, @Args('caseProgressStatusId') caseProgressStatusId: string) {
    return this.service.adminDeleteCaseProgressStatus(admin.id, caseProgressStatusId)
  }
}

