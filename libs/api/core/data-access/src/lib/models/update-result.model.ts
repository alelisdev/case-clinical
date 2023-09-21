import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UpdateResult {
  @Field({nullable: true})
  total?: number;

  @Field({nullable: true})
  updated?: string

  @Field({nullable: true})
  created?: string

  @Field({ nullable: true })
  failed?: string
}
