
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateClinicalProviderServiceInput,
  UserListClinicalProviderServiceInput,
  UserUpdateClinicalProviderServiceInput,
  UserUpdateClinicalProviderServicesInput,
  ApiClinicalProviderServiceDataAccessUserService,
  ClinicalProviderService,
} from '@case-clinical/api/clinical-provider-service/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListServiceInput, Service } from '@case-clinical/api/service/data-access'
import { UserListClinicalProviderInput, ClinicalProvider } from '@case-clinical/api/clinical-provider/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiClinicalProviderServiceFeatureUserResolver {
  constructor(private readonly service: ApiClinicalProviderServiceDataAccessUserService) {}

  @Query(() => [ClinicalProviderService], { nullable: true })
  userClinicalProviderServices(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListClinicalProviderServiceInput, nullable: true }) input?: UserListClinicalProviderServiceInput,
  ) {
    return this.service.userClinicalProviderServices(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountClinicalProviderServices(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListClinicalProviderServiceInput, nullable: true }) input?: UserListClinicalProviderServiceInput,
  ) {
    return this.service.userCountClinicalProviderServices(user.id, input)
  }

  @Query(() => [ClinicalProviderService], { nullable: true })
  userSelectClinicalProviderServices(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListClinicalProviderServiceInput, nullable: true }) input?: UserListClinicalProviderServiceInput,
  ) {
    return this.service.userSelectClinicalProviderServices(user.id, input)
  }







  @Query(() => ClinicalProviderService, { nullable: true })
  userClinicalProviderService(@CtxUser() user: User, @Args('clinicalProviderServiceId') clinicalProviderServiceId: string) {
    return this.service.userClinicalProviderService(user.id, clinicalProviderServiceId)
  }

  @Mutation(() => ClinicalProviderService, { nullable: true })
  userCreateClinicalProviderService(@CtxUser() user: User, @Args('input') input: UserCreateClinicalProviderServiceInput,) {
    return this.service.userCreateClinicalProviderService(user.id, input)
  }

  @Mutation(() => ClinicalProviderService, { nullable: true })
  userUpdateClinicalProviderService(
    @CtxUser() user: User,
    @Args('clinicalProviderServiceId') clinicalProviderServiceId: string,
    @Args('input') input: UserUpdateClinicalProviderServiceInput,
  ) {
    return this.service.userUpdateClinicalProviderService(user.id, clinicalProviderServiceId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateClinicalProviderServices(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateClinicalProviderServicesInput,
  ) {
    return this.service.userUpdateClinicalProviderServices(user.id, input)
  }

  @Mutation(() => ClinicalProviderService, { nullable: true })
  userDeleteClinicalProviderService(@CtxUser() user: User, @Args('clinicalProviderServiceId') clinicalProviderServiceId: string) {
    return this.service.userDeleteClinicalProviderService(user.id, clinicalProviderServiceId)
  }
}

