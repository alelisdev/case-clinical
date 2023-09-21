import { Field, ObjectType } from '@nestjs/graphql'

import { Contact } from '@case-clinical/api/contact/data-access' 


@ObjectType()
export class ContactKind {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [Contact], { nullable: true }) 
  contacts?: Contact[]


}
