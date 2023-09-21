import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateJournalEntryTemplateInput } from './user-update-journal-entry-template.input'

@InputType()
export class UserUpdateJournalEntryTemplatesInput {
  @Field(() => [UserUpdateJournalEntryTemplateInput], {nullable: true }) 
  journalEntryTemplates: UserUpdateJournalEntryTemplateInput[]
}
