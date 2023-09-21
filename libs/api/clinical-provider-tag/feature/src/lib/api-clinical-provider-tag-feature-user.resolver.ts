
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateClinicalProviderTagInput,
  UserListClinicalProviderTagInput,
  UserUpdateClinicalProviderTagInput,
  UserUpdateClinicalProviderTagsInput,
  ApiClinicalProviderTagDataAccessUserService,
  ClinicalProviderTag,
} from '@case-clinical/api/clinical-provider-tag/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListClinicalProviderInput, ClinicalProvider } from '@case-clinical/api/clinical-provider/data-access'
import { UserListTagInput, Tag } from '@case-clinical/api/tag/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiClinicalProviderTagFeatureUserResolver {
  constructor(private readonly service: ApiClinicalProviderTagDataAccessUserService) {}

  @Query(() => [ClinicalProviderTag], { nullable: true })
  userClinicalProviderTags(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListClinicalProviderTagInput, nullable: true }) input?: UserListClinicalProviderTagInput,
  ) {
    return this.service.userClinicalProviderTags(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountClinicalProviderTags(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListClinicalProviderTagInput, nullable: true }) input?: UserListClinicalProviderTagInput,
  ) {
    return this.service.userCountClinicalProviderTags(user.id, input)
  }

  @Query(() => [ClinicalProviderTag], { nullable: true })
  userSelectClinicalProviderTags(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListClinicalProviderTagInput, nullable: true }) input?: UserListClinicalProviderTagInput,
  ) {
    return this.service.userSelectClinicalProviderTags(user.id, input)
  }







  @Query(() => ClinicalProviderTag, { nullable: true })
  userClinicalProviderTag(@CtxUser() user: User, @Args('clinicalProviderTagId') clinicalProviderTagId: string) {
    return this.service.userClinicalProviderTag(user.id, clinicalProviderTagId)
  }

  @Mutation(() => ClinicalProviderTag, { nullable: true })
  userCreateClinicalProviderTag(@CtxUser() user: User, @Args('input') input: UserCreateClinicalProviderTagInput,) {
    return this.service.userCreateClinicalProviderTag(user.id, input)
  }

  @Mutation(() => ClinicalProviderTag, { nullable: true })
  userUpdateClinicalProviderTag(
    @CtxUser() user: User,
    @Args('clinicalProviderTagId') clinicalProviderTagId: string,
    @Args('input') input: UserUpdateClinicalProviderTagInput,
  ) {
    return this.service.userUpdateClinicalProviderTag(user.id, clinicalProviderTagId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateClinicalProviderTags(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateClinicalProviderTagsInput,
  ) {
    return this.service.userUpdateClinicalProviderTags(user.id, input)
  }

  @Mutation(() => ClinicalProviderTag, { nullable: true })
  userDeleteClinicalProviderTag(@CtxUser() user: User, @Args('clinicalProviderTagId') clinicalProviderTagId: string) {
    return this.service.userDeleteClinicalProviderTag(user.id, clinicalProviderTagId)
  }
}

