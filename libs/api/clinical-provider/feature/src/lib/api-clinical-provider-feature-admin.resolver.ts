
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateClinicalProviderInput,
  AdminListClinicalProviderInput,
  AdminUpdateClinicalProviderInput,
  ApiClinicalProviderDataAccessAdminService,
  ClinicalProvider
} from '@case-clinical/api/clinical-provider/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListVendorInput, Vendor } from '@case-clinical/api/vendor/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiClinicalProviderFeatureAdminResolver {
  constructor(private readonly service: ApiClinicalProviderDataAccessAdminService) {}

  @Query(() => [ClinicalProvider], { nullable: true })
  adminClinicalProviders(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListClinicalProviderInput, nullable: true }) input?: AdminListClinicalProviderInput,
  ) {
    return this.service.adminClinicalProviders(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountClinicalProviders(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListClinicalProviderInput, nullable: true }) input?: AdminListClinicalProviderInput,
  ) {
    return this.service.adminCountClinicalProviders(admin.id, input)
  }





  @Query(() => ClinicalProvider, { nullable: true })
  adminClinicalProvider(@CtxUser() admin: User, @Args('clinicalProviderId') clinicalProviderId: string) {
    return this.service.adminClinicalProvider(admin.id, clinicalProviderId)
  }

  @Mutation(() => ClinicalProvider, { nullable: true })
  adminCreateClinicalProvider(@CtxUser() admin: User, @Args('input') input: AdminCreateClinicalProviderInput,) {
    return this.service.adminCreateClinicalProvider(admin.id, input)
  }

  @Mutation(() => ClinicalProvider, { nullable: true })
  adminUpdateClinicalProvider(
    @CtxUser() admin: User,
    @Args('clinicalProviderId') clinicalProviderId: string,
    @Args('input') input: AdminUpdateClinicalProviderInput,
  ) {
    return this.service.adminUpdateClinicalProvider(admin.id, clinicalProviderId, input)
  }

  @Mutation(() => ClinicalProvider, { nullable: true })
  adminDeleteClinicalProvider(@CtxUser() admin: User, @Args('clinicalProviderId') clinicalProviderId: string) {
    return this.service.adminDeleteClinicalProvider(admin.id, clinicalProviderId)
  }
}

