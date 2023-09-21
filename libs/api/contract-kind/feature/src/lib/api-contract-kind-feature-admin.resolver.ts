
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateContractKindInput,
  AdminListContractKindInput,
  AdminUpdateContractKindInput,
  ApiContractKindDataAccessAdminService,
  ContractKind
} from '@case-clinical/api/contract-kind/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiContractKindFeatureAdminResolver {
  constructor(private readonly service: ApiContractKindDataAccessAdminService) {}

  @Query(() => [ContractKind], { nullable: true })
  adminContractKinds(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListContractKindInput, nullable: true }) input?: AdminListContractKindInput,
  ) {
    return this.service.adminContractKinds(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountContractKinds(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListContractKindInput, nullable: true }) input?: AdminListContractKindInput,
  ) {
    return this.service.adminCountContractKinds(admin.id, input)
  }





  @Query(() => ContractKind, { nullable: true })
  adminContractKind(@CtxUser() admin: User, @Args('contractKindId') contractKindId: string) {
    return this.service.adminContractKind(admin.id, contractKindId)
  }

  @Mutation(() => ContractKind, { nullable: true })
  adminCreateContractKind(@CtxUser() admin: User, @Args('input') input: AdminCreateContractKindInput,) {
    return this.service.adminCreateContractKind(admin.id, input)
  }

  @Mutation(() => ContractKind, { nullable: true })
  adminUpdateContractKind(
    @CtxUser() admin: User,
    @Args('contractKindId') contractKindId: string,
    @Args('input') input: AdminUpdateContractKindInput,
  ) {
    return this.service.adminUpdateContractKind(admin.id, contractKindId, input)
  }

  @Mutation(() => ContractKind, { nullable: true })
  adminDeleteContractKind(@CtxUser() admin: User, @Args('contractKindId') contractKindId: string) {
    return this.service.adminDeleteContractKind(admin.id, contractKindId)
  }
}

