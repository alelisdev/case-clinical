import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateImplantInput } from '@case-clinical/api/implant/data-access' 


@InputType()
export class UserUpdateManufacturerInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

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

  @Field(() => [UserUpdateImplantInput], { nullable: true }) 
  implants?: UserUpdateImplantInput[]


}