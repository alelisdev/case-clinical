import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateFirmStatusInput } from '@case-clinical/api/firm-status/data-access' 
import { AdminCreateDocumentInput } from '@case-clinical/api/document/data-access' 
import { AdminCreateAttorneyInput } from '@case-clinical/api/attorney/data-access' 
import { AdminCreateLegalCaseInput } from '@case-clinical/api/legal-case/data-access' 


@InputType()
export class AdminCreateFirmInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  firmStatusNote?: string

  @Field({ nullable: true }) 
  firmStatusId?: string

  @Field({ nullable: true }) 
  firmName?: string

  @Field({ nullable: true }) 
  address?: string

  @Field({ nullable: true }) 
  address2?: string

  @Field({ nullable: true }) 
  city?: string

  @Field({ nullable: true }) 
  state?: string

  @Field({ nullable: true }) 
  zip?: string

  @Field({ nullable: true }) 
  country?: string

  @Field({ nullable: true }) 
  office?: string

  @Field({ nullable: true }) 
  fax?: string

  @Field({ nullable: true }) 
  webAddress?: string

  @Field({ nullable: true }) 
  email?: string

  @Field({ nullable: true }) 
  rating?: number

  @Field({ nullable: true }) 
  notes?: string

  @Field({ nullable: true }) 
  doNotDisturb?: boolean

  @Field({ nullable: true }) 
  invoiceOnly?: boolean

  @Field({ nullable: true }) 
  reductionNotes?: string

  @Field({ nullable: true }) 
  deceased?: boolean

  @Field({ nullable: true }) 
  createdBy?: string

  @Field({ nullable: true }) 
  dateCreated?: Date

  @Field({ nullable: true }) 
  openCases?: number

  @Field({ nullable: true }) 
  totalSiteCostReturned?: number

  @Field({ nullable: true }) 
  collectedOfBilled?: number

  @Field({ nullable: true }) 
  totalCasesReturned?: number

  @Field({ nullable: true }) 
  totalSiteCostAllocated?: number

  @Field({ nullable: true }) 
  totalBilledCharges?: number

  @Field({ nullable: true }) 
  averageTimeOut?: number

  @Field(() => [AdminCreateAttorneyInput], { nullable: true }) 
  attorneys?: AdminCreateAttorneyInput[]

  @Field(() => [AdminCreateLegalCaseInput], { nullable: true }) 
  legalCases?: AdminCreateLegalCaseInput[]

  @Field({ nullable: true }) 
  eulaId?: string


  @Field(() => AdminCreateFirmStatusInput ,{ nullable: true }) 
  firmStatus?: AdminCreateFirmStatusInput  


  @Field(() => AdminCreateDocumentInput ,{ nullable: true }) 
  eula?: AdminCreateDocumentInput  

}