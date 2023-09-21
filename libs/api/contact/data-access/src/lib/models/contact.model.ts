import { Field, ObjectType } from '@nestjs/graphql'

import { ContactKind } from '@case-clinical/api/contact-kind/data-access'
import { Implant } from '@case-clinical/api/implant/data-access' 
import { ContactTag } from '@case-clinical/api/contact-tag/data-access' 
import { ContactEmail } from '@case-clinical/api/contact-email/data-access' 
import { ContactPhoneNumber } from '@case-clinical/api/contact-phone-number/data-access' 
import { ContactSetting } from '@case-clinical/api/contact-setting/data-access' 


@ObjectType()
export class Contact {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

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

  @Field(() => [Implant], { nullable: true }) 
  implants?: Implant[]

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

  @Field(() => [ContactTag], { nullable: true }) 
  tags?: ContactTag[]

  @Field(() => [ContactEmail], { nullable: true }) 
  emails?: ContactEmail[]

  @Field(() => [ContactPhoneNumber], { nullable: true }) 
  phoneNumbers?: ContactPhoneNumber[]

  @Field(() => [ContactSetting], { nullable: true }) 
  contactSettings?: ContactSetting[]


  @Field(() => ContactKind, { nullable: true }) 
  contactKind?: ContactKind  

}
