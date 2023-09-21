import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class FirmStatusInput {

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

}
