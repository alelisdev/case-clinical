import { Field, InputType } from '@nestjs/graphql'

import { UserCreateContactKindInput } from '@case-clinical/api/contact-kind/data-access' 
import { UserCreateImplantInput } from '@case-clinical/api/implant/data-access' 
import { UserCreateContactTagInput } from '@case-clinical/api/contact-tag/data-access' 
import { UserCreateContactEmailInput } from '@case-clinical/api/contact-email/data-access' 
import { UserCreateContactPhoneNumberInput } from '@case-clinical/api/contact-phone-number/data-access' 
import { UserCreateContactSettingInput } from '@case-clinical/api/contact-setting/data-access' 


@InputType()
export class UserCreateContactInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  honorific?: string

  @Field({ nullable: true }) 
  firstName?: string

  @Field({ nullable: true }) 
  lastName?: string

  @Field({ nullable: true }) 
  suffix?: string

  @Field({ nullable: true }) 
  primaryPhoneNumber?: string

  @Field({ nullable: true }) 
  primaryEmailAddress?: string

  @Field({ nullable: true }) 
  primaryAddressLine1?: string

  @Field({ nullable: true }) 
  primaryAddressLine2?: string

  @Field({ nullable: true }) 
  primaryAddressCity?: string

  @Field({ nullable: true }) 
  primaryAddressStateOrProvince?: string

  @Field({ nullable: true }) 
  primaryAddressPostalCode?: string

  @Field({ nullable: true }) 
  notes?: string

  @Field({ nullable: true }) 
  discriminator?: string

  @Field({ nullable: true }) 
  contactKindId?: string

  @Field({ nullable: true }) 
  dateOfBirth?: Date

  @Field({ nullable: true }) 
  latitude?: number

  @Field({ nullable: true }) 
  longitude?: number

  @Field(() => [UserCreateImplantInput], { nullable: true }) 
  implants?: UserCreateImplantInput[]

  @Field({ nullable: true }) 
  avatar?: string

  @Field({ nullable: true }) 
  background?: string

  @Field({ nullable: true }) 
  title?: string

  @Field({ nullable: true }) 
  company?: string

  @Field({ nullable: true }) 
  birthday?: string

  @Field({ nullable: true }) 
  address?: string

  @Field(() => [UserCreateContactTagInput], { nullable: true }) 
  tags?: UserCreateContactTagInput[]

  @Field(() => [UserCreateContactEmailInput], { nullable: true }) 
  emails?: UserCreateContactEmailInput[]

  @Field(() => [UserCreateContactPhoneNumberInput], { nullable: true }) 
  phoneNumbers?: UserCreateContactPhoneNumberInput[]

  @Field(() => [UserCreateContactSettingInput], { nullable: true }) 
  contactSettings?: UserCreateContactSettingInput[]


  @Field(() => UserCreateContactKindInput ,{ nullable: true }) 
  contactKind?: UserCreateContactKindInput  

}
