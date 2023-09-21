
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateClinicalProviderSpecialtyInput,
  UserListClinicalProviderSpecialtyInput,
  UserUpdateClinicalProviderSpecialtyInput,
  UserUpdateClinicalProviderSpecialtiesInput,
  ApiClinicalProviderSpecialtyDataAccessUserService,
  ClinicalProviderSpecialty,
} from '@case-clinical/api/clinical-provider-specialty/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListClinicalProviderInput, ClinicalProvider } from '@case-clinical/api/clinical-provider/data-access'
import { UserListSpecialtyInput, Specialty } from '@case-clinical/api/specialty/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiClinicalProviderSpecialtyFeatureUserResolver {
  constructor(private readonly service: ApiClinicalProviderSpecialtyDataAccessUserService) {}

  @Query(() => [ClinicalProviderSpecialty], { nullable: true })
  userClinicalProviderSpecialties(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListClinicalProviderSpecialtyInput, nullable: true }) input?: UserListClinicalProviderSpecialtyInput,
  ) {
    return this.service.userClinicalProviderSpecialties(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountClinicalProviderSpecialties(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListClinicalProviderSpecialtyInput, nullable: true }) input?: UserListClinicalProviderSpecialtyInput,
  ) {
    return this.service.userCountClinicalProviderSpecialties(user.id, input)
  }

  @Query(() => [ClinicalProviderSpecialty], { nullable: true })
  userSelectClinicalProviderSpecialties(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListClinicalProviderSpecialtyInput, nullable: true }) input?: UserListClinicalProviderSpecialtyInput,
  ) {
    return this.service.userSelectClinicalProviderSpecialties(user.id, input)
  }







  @Query(() => ClinicalProviderSpecialty, { nullable: true })
  userClinicalProviderSpecialty(@CtxUser() user: User, @Args('clinicalProviderSpecialtyId') clinicalProviderSpecialtyId: string) {
    return this.service.userClinicalProviderSpecialty(user.id, clinicalProviderSpecialtyId)
  }

  @Mutation(() => ClinicalProviderSpecialty, { nullable: true })
  userCreateClinicalProviderSpecialty(@CtxUser() user: User, @Args('input') input: UserCreateClinicalProviderSpecialtyInput,) {
    return this.service.userCreateClinicalProviderSpecialty(user.id, input)
  }

  @Mutation(() => ClinicalProviderSpecialty, { nullable: true })
  userUpdateClinicalProviderSpecialty(
    @CtxUser() user: User,
    @Args('clinicalProviderSpecialtyId') clinicalProviderSpecialtyId: string,
    @Args('input') input: UserUpdateClinicalProviderSpecialtyInput,
  ) {
    return this.service.userUpdateClinicalProviderSpecialty(user.id, clinicalProviderSpecialtyId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateClinicalProviderSpecialties(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateClinicalProviderSpecialtiesInput,
  ) {
    return this.service.userUpdateClinicalProviderSpecialties(user.id, input)
  }

  @Mutation(() => ClinicalProviderSpecialty, { nullable: true })
  userDeleteClinicalProviderSpecialty(@CtxUser() user: User, @Args('clinicalProviderSpecialtyId') clinicalProviderSpecialtyId: string) {
    return this.service.userDeleteClinicalProviderSpecialty(user.id, clinicalProviderSpecialtyId)
  }
}

