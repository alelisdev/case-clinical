
import { StringIsNotNullEmptyRange } from "@schema-driven/rules-engine";

export class JournalEntryNameIsValidRule extends StringIsNotNullEmptyRange {
    constructor(name: string, message: string, target: string, minLength: number, maxLenght: number ) {
        super(name, message, target, minLength, maxLenght, true)
    }
}
