import { Field, ObjectType } from '@nestjs/graphql'

import { WriteOff } from '@case-clinical/api/write-off/data-access' 


@ObjectType()
export class WriteOffStatus {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [WriteOff], { nullable: true }) 
  writeOffs?: WriteOff[]


}
