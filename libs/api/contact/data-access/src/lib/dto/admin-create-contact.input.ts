import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateContactKindInput } from '@case-clinical/api/contact-kind/data-access' 
import { AdminCreateImplantInput } from '@case-clinical/api/implant/data-access' 
import { AdminCreateContactTagInput } from '@case-clinical/api/contact-tag/data-access' 
import { AdminCreateContactEmailInput } from '@case-clinical/api/contact-email/data-access' 
import { AdminCreateContactPhoneNumberInput } from '@case-clinical/api/contact-phone-number/data-access' 
import { AdminCreateContactSettingInput } from '@case-clinical/api/contact-setting/data-access' 


@InputType()
export class AdminCreateContactInput {

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

  @Field(() => [AdminCreateImplantInput], { nullable: true }) 
  implants?: AdminCreateImplantInput[]

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

  @Field(() => [AdminCreateContactTagInput], { nullable: true }) 
  tags?: AdminCreateContactTagInput[]

  @Field(() => [AdminCreateContactEmailInput], { nullable: true }) 
  emails?: AdminCreateContactEmailInput[]

  @Field(() => [AdminCreateContactPhoneNumberInput], { nullable: true }) 
  phoneNumbers?: AdminCreateContactPhoneNumberInput[]

  @Field(() => [AdminCreateContactSettingInput], { nullable: true }) 
  contactSettings?: AdminCreateContactSettingInput[]


  @Field(() => AdminCreateContactKindInput ,{ nullable: true }) 
  contactKind?: AdminCreateContactKindInput  

}