
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListPriorAuthorizationProcedureCodeInput,
  ApiPriorAuthorizationProcedureCodeDataAccessPublicService,
  PriorAuthorizationProcedureCode,
} from '@case-clinical/api/prior-authorization-procedure-code/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiPriorAuthorizationProcedureCodeFeaturePublicResolver {
  constructor(private readonly service: ApiPriorAuthorizationProcedureCodeDataAccessPublicService) {}
           
  @Query(() => [PriorAuthorizationProcedureCode], { nullable: true })
  publicPriorAuthorizationProcedureCodes(
    @Args({ name: 'input', type: () => UserListPriorAuthorizationProcedureCodeInput, nullable: true }) input?: UserListPriorAuthorizationProcedureCodeInput,
  ) {
    return this.service.publicPriorAuthorizationProcedureCodes(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountPriorAuthorizationProcedureCodes(
    @Args({ name: 'input', type: () => UserListPriorAuthorizationProcedureCodeInput, nullable: true }) input?: UserListPriorAuthorizationProcedureCodeInput,
  ) {
    return this.service.publicCountPriorAuthorizationProcedureCodes(input)
  }

  @Query(() => [PriorAuthorizationProcedureCode], { nullable: true })
  publicSelectPriorAuthorizationProcedureCodes(
    @Args({ name: 'input', type: () => UserListPriorAuthorizationProcedureCodeInput, nullable: true }) input?: UserListPriorAuthorizationProcedureCodeInput,
  ) {
    return this.service.publicSelectPriorAuthorizationProcedureCodes(input)
  }

  @Query(() => PriorAuthorizationProcedureCode, { nullable: true })
  publicPriorAuthorizationProcedureCode(@Args('priorAuthorizationProcedureCodeId') priorAuthorizationProcedureCodeId: string) {
    return this.service.publicPriorAuthorizationProcedureCode(priorAuthorizationProcedureCodeId)
  }
}
