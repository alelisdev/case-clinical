
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListAgreementTypeInput,
  ApiAgreementTypeDataAccessPublicService,
  AgreementType,
} from '@case-clinical/api/agreement-type/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiAgreementTypeFeaturePublicResolver {
  constructor(private readonly service: ApiAgreementTypeDataAccessPublicService) {}
           
  @Query(() => [AgreementType], { nullable: true })
  publicAgreementTypes(
    @Args({ name: 'input', type: () => UserListAgreementTypeInput, nullable: true }) input?: UserListAgreementTypeInput,
  ) {
    return this.service.publicAgreementTypes(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountAgreementTypes(
    @Args({ name: 'input', type: () => UserListAgreementTypeInput, nullable: true }) input?: UserListAgreementTypeInput,
  ) {
    return this.service.publicCountAgreementTypes(input)
  }

  @Query(() => [AgreementType], { nullable: true })
  publicSelectAgreementTypes(
    @Args({ name: 'input', type: () => UserListAgreementTypeInput, nullable: true }) input?: UserListAgreementTypeInput,
  ) {
    return this.service.publicSelectAgreementTypes(input)
  }

  @Query(() => AgreementType, { nullable: true })
  publicAgreementType(@Args('agreementTypeId') agreementTypeId: string) {
    return this.service.publicAgreementType(agreementTypeId)
  }
}
