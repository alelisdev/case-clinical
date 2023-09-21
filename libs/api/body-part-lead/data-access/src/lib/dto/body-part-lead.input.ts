import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class BodyPartLeadInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  leadId?: string

  @Field({ nullable: true }) 
  bodyPartId?: string
}
