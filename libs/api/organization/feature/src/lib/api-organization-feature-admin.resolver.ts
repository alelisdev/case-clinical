
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateOrganizationInput,
  AdminListOrganizationInput,
  AdminUpdateOrganizationInput,
  ApiOrganizationDataAccessAdminService,
  Organization
} from '@case-clinical/api/organization/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiOrganizationFeatureAdminResolver {
  constructor(private readonly service: ApiOrganizationDataAccessAdminService) {}

  @Query(() => [Organization], { nullable: true })
  adminOrganizations(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListOrganizationInput, nullable: true }) input?: AdminListOrganizationInput,
  ) {
    return this.service.adminOrganizations(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountOrganizations(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListOrganizationInput, nullable: true }) input?: AdminListOrganizationInput,
  ) {
    return this.service.adminCountOrganizations(admin.id, input)
  }





  @Query(() => Organization, { nullable: true })
  adminOrganization(@CtxUser() admin: User, @Args('organizationId') organizationId: string) {
    return this.service.adminOrganization(admin.id, organizationId)
  }

  @Mutation(() => Organization, { nullable: true })
  adminCreateOrganization(@CtxUser() admin: User, @Args('input') input: AdminCreateOrganizationInput,) {
    return this.service.adminCreateOrganization(admin.id, input)
  }

  @Mutation(() => Organization, { nullable: true })
  adminUpdateOrganization(
    @CtxUser() admin: User,
    @Args('organizationId') organizationId: string,
    @Args('input') input: AdminUpdateOrganizationInput,
  ) {
    return this.service.adminUpdateOrganization(admin.id, organizationId, input)
  }

  @Mutation(() => Organization, { nullable: true })
  adminDeleteOrganization(@CtxUser() admin: User, @Args('organizationId') organizationId: string) {
    return this.service.adminDeleteOrganization(admin.id, organizationId)
  }
}

