
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateContactPhoneNumberInput,
  AdminListContactPhoneNumberInput,
  AdminUpdateContactPhoneNumberInput,
  ApiContactPhoneNumberDataAccessAdminService,
  ContactPhoneNumber
} from '@case-clinical/api/contact-phone-number/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListCountryInput, Country } from '@case-clinical/api/country/data-access'
import { AdminListContactInput, Contact } from '@case-clinical/api/contact/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiContactPhoneNumberFeatureAdminResolver {
  constructor(private readonly service: ApiContactPhoneNumberDataAccessAdminService) {}

  @Query(() => [ContactPhoneNumber], { nullable: true })
  adminContactPhoneNumbers(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListContactPhoneNumberInput, nullable: true }) input?: AdminListContactPhoneNumberInput,
  ) {
    return this.service.adminContactPhoneNumbers(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountContactPhoneNumbers(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListContactPhoneNumberInput, nullable: true }) input?: AdminListContactPhoneNumberInput,
  ) {
    return this.service.adminCountContactPhoneNumbers(admin.id, input)
  }





  @Query(() => ContactPhoneNumber, { nullable: true })
  adminContactPhoneNumber(@CtxUser() admin: User, @Args('contactPhoneNumberId') contactPhoneNumberId: string) {
    return this.service.adminContactPhoneNumber(admin.id, contactPhoneNumberId)
  }

  @Mutation(() => ContactPhoneNumber, { nullable: true })
  adminCreateContactPhoneNumber(@CtxUser() admin: User, @Args('input') input: AdminCreateContactPhoneNumberInput,) {
    return this.service.adminCreateContactPhoneNumber(admin.id, input)
  }

  @Mutation(() => ContactPhoneNumber, { nullable: true })
  adminUpdateContactPhoneNumber(
    @CtxUser() admin: User,
    @Args('contactPhoneNumberId') contactPhoneNumberId: string,
    @Args('input') input: AdminUpdateContactPhoneNumberInput,
  ) {
    return this.service.adminUpdateContactPhoneNumber(admin.id, contactPhoneNumberId, input)
  }

  @Mutation(() => ContactPhoneNumber, { nullable: true })
  adminDeleteContactPhoneNumber(@CtxUser() admin: User, @Args('contactPhoneNumberId') contactPhoneNumberId: string) {
    return this.service.adminDeleteContactPhoneNumber(admin.id, contactPhoneNumberId)
  }
}

