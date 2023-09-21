
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateExperienceInput,
  UserListExperienceInput,
  UserUpdateExperienceInput,
  UserUpdateExperiencesInput,
  ApiExperienceDataAccessUserService,
  Experience,
} from '@case-clinical/api/experience/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListClinicalProviderInput, ClinicalProvider } from '@case-clinical/api/clinical-provider/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiExperienceFeatureUserResolver {
  constructor(private readonly service: ApiExperienceDataAccessUserService) {}

  @Query(() => [Experience], { nullable: true })
  userExperiences(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListExperienceInput, nullable: true }) input?: UserListExperienceInput,
  ) {
    return this.service.userExperiences(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountExperiences(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListExperienceInput, nullable: true }) input?: UserListExperienceInput,
  ) {
    return this.service.userCountExperiences(user.id, input)
  }

  @Query(() => [Experience], { nullable: true })
  userSelectExperiences(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListExperienceInput, nullable: true }) input?: UserListExperienceInput,
  ) {
    return this.service.userSelectExperiences(user.id, input)
  }







  @Query(() => Experience, { nullable: true })
  userExperience(@CtxUser() user: User, @Args('experienceId') experienceId: string) {
    return this.service.userExperience(user.id, experienceId)
  }

  @Mutation(() => Experience, { nullable: true })
  userCreateExperience(@CtxUser() user: User, @Args('input') input: UserCreateExperienceInput,) {
    return this.service.userCreateExperience(user.id, input)
  }

  @Mutation(() => Experience, { nullable: true })
  userUpdateExperience(
    @CtxUser() user: User,
    @Args('experienceId') experienceId: string,
    @Args('input') input: UserUpdateExperienceInput,
  ) {
    return this.service.userUpdateExperience(user.id, experienceId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateExperiences(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateExperiencesInput,
  ) {
    return this.service.userUpdateExperiences(user.id, input)
  }

  @Mutation(() => Experience, { nullable: true })
  userDeleteExperience(@CtxUser() user: User, @Args('experienceId') experienceId: string) {
    return this.service.userDeleteExperience(user.id, experienceId)
  }
}

