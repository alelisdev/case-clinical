
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateExperienceInput,
  AdminListExperienceInput,
  AdminUpdateExperienceInput,
  ApiExperienceDataAccessAdminService,
  Experience
} from '@case-clinical/api/experience/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListClinicalProviderInput, ClinicalProvider } from '@case-clinical/api/clinical-provider/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiExperienceFeatureAdminResolver {
  constructor(private readonly service: ApiExperienceDataAccessAdminService) {}

  @Query(() => [Experience], { nullable: true })
  adminExperiences(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListExperienceInput, nullable: true }) input?: AdminListExperienceInput,
  ) {
    return this.service.adminExperiences(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountExperiences(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListExperienceInput, nullable: true }) input?: AdminListExperienceInput,
  ) {
    return this.service.adminCountExperiences(admin.id, input)
  }





  @Query(() => Experience, { nullable: true })
  adminExperience(@CtxUser() admin: User, @Args('experienceId') experienceId: string) {
    return this.service.adminExperience(admin.id, experienceId)
  }

  @Mutation(() => Experience, { nullable: true })
  adminCreateExperience(@CtxUser() admin: User, @Args('input') input: AdminCreateExperienceInput,) {
    return this.service.adminCreateExperience(admin.id, input)
  }

  @Mutation(() => Experience, { nullable: true })
  adminUpdateExperience(
    @CtxUser() admin: User,
    @Args('experienceId') experienceId: string,
    @Args('input') input: AdminUpdateExperienceInput,
  ) {
    return this.service.adminUpdateExperience(admin.id, experienceId, input)
  }

  @Mutation(() => Experience, { nullable: true })
  adminDeleteExperience(@CtxUser() admin: User, @Args('experienceId') experienceId: string) {
    return this.service.adminDeleteExperience(admin.id, experienceId)
  }
}

