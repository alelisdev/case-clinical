
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateClinicalProviderServiceInput,
  AdminListClinicalProviderServiceInput,
  AdminUpdateClinicalProviderServiceInput,
  ApiClinicalProviderServiceDataAccessAdminService,
  ClinicalProviderService
} from '@case-clinical/api/clinical-provider-service/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListServiceInput, Service } from '@case-clinical/api/service/data-access'
import { AdminListClinicalProviderInput, ClinicalProvider } from '@case-clinical/api/clinical-provider/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiClinicalProviderServiceFeatureAdminResolver {
  constructor(private readonly service: ApiClinicalProviderServiceDataAccessAdminService) {}

  @Query(() => [ClinicalProviderService], { nullable: true })
  adminClinicalProviderServices(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListClinicalProviderServiceInput, nullable: true }) input?: AdminListClinicalProviderServiceInput,
  ) {
    return this.service.adminClinicalProviderServices(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountClinicalProviderServices(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListClinicalProviderServiceInput, nullable: true }) input?: AdminListClinicalProviderServiceInput,
  ) {
    return this.service.adminCountClinicalProviderServices(admin.id, input)
  }





  @Query(() => ClinicalProviderService, { nullable: true })
  adminClinicalProviderService(@CtxUser() admin: User, @Args('clinicalProviderServiceId') clinicalProviderServiceId: string) {
    return this.service.adminClinicalProviderService(admin.id, clinicalProviderServiceId)
  }

  @Mutation(() => ClinicalProviderService, { nullable: true })
  adminCreateClinicalProviderService(@CtxUser() admin: User, @Args('input') input: AdminCreateClinicalProviderServiceInput,) {
    return this.service.adminCreateClinicalProviderService(admin.id, input)
  }

  @Mutation(() => ClinicalProviderService, { nullable: true })
  adminUpdateClinicalProviderService(
    @CtxUser() admin: User,
    @Args('clinicalProviderServiceId') clinicalProviderServiceId: string,
    @Args('input') input: AdminUpdateClinicalProviderServiceInput,
  ) {
    return this.service.adminUpdateClinicalProviderService(admin.id, clinicalProviderServiceId, input)
  }

  @Mutation(() => ClinicalProviderService, { nullable: true })
  adminDeleteClinicalProviderService(@CtxUser() admin: User, @Args('clinicalProviderServiceId') clinicalProviderServiceId: string) {
    return this.service.adminDeleteClinicalProviderService(admin.id, clinicalProviderServiceId)
  }
}

