import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateFirmInput } from '@case-clinical/api/firm/data-access' 


@InputType()
export class UserUpdateFirmStatusInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  blackListed?: boolean

  @Field({ nullable: true }) 
  active?: boolean

  @Field({ nullable: true }) 
  statusColor?: string

  @Field(() => [UserUpdateFirmInput], { nullable: true }) 
  firms?: UserUpdateFirmInput[]


}