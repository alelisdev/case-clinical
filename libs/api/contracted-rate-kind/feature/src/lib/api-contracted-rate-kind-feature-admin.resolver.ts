
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateContractedRateKindInput,
  AdminListContractedRateKindInput,
  AdminUpdateContractedRateKindInput,
  ApiContractedRateKindDataAccessAdminService,
  ContractedRateKind
} from '@case-clinical/api/contracted-rate-kind/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiContractedRateKindFeatureAdminResolver {
  constructor(private readonly service: ApiContractedRateKindDataAccessAdminService) {}

  @Query(() => [ContractedRateKind], { nullable: true })
  adminContractedRateKinds(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListContractedRateKindInput, nullable: true }) input?: AdminListContractedRateKindInput,
  ) {
    return this.service.adminContractedRateKinds(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountContractedRateKinds(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListContractedRateKindInput, nullable: true }) input?: AdminListContractedRateKindInput,
  ) {
    return this.service.adminCountContractedRateKinds(admin.id, input)
  }





  @Query(() => ContractedRateKind, { nullable: true })
  adminContractedRateKind(@CtxUser() admin: User, @Args('contractedRateKindId') contractedRateKindId: string) {
    return this.service.adminContractedRateKind(admin.id, contractedRateKindId)
  }

  @Mutation(() => ContractedRateKind, { nullable: true })
  adminCreateContractedRateKind(@CtxUser() admin: User, @Args('input') input: AdminCreateContractedRateKindInput,) {
    return this.service.adminCreateContractedRateKind(admin.id, input)
  }

  @Mutation(() => ContractedRateKind, { nullable: true })
  adminUpdateContractedRateKind(
    @CtxUser() admin: User,
    @Args('contractedRateKindId') contractedRateKindId: string,
    @Args('input') input: AdminUpdateContractedRateKindInput,
  ) {
    return this.service.adminUpdateContractedRateKind(admin.id, contractedRateKindId, input)
  }

  @Mutation(() => ContractedRateKind, { nullable: true })
  adminDeleteContractedRateKind(@CtxUser() admin: User, @Args('contractedRateKindId') contractedRateKindId: string) {
    return this.service.adminDeleteContractedRateKind(admin.id, contractedRateKindId)
  }
}

