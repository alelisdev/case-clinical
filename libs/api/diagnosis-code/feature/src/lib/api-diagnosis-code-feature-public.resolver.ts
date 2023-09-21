
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListDiagnosisCodeInput,
  ApiDiagnosisCodeDataAccessPublicService,
  DiagnosisCode,
} from '@case-clinical/api/diagnosis-code/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiDiagnosisCodeFeaturePublicResolver {
  constructor(private readonly service: ApiDiagnosisCodeDataAccessPublicService) {}
           
  @Query(() => [DiagnosisCode], { nullable: true })
  publicDiagnosisCodes(
    @Args({ name: 'input', type: () => UserListDiagnosisCodeInput, nullable: true }) input?: UserListDiagnosisCodeInput,
  ) {
    return this.service.publicDiagnosisCodes(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountDiagnosisCodes(
    @Args({ name: 'input', type: () => UserListDiagnosisCodeInput, nullable: true }) input?: UserListDiagnosisCodeInput,
  ) {
    return this.service.publicCountDiagnosisCodes(input)
  }

  @Query(() => [DiagnosisCode], { nullable: true })
  publicSelectDiagnosisCodes(
    @Args({ name: 'input', type: () => UserListDiagnosisCodeInput, nullable: true }) input?: UserListDiagnosisCodeInput,
  ) {
    return this.service.publicSelectDiagnosisCodes(input)
  }

  @Query(() => DiagnosisCode, { nullable: true })
  publicDiagnosisCode(@Args('diagnosisCodeId') diagnosisCodeId: string) {
    return this.service.publicDiagnosisCode(diagnosisCodeId)
  }
}
