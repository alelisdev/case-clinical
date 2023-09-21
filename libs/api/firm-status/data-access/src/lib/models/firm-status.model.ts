import { Field, ObjectType } from '@nestjs/graphql'

import { Firm } from '@case-clinical/api/firm/data-access' 


@ObjectType()
export class FirmStatus {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  blackListed?: boolean

  @Field({ nullable: true }) 
  active?: boolean

  @Field({ nullable: true }) 
  statusColor?: string

  @Field(() => [Firm], { nullable: true }) 
  firms?: Firm[]


}
