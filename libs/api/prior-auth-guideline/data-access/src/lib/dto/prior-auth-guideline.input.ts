import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class PriorAuthGuidelineInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  guidelineId?: string

  @Field({ nullable: true }) 
  priorAuthorizationRequestId?: string
}
