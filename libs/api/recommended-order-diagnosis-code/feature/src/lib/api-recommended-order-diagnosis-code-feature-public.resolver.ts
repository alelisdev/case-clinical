
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListRecommendedOrderDiagnosisCodeInput,
  ApiRecommendedOrderDiagnosisCodeDataAccessPublicService,
  RecommendedOrderDiagnosisCode,
} from '@case-clinical/api/recommended-order-diagnosis-code/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiRecommendedOrderDiagnosisCodeFeaturePublicResolver {
  constructor(private readonly service: ApiRecommendedOrderDiagnosisCodeDataAccessPublicService) {}
           
  @Query(() => [RecommendedOrderDiagnosisCode], { nullable: true })
  publicRecommendedOrderDiagnosisCodes(
    @Args({ name: 'input', type: () => UserListRecommendedOrderDiagnosisCodeInput, nullable: true }) input?: UserListRecommendedOrderDiagnosisCodeInput,
  ) {
    return this.service.publicRecommendedOrderDiagnosisCodes(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountRecommendedOrderDiagnosisCodes(
    @Args({ name: 'input', type: () => UserListRecommendedOrderDiagnosisCodeInput, nullable: true }) input?: UserListRecommendedOrderDiagnosisCodeInput,
  ) {
    return this.service.publicCountRecommendedOrderDiagnosisCodes(input)
  }

  @Query(() => [RecommendedOrderDiagnosisCode], { nullable: true })
  publicSelectRecommendedOrderDiagnosisCodes(
    @Args({ name: 'input', type: () => UserListRecommendedOrderDiagnosisCodeInput, nullable: true }) input?: UserListRecommendedOrderDiagnosisCodeInput,
  ) {
    return this.service.publicSelectRecommendedOrderDiagnosisCodes(input)
  }

  @Query(() => RecommendedOrderDiagnosisCode, { nullable: true })
  publicRecommendedOrderDiagnosisCode(@Args('recommendedOrderDiagnosisCodeId') recommendedOrderDiagnosisCodeId: string) {
    return this.service.publicRecommendedOrderDiagnosisCode(recommendedOrderDiagnosisCodeId)
  }
}
