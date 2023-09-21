import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class MedLevelInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  approvedSiteCosts?: number

  @Field({ nullable: true }) 
  maximumMedicalBillsToDate?: number


}
