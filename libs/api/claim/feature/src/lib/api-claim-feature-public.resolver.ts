
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListClaimInput,
  ApiClaimDataAccessPublicService,
  Claim,
} from '@case-clinical/api/claim/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiClaimFeaturePublicResolver {
  constructor(private readonly service: ApiClaimDataAccessPublicService) {}
           
  @Query(() => [Claim], { nullable: true })
  publicClaims(
    @Args({ name: 'input', type: () => UserListClaimInput, nullable: true }) input?: UserListClaimInput,
  ) {
    return this.service.publicClaims(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountClaims(
    @Args({ name: 'input', type: () => UserListClaimInput, nullable: true }) input?: UserListClaimInput,
  ) {
    return this.service.publicCountClaims(input)
  }

  @Query(() => [Claim], { nullable: true })
  publicSelectClaims(
    @Args({ name: 'input', type: () => UserListClaimInput, nullable: true }) input?: UserListClaimInput,
  ) {
    return this.service.publicSelectClaims(input)
  }

  @Query(() => Claim, { nullable: true })
  publicClaim(@Args('claimId') claimId: string) {
    return this.service.publicClaim(claimId)
  }
}
