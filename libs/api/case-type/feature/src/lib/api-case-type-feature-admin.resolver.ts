
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateCaseTypeInput,
  AdminListCaseTypeInput,
  AdminUpdateCaseTypeInput,
  ApiCaseTypeDataAccessAdminService,
  CaseType
} from '@case-clinical/api/case-type/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiCaseTypeFeatureAdminResolver {
  constructor(private readonly service: ApiCaseTypeDataAccessAdminService) {}

  @Query(() => [CaseType], { nullable: true })
  adminCaseTypes(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListCaseTypeInput, nullable: true }) input?: AdminListCaseTypeInput,
  ) {
    return this.service.adminCaseTypes(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountCaseTypes(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListCaseTypeInput, nullable: true }) input?: AdminListCaseTypeInput,
  ) {
    return this.service.adminCountCaseTypes(admin.id, input)
  }





  @Query(() => CaseType, { nullable: true })
  adminCaseType(@CtxUser() admin: User, @Args('caseTypeId') caseTypeId: string) {
    return this.service.adminCaseType(admin.id, caseTypeId)
  }

  @Mutation(() => CaseType, { nullable: true })
  adminCreateCaseType(@CtxUser() admin: User, @Args('input') input: AdminCreateCaseTypeInput,) {
    return this.service.adminCreateCaseType(admin.id, input)
  }

  @Mutation(() => CaseType, { nullable: true })
  adminUpdateCaseType(
    @CtxUser() admin: User,
    @Args('caseTypeId') caseTypeId: string,
    @Args('input') input: AdminUpdateCaseTypeInput,
  ) {
    return this.service.adminUpdateCaseType(admin.id, caseTypeId, input)
  }

  @Mutation(() => CaseType, { nullable: true })
  adminDeleteCaseType(@CtxUser() admin: User, @Args('caseTypeId') caseTypeId: string) {
    return this.service.adminDeleteCaseType(admin.id, caseTypeId)
  }
}

