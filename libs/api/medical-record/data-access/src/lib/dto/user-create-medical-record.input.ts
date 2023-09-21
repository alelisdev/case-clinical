import { Field, InputType } from '@nestjs/graphql'
import { UserCreateDocumentInput } from '@case-clinical/api/document/data-access'
import { UserCreateClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access'


@InputType()
export class UserCreateMedicalRecordInput {

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  clinicalProviderId?: string

  @Field({ nullable: true })
  patientId?: string

  @Field({ nullable: true })
  documentId?: string

  @Field({ nullable: true }) 
  description?: string
  
  @Field(() => UserCreateClinicalProviderInput ,{ nullable: true })
  clinicalProvider?: UserCreateClinicalProviderInput


  @Field(() => UserCreateDocumentInput ,{ nullable: true })
  document?: UserCreateDocumentInput

  
}
