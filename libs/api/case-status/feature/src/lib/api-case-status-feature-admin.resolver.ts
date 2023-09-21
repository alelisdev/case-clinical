
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateCaseStatusInput,
  AdminListCaseStatusInput,
  AdminUpdateCaseStatusInput,
  ApiCaseStatusDataAccessAdminService,
  CaseStatus
} from '@case-clinical/api/case-status/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiCaseStatusFeatureAdminResolver {
  constructor(private readonly service: ApiCaseStatusDataAccessAdminService) {}

  @Query(() => [CaseStatus], { nullable: true })
  adminCaseStatuses(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListCaseStatusInput, nullable: true }) input?: AdminListCaseStatusInput,
  ) {
    return this.service.adminCaseStatuses(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountCaseStatuses(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListCaseStatusInput, nullable: true }) input?: AdminListCaseStatusInput,
  ) {
    return this.service.adminCountCaseStatuses(admin.id, input)
  }





  @Query(() => CaseStatus, { nullable: true })
  adminCaseStatus(@CtxUser() admin: User, @Args('caseStatusId') caseStatusId: string) {
    return this.service.adminCaseStatus(admin.id, caseStatusId)
  }

  @Mutation(() => CaseStatus, { nullable: true })
  adminCreateCaseStatus(@CtxUser() admin: User, @Args('input') input: AdminCreateCaseStatusInput,) {
    return this.service.adminCreateCaseStatus(admin.id, input)
  }

  @Mutation(() => CaseStatus, { nullable: true })
  adminUpdateCaseStatus(
    @CtxUser() admin: User,
    @Args('caseStatusId') caseStatusId: string,
    @Args('input') input: AdminUpdateCaseStatusInput,
  ) {
    return this.service.adminUpdateCaseStatus(admin.id, caseStatusId, input)
  }

  @Mutation(() => CaseStatus, { nullable: true })
  adminDeleteCaseStatus(@CtxUser() admin: User, @Args('caseStatusId') caseStatusId: string) {
    return this.service.adminDeleteCaseStatus(admin.id, caseStatusId)
  }
}

