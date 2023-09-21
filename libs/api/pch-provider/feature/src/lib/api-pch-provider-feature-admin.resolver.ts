
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreatePchProviderInput,
  AdminListPchProviderInput,
  AdminUpdatePchProviderInput,
  ApiPchProviderDataAccessAdminService,
  PchProvider
} from '@case-clinical/api/pch-provider/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListClinicalProviderInput, ClinicalProvider } from '@case-clinical/api/clinical-provider/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiPchProviderFeatureAdminResolver {
  constructor(private readonly service: ApiPchProviderDataAccessAdminService) {}

  @Query(() => [PchProvider], { nullable: true })
  adminPchProviders(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListPchProviderInput, nullable: true }) input?: AdminListPchProviderInput,
  ) {
    return this.service.adminPchProviders(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountPchProviders(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListPchProviderInput, nullable: true }) input?: AdminListPchProviderInput,
  ) {
    return this.service.adminCountPchProviders(admin.id, input)
  }





  @Query(() => PchProvider, { nullable: true })
  adminPchProvider(@CtxUser() admin: User, @Args('pchProviderId') pchProviderId: string) {
    return this.service.adminPchProvider(admin.id, pchProviderId)
  }

  @Mutation(() => PchProvider, { nullable: true })
  adminCreatePchProvider(@CtxUser() admin: User, @Args('input') input: AdminCreatePchProviderInput,) {
    return this.service.adminCreatePchProvider(admin.id, input)
  }

  @Mutation(() => PchProvider, { nullable: true })
  adminUpdatePchProvider(
    @CtxUser() admin: User,
    @Args('pchProviderId') pchProviderId: string,
    @Args('input') input: AdminUpdatePchProviderInput,
  ) {
    return this.service.adminUpdatePchProvider(admin.id, pchProviderId, input)
  }

  @Mutation(() => PchProvider, { nullable: true })
  adminDeletePchProvider(@CtxUser() admin: User, @Args('pchProviderId') pchProviderId: string) {
    return this.service.adminDeletePchProvider(admin.id, pchProviderId)
  }
}

