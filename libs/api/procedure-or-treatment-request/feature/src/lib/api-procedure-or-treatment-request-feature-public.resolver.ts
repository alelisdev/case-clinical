
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListProcedureOrTreatmentRequestInput,
  ApiProcedureOrTreatmentRequestDataAccessPublicService,
  ProcedureOrTreatmentRequest,
} from '@case-clinical/api/procedure-or-treatment-request/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiProcedureOrTreatmentRequestFeaturePublicResolver {
  constructor(private readonly service: ApiProcedureOrTreatmentRequestDataAccessPublicService) {}
           
  @Query(() => [ProcedureOrTreatmentRequest], { nullable: true })
  publicProcedureOrTreatmentRequests(
    @Args({ name: 'input', type: () => UserListProcedureOrTreatmentRequestInput, nullable: true }) input?: UserListProcedureOrTreatmentRequestInput,
  ) {
    return this.service.publicProcedureOrTreatmentRequests(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountProcedureOrTreatmentRequests(
    @Args({ name: 'input', type: () => UserListProcedureOrTreatmentRequestInput, nullable: true }) input?: UserListProcedureOrTreatmentRequestInput,
  ) {
    return this.service.publicCountProcedureOrTreatmentRequests(input)
  }

  @Query(() => [ProcedureOrTreatmentRequest], { nullable: true })
  publicSelectProcedureOrTreatmentRequests(
    @Args({ name: 'input', type: () => UserListProcedureOrTreatmentRequestInput, nullable: true }) input?: UserListProcedureOrTreatmentRequestInput,
  ) {
    return this.service.publicSelectProcedureOrTreatmentRequests(input)
  }

  @Query(() => ProcedureOrTreatmentRequest, { nullable: true })
  publicProcedureOrTreatmentRequest(@Args('procedureOrTreatmentRequestId') procedureOrTreatmentRequestId: string) {
    return this.service.publicProcedureOrTreatmentRequest(procedureOrTreatmentRequestId)
  }
}
