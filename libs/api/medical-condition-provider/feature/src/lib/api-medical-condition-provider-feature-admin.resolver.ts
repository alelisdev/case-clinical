
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateMedicalConditionProviderInput,
  AdminListMedicalConditionProviderInput,
  AdminUpdateMedicalConditionProviderInput,
  ApiMedicalConditionProviderDataAccessAdminService,
  MedicalConditionProvider
} from '@case-clinical/api/medical-condition-provider/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListClinicalProviderInput, ClinicalProvider } from '@case-clinical/api/clinical-provider/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiMedicalConditionProviderFeatureAdminResolver {
  constructor(private readonly service: ApiMedicalConditionProviderDataAccessAdminService) {}

  @Query(() => [MedicalConditionProvider], { nullable: true })
  adminMedicalConditionProviders(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListMedicalConditionProviderInput, nullable: true }) input?: AdminListMedicalConditionProviderInput,
  ) {
    return this.service.adminMedicalConditionProviders(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountMedicalConditionProviders(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListMedicalConditionProviderInput, nullable: true }) input?: AdminListMedicalConditionProviderInput,
  ) {
    return this.service.adminCountMedicalConditionProviders(admin.id, input)
  }





  @Query(() => MedicalConditionProvider, { nullable: true })
  adminMedicalConditionProvider(@CtxUser() admin: User, @Args('medicalConditionProviderId') medicalConditionProviderId: string) {
    return this.service.adminMedicalConditionProvider(admin.id, medicalConditionProviderId)
  }

  @Mutation(() => MedicalConditionProvider, { nullable: true })
  adminCreateMedicalConditionProvider(@CtxUser() admin: User, @Args('input') input: AdminCreateMedicalConditionProviderInput,) {
    return this.service.adminCreateMedicalConditionProvider(admin.id, input)
  }

  @Mutation(() => MedicalConditionProvider, { nullable: true })
  adminUpdateMedicalConditionProvider(
    @CtxUser() admin: User,
    @Args('medicalConditionProviderId') medicalConditionProviderId: string,
    @Args('input') input: AdminUpdateMedicalConditionProviderInput,
  ) {
    return this.service.adminUpdateMedicalConditionProvider(admin.id, medicalConditionProviderId, input)
  }

  @Mutation(() => MedicalConditionProvider, { nullable: true })
  adminDeleteMedicalConditionProvider(@CtxUser() admin: User, @Args('medicalConditionProviderId') medicalConditionProviderId: string) {
    return this.service.adminDeleteMedicalConditionProvider(admin.id, medicalConditionProviderId)
  }
}

