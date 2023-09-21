
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListAuthorizationDiagnosisCodeInput,
  ApiAuthorizationDiagnosisCodeDataAccessPublicService,
  AuthorizationDiagnosisCode,
} from '@case-clinical/api/authorization-diagnosis-code/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiAuthorizationDiagnosisCodeFeaturePublicResolver {
  constructor(private readonly service: ApiAuthorizationDiagnosisCodeDataAccessPublicService) {}
           
  @Query(() => [AuthorizationDiagnosisCode], { nullable: true })
  publicAuthorizationDiagnosisCodes(
    @Args({ name: 'input', type: () => UserListAuthorizationDiagnosisCodeInput, nullable: true }) input?: UserListAuthorizationDiagnosisCodeInput,
  ) {
    return this.service.publicAuthorizationDiagnosisCodes(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountAuthorizationDiagnosisCodes(
    @Args({ name: 'input', type: () => UserListAuthorizationDiagnosisCodeInput, nullable: true }) input?: UserListAuthorizationDiagnosisCodeInput,
  ) {
    return this.service.publicCountAuthorizationDiagnosisCodes(input)
  }

  @Query(() => [AuthorizationDiagnosisCode], { nullable: true })
  publicSelectAuthorizationDiagnosisCodes(
    @Args({ name: 'input', type: () => UserListAuthorizationDiagnosisCodeInput, nullable: true }) input?: UserListAuthorizationDiagnosisCodeInput,
  ) {
    return this.service.publicSelectAuthorizationDiagnosisCodes(input)
  }

  @Query(() => AuthorizationDiagnosisCode, { nullable: true })
  publicAuthorizationDiagnosisCode(@Args('authorizationDiagnosisCodeId') authorizationDiagnosisCodeId: string) {
    return this.service.publicAuthorizationDiagnosisCode(authorizationDiagnosisCodeId)
  }
}
