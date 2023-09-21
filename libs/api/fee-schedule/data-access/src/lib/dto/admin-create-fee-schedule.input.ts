import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateOrganizationInput } from '@case-clinical/api/organization/data-access' 
import { AdminCreateSpecialtyInput } from '@case-clinical/api/specialty/data-access' 


@InputType()
export class AdminCreateFeeScheduleInput {

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
  medicarePhysicianNonFacilityRate?: number

  @Field({ nullable: true }) 
  physicianNonFacilityFee?: number

  @Field({ nullable: true }) 
  medicarePhysicianFacilityRate?: number

  @Field({ nullable: true }) 
  physicianFacilityFee?: number

  @Field({ nullable: true }) 
  baseUnit?: string

  @Field({ nullable: true }) 
  profCf?: string


  @Field(() => AdminCreateOrganizationInput ,{ nullable: true }) 
  organization?: AdminCreateOrganizationInput  


  @Field(() => AdminCreateSpecialtyInput ,{ nullable: true }) 
  specialty?: AdminCreateSpecialtyInput  

}