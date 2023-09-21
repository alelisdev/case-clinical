import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateOrganizationInput } from '@case-clinical/api/organization/data-access' 
import { AdminCreateSpecialtyInput } from '@case-clinical/api/specialty/data-access' 


@InputType()
export class AdminCreateFacilityFeeScheduleInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  organizationId?: string

  @Field({ nullable: true }) 
  specialtyId?: string

  @Field({ nullable: true }) 
  code?: string

  @Field({ nullable: true }) 
  modifier?: string

  @Field({ nullable: true }) 
  description?: string

  @Field({ nullable: true }) 
  medicareFacilityRate?: number

  @Field({ nullable: true }) 
  facilityFee?: number

  @Field({ nullable: true }) 
  baseUnit?: number

  @Field({ nullable: true }) 
  profCf?: number


  @Field(() => AdminCreateOrganizationInput ,{ nullable: true }) 
  organization?: AdminCreateOrganizationInput  


  @Field(() => AdminCreateSpecialtyInput ,{ nullable: true }) 
  specialty?: AdminCreateSpecialtyInput  

}