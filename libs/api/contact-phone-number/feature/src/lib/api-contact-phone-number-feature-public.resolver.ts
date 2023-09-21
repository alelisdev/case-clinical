
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListContactPhoneNumberInput,
  ApiContactPhoneNumberDataAccessPublicService,
  ContactPhoneNumber,
} from '@case-clinical/api/contact-phone-number/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiContactPhoneNumberFeaturePublicResolver {
  constructor(private readonly service: ApiContactPhoneNumberDataAccessPublicService) {}
           
  @Query(() => [ContactPhoneNumber], { nullable: true })
  publicContactPhoneNumbers(
    @Args({ name: 'input', type: () => UserListContactPhoneNumberInput, nullable: true }) input?: UserListContactPhoneNumberInput,
  ) {
    return this.service.publicContactPhoneNumbers(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountContactPhoneNumbers(
    @Args({ name: 'input', type: () => UserListContactPhoneNumberInput, nullable: true }) input?: UserListContactPhoneNumberInput,
  ) {
    return this.service.publicCountContactPhoneNumbers(input)
  }

  @Query(() => [ContactPhoneNumber], { nullable: true })
  publicSelectContactPhoneNumbers(
    @Args({ name: 'input', type: () => UserListContactPhoneNumberInput, nullable: true }) input?: UserListContactPhoneNumberInput,
  ) {
    return this.service.publicSelectContactPhoneNumbers(input)
  }

  @Query(() => ContactPhoneNumber, { nullable: true })
  publicContactPhoneNumber(@Args('contactPhoneNumberId') contactPhoneNumberId: string) {
    return this.service.publicContactPhoneNumber(contactPhoneNumberId)
  }
}
