import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class ContactPhoneNumberInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  countryId?: string

  @Field({ nullable: true }) 
  phoneNumber?: string

  @Field({ nullable: true }) 
  label?: string

  @Field({ nullable: true }) 
  contactId?: string
}
