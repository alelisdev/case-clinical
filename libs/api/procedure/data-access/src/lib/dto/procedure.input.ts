import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class ProcedureInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  code?: string

}
