import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class ContactEmailInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  email?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  contactId?: string
}
