import { Field, ObjectType } from '@nestjs/graphql'

import { Vendor } from '@case-clinical/api/vendor/data-access' 


@ObjectType()
export class VendorType {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [Vendor], { nullable: true }) 
  vendors?: Vendor[]


}
