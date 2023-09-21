
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateEducationInput,
  AdminListEducationInput,
  AdminUpdateEducationInput,
  ApiEducationDataAccessAdminService,
  Education
} from '@case-clinical/api/education/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListClinicalProviderInput, ClinicalProvider } from '@case-clinical/api/clinical-provider/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiEducationFeatureAdminResolver {
  constructor(private readonly service: ApiEducationDataAccessAdminService) {}

  @Query(() => [Education], { nullable: true })
  adminEducations(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListEducationInput, nullable: true }) input?: AdminListEducationInput,
  ) {
    return this.service.adminEducations(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountEducations(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListEducationInput, nullable: true }) input?: AdminListEducationInput,
  ) {
    return this.service.adminCountEducations(admin.id, input)
  }





  @Query(() => Education, { nullable: true })
  adminEducation(@CtxUser() admin: User, @Args('educationId') educationId: string) {
    return this.service.adminEducation(admin.id, educationId)
  }

  @Mutation(() => Education, { nullable: true })
  adminCreateEducation(@CtxUser() admin: User, @Args('input') input: AdminCreateEducationInput,) {
    return this.service.adminCreateEducation(admin.id, input)
  }

  @Mutation(() => Education, { nullable: true })
  adminUpdateEducation(
    @CtxUser() admin: User,
    @Args('educationId') educationId: string,
    @Args('input') input: AdminUpdateEducationInput,
  ) {
    return this.service.adminUpdateEducation(admin.id, educationId, input)
  }

  @Mutation(() => Education, { nullable: true })
  adminDeleteEducation(@CtxUser() admin: User, @Args('educationId') educationId: string) {
    return this.service.adminDeleteEducation(admin.id, educationId)
  }
}

