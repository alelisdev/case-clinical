import { Field, ObjectType } from '@nestjs/graphql'

import { Implant } from '@case-clinical/api/implant/data-access' 


@ObjectType()
export class ImplantCategory {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [Implant], { nullable: true }) 
  implants?: Implant[]


}
