import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdateOrganizationInput } from '@case-clinical/api/organization/data-access' 
import { AdminUpdateSpecialtyInput } from '@case-clinical/api/specialty/data-access' 


@InputType()
export class AdminUpdateFeeScheduleInput {

  @Field({ nullable: true }) 
  id?: string

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


  @Field(() => AdminUpdateOrganizationInput ,{ nullable: true }) 
  organization?: AdminUpdateOrganizationInput  


  @Field(() => AdminUpdateSpecialtyInput ,{ nullable: true }) 
  specialty?: AdminUpdateSpecialtyInput  

}