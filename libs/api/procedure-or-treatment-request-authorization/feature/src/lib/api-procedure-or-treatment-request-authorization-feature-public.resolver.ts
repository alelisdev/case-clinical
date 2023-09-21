
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListProcedureOrTreatmentRequestAuthorizationInput,
  ApiProcedureOrTreatmentRequestAuthorizationDataAccessPublicService,
  ProcedureOrTreatmentRequestAuthorization,
} from '@case-clinical/api/procedure-or-treatment-request-authorization/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiProcedureOrTreatmentRequestAuthorizationFeaturePublicResolver {
  constructor(private readonly service: ApiProcedureOrTreatmentRequestAuthorizationDataAccessPublicService) {}
           
  @Query(() => [ProcedureOrTreatmentRequestAuthorization], { nullable: true })
  publicProcedureOrTreatmentRequestAuthorizations(
    @Args({ name: 'input', type: () => UserListProcedureOrTreatmentRequestAuthorizationInput, nullable: true }) input?: UserListProcedureOrTreatmentRequestAuthorizationInput,
  ) {
    return this.service.publicProcedureOrTreatmentRequestAuthorizations(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountProcedureOrTreatmentRequestAuthorizations(
    @Args({ name: 'input', type: () => UserListProcedureOrTreatmentRequestAuthorizationInput, nullable: true }) input?: UserListProcedureOrTreatmentRequestAuthorizationInput,
  ) {
    return this.service.publicCountProcedureOrTreatmentRequestAuthorizations(input)
  }

  @Query(() => [ProcedureOrTreatmentRequestAuthorization], { nullable: true })
  publicSelectProcedureOrTreatmentRequestAuthorizations(
    @Args({ name: 'input', type: () => UserListProcedureOrTreatmentRequestAuthorizationInput, nullable: true }) input?: UserListProcedureOrTreatmentRequestAuthorizationInput,
  ) {
    return this.service.publicSelectProcedureOrTreatmentRequestAuthorizations(input)
  }

  @Query(() => ProcedureOrTreatmentRequestAuthorization, { nullable: true })
  publicProcedureOrTreatmentRequestAuthorization(@Args('procedureOrTreatmentRequestAuthorizationId') procedureOrTreatmentRequestAuthorizationId: string) {
    return this.service.publicProcedureOrTreatmentRequestAuthorization(procedureOrTreatmentRequestAuthorizationId)
  }
}
