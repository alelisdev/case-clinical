
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateClinicalProviderSpecialtyInput,
  AdminListClinicalProviderSpecialtyInput,
  AdminUpdateClinicalProviderSpecialtyInput,
  ApiClinicalProviderSpecialtyDataAccessAdminService,
  ClinicalProviderSpecialty
} from '@case-clinical/api/clinical-provider-specialty/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListClinicalProviderInput, ClinicalProvider } from '@case-clinical/api/clinical-provider/data-access'
import { AdminListSpecialtyInput, Specialty } from '@case-clinical/api/specialty/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiClinicalProviderSpecialtyFeatureAdminResolver {
  constructor(private readonly service: ApiClinicalProviderSpecialtyDataAccessAdminService) {}

  @Query(() => [ClinicalProviderSpecialty], { nullable: true })
  adminClinicalProviderSpecialties(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListClinicalProviderSpecialtyInput, nullable: true }) input?: AdminListClinicalProviderSpecialtyInput,
  ) {
    return this.service.adminClinicalProviderSpecialties(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountClinicalProviderSpecialties(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListClinicalProviderSpecialtyInput, nullable: true }) input?: AdminListClinicalProviderSpecialtyInput,
  ) {
    return this.service.adminCountClinicalProviderSpecialties(admin.id, input)
  }





  @Query(() => ClinicalProviderSpecialty, { nullable: true })
  adminClinicalProviderSpecialty(@CtxUser() admin: User, @Args('clinicalProviderSpecialtyId') clinicalProviderSpecialtyId: string) {
    return this.service.adminClinicalProviderSpecialty(admin.id, clinicalProviderSpecialtyId)
  }

  @Mutation(() => ClinicalProviderSpecialty, { nullable: true })
  adminCreateClinicalProviderSpecialty(@CtxUser() admin: User, @Args('input') input: AdminCreateClinicalProviderSpecialtyInput,) {
    return this.service.adminCreateClinicalProviderSpecialty(admin.id, input)
  }

  @Mutation(() => ClinicalProviderSpecialty, { nullable: true })
  adminUpdateClinicalProviderSpecialty(
    @CtxUser() admin: User,
    @Args('clinicalProviderSpecialtyId') clinicalProviderSpecialtyId: string,
    @Args('input') input: AdminUpdateClinicalProviderSpecialtyInput,
  ) {
    return this.service.adminUpdateClinicalProviderSpecialty(admin.id, clinicalProviderSpecialtyId, input)
  }

  @Mutation(() => ClinicalProviderSpecialty, { nullable: true })
  adminDeleteClinicalProviderSpecialty(@CtxUser() admin: User, @Args('clinicalProviderSpecialtyId') clinicalProviderSpecialtyId: string) {
    return this.service.adminDeleteClinicalProviderSpecialty(admin.id, clinicalProviderSpecialtyId)
  }
}

