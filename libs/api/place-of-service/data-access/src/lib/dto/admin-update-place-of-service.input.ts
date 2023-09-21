import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateClaimProcedureInput } from '@case-clinical/api/claim-procedure/data-access' 
import { UserUpdateLocationInput } from '@case-clinical/api/location/data-access' 


@InputType()
export class AdminUpdatePlaceOfServiceInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  isFacility?: boolean

  @Field(() => [UserUpdateClaimProcedureInput], { nullable: true }) 
  claimProcedures?: UserUpdateClaimProcedureInput[]

  @Field(() => [UserUpdateLocationInput], { nullable: true }) 
  locations?: UserUpdateLocationInput[]


}