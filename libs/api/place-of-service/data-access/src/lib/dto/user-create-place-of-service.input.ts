import { Field, InputType } from '@nestjs/graphql'

import { UserCreateClaimProcedureInput } from '@case-clinical/api/claim-procedure/data-access' 
import { UserCreateLocationInput } from '@case-clinical/api/location/data-access' 


@InputType()
export class UserCreatePlaceOfServiceInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  isFacility?: boolean

  @Field(() => [UserCreateClaimProcedureInput], { nullable: true }) 
  claimProcedures?: UserCreateClaimProcedureInput[]

  @Field(() => [UserCreateLocationInput], { nullable: true }) 
  locations?: UserCreateLocationInput[]


}
