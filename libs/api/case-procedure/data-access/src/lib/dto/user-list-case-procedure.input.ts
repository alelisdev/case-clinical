import { Field,InputType } from '@nestjs/graphql'
import { CorePagingInput } from '@case-clinical/api/core/data-access'

@InputType()
export class UserListCaseProcedureInput extends CorePagingInput {
  @Field({ nullable: true })
  name?: string


  @Field({ nullable: true })
  legalCaseId?: string


  @Field({ nullable: true })
  appointmentId?: string

  @Field({ nullable: true })
  procedureTypeId?: string


  @Field({ nullable: true })
  locationId?: string

  @Field({ nullable: true })
  procedureStatusId?: string


}
