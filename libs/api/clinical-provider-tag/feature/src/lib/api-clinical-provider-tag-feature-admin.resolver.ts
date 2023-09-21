
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateClinicalProviderTagInput,
  AdminListClinicalProviderTagInput,
  AdminUpdateClinicalProviderTagInput,
  ApiClinicalProviderTagDataAccessAdminService,
  ClinicalProviderTag
} from '@case-clinical/api/clinical-provider-tag/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListClinicalProviderInput, ClinicalProvider } from '@case-clinical/api/clinical-provider/data-access'
import { AdminListTagInput, Tag } from '@case-clinical/api/tag/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiClinicalProviderTagFeatureAdminResolver {
  constructor(private readonly service: ApiClinicalProviderTagDataAccessAdminService) {}

  @Query(() => [ClinicalProviderTag], { nullable: true })
  adminClinicalProviderTags(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListClinicalProviderTagInput, nullable: true }) input?: AdminListClinicalProviderTagInput,
  ) {
    return this.service.adminClinicalProviderTags(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountClinicalProviderTags(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListClinicalProviderTagInput, nullable: true }) input?: AdminListClinicalProviderTagInput,
  ) {
    return this.service.adminCountClinicalProviderTags(admin.id, input)
  }





  @Query(() => ClinicalProviderTag, { nullable: true })
  adminClinicalProviderTag(@CtxUser() admin: User, @Args('clinicalProviderTagId') clinicalProviderTagId: string) {
    return this.service.adminClinicalProviderTag(admin.id, clinicalProviderTagId)
  }

  @Mutation(() => ClinicalProviderTag, { nullable: true })
  adminCreateClinicalProviderTag(@CtxUser() admin: User, @Args('input') input: AdminCreateClinicalProviderTagInput,) {
    return this.service.adminCreateClinicalProviderTag(admin.id, input)
  }

  @Mutation(() => ClinicalProviderTag, { nullable: true })
  adminUpdateClinicalProviderTag(
    @CtxUser() admin: User,
    @Args('clinicalProviderTagId') clinicalProviderTagId: string,
    @Args('input') input: AdminUpdateClinicalProviderTagInput,
  ) {
    return this.service.adminUpdateClinicalProviderTag(admin.id, clinicalProviderTagId, input)
  }

  @Mutation(() => ClinicalProviderTag, { nullable: true })
  adminDeleteClinicalProviderTag(@CtxUser() admin: User, @Args('clinicalProviderTagId') clinicalProviderTagId: string) {
    return this.service.adminDeleteClinicalProviderTag(admin.id, clinicalProviderTagId)
  }
}

