import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdateOrganizationInput } from '@case-clinical/api/organization/data-access' 
import { AdminUpdateSpecialtyInput } from '@case-clinical/api/specialty/data-access' 


@InputType()
export class AdminUpdateFacilityFeeScheduleInput {

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
  medicareFacilityRate?: number

  @Field({ nullable: true }) 
  facilityFee?: number

  @Field({ nullable: true }) 
  baseUnit?: number

  @Field({ nullable: true }) 
  profCf?: number


  @Field(() => AdminUpdateOrganizationInput ,{ nullable: true }) 
  organization?: AdminUpdateOrganizationInput  


  @Field(() => AdminUpdateSpecialtyInput ,{ nullable: true }) 
  specialty?: AdminUpdateSpecialtyInput  

}