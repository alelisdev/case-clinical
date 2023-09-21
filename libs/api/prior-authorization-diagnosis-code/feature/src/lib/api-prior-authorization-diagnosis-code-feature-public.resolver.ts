
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListPriorAuthorizationDiagnosisCodeInput,
  ApiPriorAuthorizationDiagnosisCodeDataAccessPublicService,
  PriorAuthorizationDiagnosisCode,
} from '@case-clinical/api/prior-authorization-diagnosis-code/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiPriorAuthorizationDiagnosisCodeFeaturePublicResolver {
  constructor(private readonly service: ApiPriorAuthorizationDiagnosisCodeDataAccessPublicService) {}
           
  @Query(() => [PriorAuthorizationDiagnosisCode], { nullable: true })
  publicPriorAuthorizationDiagnosisCodes(
    @Args({ name: 'input', type: () => UserListPriorAuthorizationDiagnosisCodeInput, nullable: true }) input?: UserListPriorAuthorizationDiagnosisCodeInput,
  ) {
    return this.service.publicPriorAuthorizationDiagnosisCodes(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountPriorAuthorizationDiagnosisCodes(
    @Args({ name: 'input', type: () => UserListPriorAuthorizationDiagnosisCodeInput, nullable: true }) input?: UserListPriorAuthorizationDiagnosisCodeInput,
  ) {
    return this.service.publicCountPriorAuthorizationDiagnosisCodes(input)
  }

  @Query(() => [PriorAuthorizationDiagnosisCode], { nullable: true })
  publicSelectPriorAuthorizationDiagnosisCodes(
    @Args({ name: 'input', type: () => UserListPriorAuthorizationDiagnosisCodeInput, nullable: true }) input?: UserListPriorAuthorizationDiagnosisCodeInput,
  ) {
    return this.service.publicSelectPriorAuthorizationDiagnosisCodes(input)
  }

  @Query(() => PriorAuthorizationDiagnosisCode, { nullable: true })
  publicPriorAuthorizationDiagnosisCode(@Args('priorAuthorizationDiagnosisCodeId') priorAuthorizationDiagnosisCodeId: string) {
    return this.service.publicPriorAuthorizationDiagnosisCode(priorAuthorizationDiagnosisCodeId)
  }
}
