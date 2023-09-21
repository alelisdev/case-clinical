import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class RecommendedOrderDiagnosisCodeInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  diagnosisCodeId?: string

  @Field({ nullable: true }) 
  recommendedOrderId?: string
}
