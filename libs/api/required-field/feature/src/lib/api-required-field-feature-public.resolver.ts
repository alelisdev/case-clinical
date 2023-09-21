
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListRequiredFieldInput,
  ApiRequiredFieldDataAccessPublicService,
  RequiredField,
} from '@case-clinical/api/required-field/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiRequiredFieldFeaturePublicResolver {
  constructor(private readonly service: ApiRequiredFieldDataAccessPublicService) {}
           
  @Query(() => [RequiredField], { nullable: true })
  publicRequiredFields(
    @Args({ name: 'input', type: () => UserListRequiredFieldInput, nullable: true }) input?: UserListRequiredFieldInput,
  ) {
    return this.service.publicRequiredFields(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountRequiredFields(
    @Args({ name: 'input', type: () => UserListRequiredFieldInput, nullable: true }) input?: UserListRequiredFieldInput,
  ) {
    return this.service.publicCountRequiredFields(input)
  }

  @Query(() => [RequiredField], { nullable: true })
  publicSelectRequiredFields(
    @Args({ name: 'input', type: () => UserListRequiredFieldInput, nullable: true }) input?: UserListRequiredFieldInput,
  ) {
    return this.service.publicSelectRequiredFields(input)
  }

  @Query(() => RequiredField, { nullable: true })
  publicRequiredField(@Args('requiredFieldId') requiredFieldId: string) {
    return this.service.publicRequiredField(requiredFieldId)
  }
}
