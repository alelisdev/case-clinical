
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateEducationInput,
  UserListEducationInput,
  UserUpdateEducationInput,
  UserUpdateEducationsInput,
  ApiEducationDataAccessUserService,
  Education,
} from '@case-clinical/api/education/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListClinicalProviderInput, ClinicalProvider } from '@case-clinical/api/clinical-provider/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiEducationFeatureUserResolver {
  constructor(private readonly service: ApiEducationDataAccessUserService) {}

  @Query(() => [Education], { nullable: true })
  userEducations(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListEducationInput, nullable: true }) input?: UserListEducationInput,
  ) {
    return this.service.userEducations(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountEducations(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListEducationInput, nullable: true }) input?: UserListEducationInput,
  ) {
    return this.service.userCountEducations(user.id, input)
  }

  @Query(() => [Education], { nullable: true })
  userSelectEducations(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListEducationInput, nullable: true }) input?: UserListEducationInput,
  ) {
    return this.service.userSelectEducations(user.id, input)
  }







  @Query(() => Education, { nullable: true })
  userEducation(@CtxUser() user: User, @Args('educationId') educationId: string) {
    return this.service.userEducation(user.id, educationId)
  }

  @Mutation(() => Education, { nullable: true })
  userCreateEducation(@CtxUser() user: User, @Args('input') input: UserCreateEducationInput,) {
    return this.service.userCreateEducation(user.id, input)
  }

  @Mutation(() => Education, { nullable: true })
  userUpdateEducation(
    @CtxUser() user: User,
    @Args('educationId') educationId: string,
    @Args('input') input: UserUpdateEducationInput,
  ) {
    return this.service.userUpdateEducation(user.id, educationId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateEducations(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateEducationsInput,
  ) {
    return this.service.userUpdateEducations(user.id, input)
  }

  @Mutation(() => Education, { nullable: true })
  userDeleteEducation(@CtxUser() user: User, @Args('educationId') educationId: string) {
    return this.service.userDeleteEducation(user.id, educationId)
  }
}

