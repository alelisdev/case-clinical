import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdateFirmInput } from '@case-clinical/api/firm/data-access' 
import { AdminUpdateAttorneyStatusInput } from '@case-clinical/api/attorney-status/data-access' 
import { AdminUpdateAttorneyTypeInput } from '@case-clinical/api/attorney-type/data-access' 
import { UserUpdateLegalCaseInput } from '@case-clinical/api/legal-case/data-access' 
import { UserUpdateUserInput } from '@case-clinical/api/user/data-access' 


@InputType()
export class AdminUpdateAttorneyInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  firmId?: string

  @Field({ nullable: true }) 
  attorneyStatusId?: string

  @Field({ nullable: true }) 
  attorneyTypeId?: string

  @Field({ nullable: true }) 
  title?: string

  @Field({ nullable: true }) 
  firstName?: string

  @Field({ nullable: true }) 
  lastName?: string

  @Field({ nullable: true }) 
  address?: string

  @Field({ nullable: true }) 
  city?: string

  @Field({ nullable: true }) 
  state?: string

  @Field({ nullable: true }) 
  zip?: string

  @Field({ nullable: true }) 
  email?: string

  @Field({ nullable: true }) 
  direct?: string

  @Field({ nullable: true }) 
  fax?: string

  @Field({ nullable: true }) 
  cellPhone?: string

  @Field({ nullable: true }) 
  barNumber?: string

  @Field({ nullable: true }) 
  barState?: string

  @Field({ nullable: true }) 
  doNotDisturb?: boolean

  @Field({ nullable: true }) 
  temp?: string

  @Field({ nullable: true }) 
  createdById?: string

  @Field({ nullable: true }) 
  dateCreated?: Date

  @Field({ nullable: true }) 
  removed?: boolean

  @Field({ nullable: true }) 
  migSource?: string

  @Field({ nullable: true }) 
  entity?: string

  @Field({ nullable: true }) 
  firmNolongerNeeded?: boolean

  @Field({ nullable: true }) 
  totalSiteCostAllocated?: number

  @Field({ nullable: true }) 
  totalSiteCostReturned?: number

  @Field({ nullable: true }) 
  totalBilledCharges?: number

  @Field({ nullable: true }) 
  collectedOfBilled?: number

  @Field({ nullable: true }) 
  openCases?: number

  @Field({ nullable: true }) 
  totalCasesReturned?: number

  @Field({ nullable: true }) 
  totalCasesWrittenOff?: number

  @Field(() => [UserUpdateLegalCaseInput], { nullable: true }) 
  legalCases?: UserUpdateLegalCaseInput[]

  @Field(() => UserUpdateUserInput, { nullable: true }) 
  user?: UserUpdateUserInput


  @Field(() => AdminUpdateFirmInput ,{ nullable: true }) 
  firm?: AdminUpdateFirmInput  


  @Field(() => AdminUpdateAttorneyStatusInput ,{ nullable: true }) 
  attorneyStatus?: AdminUpdateAttorneyStatusInput  


  @Field(() => AdminUpdateAttorneyTypeInput ,{ nullable: true }) 
  attorneyType?: AdminUpdateAttorneyTypeInput  

}