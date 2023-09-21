import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateClaimProcedureInput } from '@case-clinical/api/claim-procedure/data-access' 
import { AdminCreateLocationInput } from '@case-clinical/api/location/data-access' 


@InputType()
export class AdminCreatePlaceOfServiceInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  isFacility?: boolean

  @Field(() => [AdminCreateClaimProcedureInput], { nullable: true }) 
  claimProcedures?: AdminCreateClaimProcedureInput[]

  @Field(() => [AdminCreateLocationInput], { nullable: true }) 
  locations?: AdminCreateLocationInput[]


}