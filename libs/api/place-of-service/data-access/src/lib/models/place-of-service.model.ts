import { Field, ObjectType } from '@nestjs/graphql'

import { ClaimProcedure } from '@case-clinical/api/claim-procedure/data-access' 
import { Location } from '@case-clinical/api/location/data-access' 


@ObjectType()
export class PlaceOfService {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  isFacility?: boolean

  @Field(() => [ClaimProcedure], { nullable: true }) 
  claimProcedures?: ClaimProcedure[]

  @Field(() => [Location], { nullable: true }) 
  locations?: Location[]


}
