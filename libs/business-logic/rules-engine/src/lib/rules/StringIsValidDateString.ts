import { IsTrue } from './IsTrue';
import { CompositeRule } from './CompositeRule';
import { IsNotNullOrUndefined } from './IsNotNullOrUndefined';

/**
 * Use this rule to determine if a string value represents a valid Date/Time
 * string value - that can be used to hydrate a [Date] object.
 * 
 * Example: '2022-01-31T07:08:00.000Z'
 * 
 * 24 characters
 * contains year, month, date, hours, minutes, and seconds, TZ offset
 */
export class StringIsValidDateString extends CompositeRule {
  /**
   * Use to provide the target [Primitive] to evaluate for the specified rule.
   */
  target: string | Date | undefined;

  /**
   * The constructor for the [StringIsNotNullEmptyRangeRule].
   * @param name The name of the rule.
   * @param message The message to display when the rule is violated.
   * @param target The target that the rule(s) will be evaluated against.
   */
  constructor(name: string, message: string, target: string | Date | undefined, isDisplayable = false) {
    super(name, message, isDisplayable);
    this.target = target;

    this.configureRules();
  }

  /**
   * A helper method to configure/add rules to the validation context.
   */

  configureRules() {
    this.rules.push(new IsNotNullOrUndefined('StringIsNotNull', 'The string target is null or undefined.', this.target));
    if (this.target != null) {
      this.rules.push(
        new IsTrue('DateStringIsValid', `The date string value is not valid. Cannot create a date with value of [${this.target}]`, !isNaN(new Date(this.target).getDate()))
      );
    }
  }
}
