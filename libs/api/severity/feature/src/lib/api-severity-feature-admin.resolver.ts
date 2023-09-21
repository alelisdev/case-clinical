
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateSeverityInput,
  AdminListSeverityInput,
  AdminUpdateSeverityInput,
  ApiSeverityDataAccessAdminService,
  Severity
} from '@case-clinical/api/severity/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiSeverityFeatureAdminResolver {
  constructor(private readonly service: ApiSeverityDataAccessAdminService) {}

  @Query(() => [Severity], { nullable: true })
  adminSeverities(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListSeverityInput, nullable: true }) input?: AdminListSeverityInput,
  ) {
    return this.service.adminSeverities(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountSeverities(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListSeverityInput, nullable: true }) input?: AdminListSeverityInput,
  ) {
    return this.service.adminCountSeverities(admin.id, input)
  }





  @Query(() => Severity, { nullable: true })
  adminSeverity(@CtxUser() admin: User, @Args('severityId') severityId: string) {
    return this.service.adminSeverity(admin.id, severityId)
  }

  @Mutation(() => Severity, { nullable: true })
  adminCreateSeverity(@CtxUser() admin: User, @Args('input') input: AdminCreateSeverityInput,) {
    return this.service.adminCreateSeverity(admin.id, input)
  }

  @Mutation(() => Severity, { nullable: true })
  adminUpdateSeverity(
    @CtxUser() admin: User,
    @Args('severityId') severityId: string,
    @Args('input') input: AdminUpdateSeverityInput,
  ) {
    return this.service.adminUpdateSeverity(admin.id, severityId, input)
  }

  @Mutation(() => Severity, { nullable: true })
  adminDeleteSeverity(@CtxUser() admin: User, @Args('severityId') severityId: string) {
    return this.service.adminDeleteSeverity(admin.id, severityId)
  }
}

