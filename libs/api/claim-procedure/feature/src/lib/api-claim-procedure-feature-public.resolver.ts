
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListClaimProcedureInput,
  ApiClaimProcedureDataAccessPublicService,
  ClaimProcedure,
} from '@case-clinical/api/claim-procedure/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiClaimProcedureFeaturePublicResolver {
  constructor(private readonly service: ApiClaimProcedureDataAccessPublicService) {}
           
  @Query(() => [ClaimProcedure], { nullable: true })
  publicClaimProcedures(
    @Args({ name: 'input', type: () => UserListClaimProcedureInput, nullable: true }) input?: UserListClaimProcedureInput,
  ) {
    return this.service.publicClaimProcedures(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountClaimProcedures(
    @Args({ name: 'input', type: () => UserListClaimProcedureInput, nullable: true }) input?: UserListClaimProcedureInput,
  ) {
    return this.service.publicCountClaimProcedures(input)
  }

  @Query(() => [ClaimProcedure], { nullable: true })
  publicSelectClaimProcedures(
    @Args({ name: 'input', type: () => UserListClaimProcedureInput, nullable: true }) input?: UserListClaimProcedureInput,
  ) {
    return this.service.publicSelectClaimProcedures(input)
  }

  @Query(() => ClaimProcedure, { nullable: true })
  publicClaimProcedure(@Args('claimProcedureId') claimProcedureId: string) {
    return this.service.publicClaimProcedure(claimProcedureId)
  }
}
