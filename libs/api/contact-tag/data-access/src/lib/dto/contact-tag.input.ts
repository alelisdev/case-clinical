import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class ContactTagInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  contactId?: string
}
