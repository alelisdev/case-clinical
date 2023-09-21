
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListClaimStatusInput,
  ApiClaimStatusDataAccessPublicService,
  ClaimStatus,
} from '@case-clinical/api/claim-status/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiClaimStatusFeaturePublicResolver {
  constructor(private readonly service: ApiClaimStatusDataAccessPublicService) {}
           
  @Query(() => [ClaimStatus], { nullable: true })
  publicClaimStatuses(
    @Args({ name: 'input', type: () => UserListClaimStatusInput, nullable: true }) input?: UserListClaimStatusInput,
  ) {
    return this.service.publicClaimStatuses(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountClaimStatuses(
    @Args({ name: 'input', type: () => UserListClaimStatusInput, nullable: true }) input?: UserListClaimStatusInput,
  ) {
    return this.service.publicCountClaimStatuses(input)
  }

  @Query(() => [ClaimStatus], { nullable: true })
  publicSelectClaimStatuses(
    @Args({ name: 'input', type: () => UserListClaimStatusInput, nullable: true }) input?: UserListClaimStatusInput,
  ) {
    return this.service.publicSelectClaimStatuses(input)
  }

  @Query(() => ClaimStatus, { nullable: true })
  publicClaimStatus(@Args('claimStatusId') claimStatusId: string) {
    return this.service.publicClaimStatus(claimStatusId)
  }
}
