
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateIntegrationInput,
  AdminListIntegrationInput,
  AdminUpdateIntegrationInput,
  ApiIntegrationDataAccessAdminService,
  Integration
} from '@case-clinical/api/integration/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiIntegrationFeatureAdminResolver {
  constructor(private readonly service: ApiIntegrationDataAccessAdminService) {}

  @Query(() => [Integration], { nullable: true })
  adminIntegrations(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListIntegrationInput, nullable: true }) input?: AdminListIntegrationInput,
  ) {
    return this.service.adminIntegrations(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountIntegrations(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListIntegrationInput, nullable: true }) input?: AdminListIntegrationInput,
  ) {
    return this.service.adminCountIntegrations(admin.id, input)
  }





  @Query(() => Integration, { nullable: true })
  adminIntegration(@CtxUser() admin: User, @Args('integrationId') integrationId: string) {
    return this.service.adminIntegration(admin.id, integrationId)
  }

  @Mutation(() => Integration, { nullable: true })
  adminCreateIntegration(@CtxUser() admin: User, @Args('input') input: AdminCreateIntegrationInput,) {
    return this.service.adminCreateIntegration(admin.id, input)
  }

  @Mutation(() => Integration, { nullable: true })
  adminUpdateIntegration(
    @CtxUser() admin: User,
    @Args('integrationId') integrationId: string,
    @Args('input') input: AdminUpdateIntegrationInput,
  ) {
    return this.service.adminUpdateIntegration(admin.id, integrationId, input)
  }

  @Mutation(() => Integration, { nullable: true })
  adminDeleteIntegration(@CtxUser() admin: User, @Args('integrationId') integrationId: string) {
    return this.service.adminDeleteIntegration(admin.id, integrationId)
  }
}

