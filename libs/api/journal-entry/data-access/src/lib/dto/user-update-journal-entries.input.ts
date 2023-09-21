import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateJournalEntryInput } from './user-update-journal-entry.input'

@InputType()
export class UserUpdateJournalEntriesInput {
  @Field(() => [UserUpdateJournalEntryInput], {nullable: true }) 
  journalEntries: UserUpdateJournalEntryInput[]
}
