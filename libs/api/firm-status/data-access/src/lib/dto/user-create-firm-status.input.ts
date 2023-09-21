import { Field, InputType } from '@nestjs/graphql'

import { UserCreateFirmInput } from '@case-clinical/api/firm/data-access' 


@InputType()
export class UserCreateFirmStatusInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  blackListed?: boolean

  @Field({ nullable: true }) 
  active?: boolean

  @Field({ nullable: true }) 
  statusColor?: string

  @Field(() => [UserCreateFirmInput], { nullable: true }) 
  firms?: UserCreateFirmInput[]


}
