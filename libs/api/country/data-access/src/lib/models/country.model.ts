import { Field, ObjectType } from '@nestjs/graphql'

import { ContactPhoneNumber } from '@case-clinical/api/contact-phone-number/data-access' 


@ObjectType()
export class Country {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  iso?: string

  @Field({ nullable: true }) 
  code?: string

  @Field({ nullable: true }) 
  flagImagePos?: string

  @Field(() => [ContactPhoneNumber], { nullable: true }) 
  contactPhoneNumbers?: ContactPhoneNumber[]


}
