import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdateContactKindInput } from '@case-clinical/api/contact-kind/data-access' 
import { UserUpdateImplantInput } from '@case-clinical/api/implant/data-access' 
import { UserUpdateContactTagInput } from '@case-clinical/api/contact-tag/data-access' 
import { UserUpdateContactEmailInput } from '@case-clinical/api/contact-email/data-access' 
import { UserUpdateContactPhoneNumberInput } from '@case-clinical/api/contact-phone-number/data-access' 
import { UserUpdateContactSettingInput } from '@case-clinical/api/contact-setting/data-access' 


@InputType()
export class AdminUpdateContactInput {

  @Field({ nullable: true }) 
  id?: string

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

  @Field(() => [UserUpdateImplantInput], { nullable: true }) 
  implants?: UserUpdateImplantInput[]

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

  @Field(() => [UserUpdateContactTagInput], { nullable: true }) 
  tags?: UserUpdateContactTagInput[]

  @Field(() => [UserUpdateContactEmailInput], { nullable: true }) 
  emails?: UserUpdateContactEmailInput[]

  @Field(() => [UserUpdateContactPhoneNumberInput], { nullable: true }) 
  phoneNumbers?: UserUpdateContactPhoneNumberInput[]

  @Field(() => [UserUpdateContactSettingInput], { nullable: true }) 
  contactSettings?: UserUpdateContactSettingInput[]


  @Field(() => AdminUpdateContactKindInput ,{ nullable: true }) 
  contactKind?: AdminUpdateContactKindInput  

}