import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateFirmInput } from '@case-clinical/api/firm/data-access' 


@InputType()
export class AdminCreateFirmStatusInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  blackListed?: boolean

  @Field({ nullable: true }) 
  active?: boolean

  @Field({ nullable: true }) 
  statusColor?: string

  @Field(() => [AdminCreateFirmInput], { nullable: true }) 
  firms?: AdminCreateFirmInput[]


}