import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateReconciliationPeriodTypeInput } from './user-update-reconciliation-period-type.input'

@InputType()
export class UserUpdateReconciliationPeriodTypesInput {
  @Field(() => [UserUpdateReconciliationPeriodTypeInput], {nullable: true }) 
  reconciliationPeriodTypes: UserUpdateReconciliationPeriodTypeInput[]
}
