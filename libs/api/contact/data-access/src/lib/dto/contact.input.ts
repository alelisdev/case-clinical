import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class ContactInput {

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




}
