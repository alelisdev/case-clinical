
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateContactPhoneNumberInput,
  UserListContactPhoneNumberInput,
  UserUpdateContactPhoneNumberInput,
  UserUpdateContactPhoneNumbersInput,
  ApiContactPhoneNumberDataAccessUserService,
  ContactPhoneNumber,
} from '@case-clinical/api/contact-phone-number/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListCountryInput, Country } from '@case-clinical/api/country/data-access'
import { UserListContactInput, Contact } from '@case-clinical/api/contact/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiContactPhoneNumberFeatureUserResolver {
  constructor(private readonly service: ApiContactPhoneNumberDataAccessUserService) {}

  @Query(() => [ContactPhoneNumber], { nullable: true })
  userContactPhoneNumbers(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListContactPhoneNumberInput, nullable: true }) input?: UserListContactPhoneNumberInput,
  ) {
    return this.service.userContactPhoneNumbers(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountContactPhoneNumbers(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListContactPhoneNumberInput, nullable: true }) input?: UserListContactPhoneNumberInput,
  ) {
    return this.service.userCountContactPhoneNumbers(user.id, input)
  }

  @Query(() => [ContactPhoneNumber], { nullable: true })
  userSelectContactPhoneNumbers(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListContactPhoneNumberInput, nullable: true }) input?: UserListContactPhoneNumberInput,
  ) {
    return this.service.userSelectContactPhoneNumbers(user.id, input)
  }







  @Query(() => ContactPhoneNumber, { nullable: true })
  userContactPhoneNumber(@CtxUser() user: User, @Args('contactPhoneNumberId') contactPhoneNumberId: string) {
    return this.service.userContactPhoneNumber(user.id, contactPhoneNumberId)
  }

  @Mutation(() => ContactPhoneNumber, { nullable: true })
  userCreateContactPhoneNumber(@CtxUser() user: User, @Args('input') input: UserCreateContactPhoneNumberInput,) {
    return this.service.userCreateContactPhoneNumber(user.id, input)
  }

  @Mutation(() => ContactPhoneNumber, { nullable: true })
  userUpdateContactPhoneNumber(
    @CtxUser() user: User,
    @Args('contactPhoneNumberId') contactPhoneNumberId: string,
    @Args('input') input: UserUpdateContactPhoneNumberInput,
  ) {
    return this.service.userUpdateContactPhoneNumber(user.id, contactPhoneNumberId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateContactPhoneNumbers(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateContactPhoneNumbersInput,
  ) {
    return this.service.userUpdateContactPhoneNumbers(user.id, input)
  }

  @Mutation(() => ContactPhoneNumber, { nullable: true })
  userDeleteContactPhoneNumber(@CtxUser() user: User, @Args('contactPhoneNumberId') contactPhoneNumberId: string) {
    return this.service.userDeleteContactPhoneNumber(user.id, contactPhoneNumberId)
  }
}

