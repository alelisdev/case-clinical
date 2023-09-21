
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateMedicalConditionProviderInput,
  UserListMedicalConditionProviderInput,
  UserUpdateMedicalConditionProviderInput,
  UserUpdateMedicalConditionProvidersInput,
  ApiMedicalConditionProviderDataAccessUserService,
  MedicalConditionProvider,
} from '@case-clinical/api/medical-condition-provider/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListClinicalProviderInput, ClinicalProvider } from '@case-clinical/api/clinical-provider/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiMedicalConditionProviderFeatureUserResolver {
  constructor(private readonly service: ApiMedicalConditionProviderDataAccessUserService) {}

  @Query(() => [MedicalConditionProvider], { nullable: true })
  userMedicalConditionProviders(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListMedicalConditionProviderInput, nullable: true }) input?: UserListMedicalConditionProviderInput,
  ) {
    return this.service.userMedicalConditionProviders(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountMedicalConditionProviders(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListMedicalConditionProviderInput, nullable: true }) input?: UserListMedicalConditionProviderInput,
  ) {
    return this.service.userCountMedicalConditionProviders(user.id, input)
  }

  @Query(() => [MedicalConditionProvider], { nullable: true })
  userSelectMedicalConditionProviders(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListMedicalConditionProviderInput, nullable: true }) input?: UserListMedicalConditionProviderInput,
  ) {
    return this.service.userSelectMedicalConditionProviders(user.id, input)
  }







  @Query(() => MedicalConditionProvider, { nullable: true })
  userMedicalConditionProvider(@CtxUser() user: User, @Args('medicalConditionProviderId') medicalConditionProviderId: string) {
    return this.service.userMedicalConditionProvider(user.id, medicalConditionProviderId)
  }

  @Mutation(() => MedicalConditionProvider, { nullable: true })
  userCreateMedicalConditionProvider(@CtxUser() user: User, @Args('input') input: UserCreateMedicalConditionProviderInput,) {
    return this.service.userCreateMedicalConditionProvider(user.id, input)
  }

  @Mutation(() => MedicalConditionProvider, { nullable: true })
  userUpdateMedicalConditionProvider(
    @CtxUser() user: User,
    @Args('medicalConditionProviderId') medicalConditionProviderId: string,
    @Args('input') input: UserUpdateMedicalConditionProviderInput,
  ) {
    return this.service.userUpdateMedicalConditionProvider(user.id, medicalConditionProviderId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateMedicalConditionProviders(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateMedicalConditionProvidersInput,
  ) {
    return this.service.userUpdateMedicalConditionProviders(user.id, input)
  }

  @Mutation(() => MedicalConditionProvider, { nullable: true })
  userDeleteMedicalConditionProvider(@CtxUser() user: User, @Args('medicalConditionProviderId') medicalConditionProviderId: string) {
    return this.service.userDeleteMedicalConditionProvider(user.id, medicalConditionProviderId)
  }
}

