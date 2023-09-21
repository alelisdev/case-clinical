import { CompositeRule } from './CompositeRule';
import { IsNotNullOrUndefined } from './IsNotNullOrUndefined';
import { IsTrue } from './IsTrue';
import { StringIsValidDateString } from './StringIsValidDateString';

/**
 * Use this rule to determine if a string value represents a valid Date/Time
 * string value - that can be used to hydrate a [Date] object.
 * 
 * Example: '2022-01-31T07:08:00.000Z'
 * 
 * 24 characters
 * contains year, month, date, hours, minutes, and seconds, TZ offset
 */
export class DateIsGreaterThanComparisonDate extends CompositeRule {
  /**
   * Use to provide the target [Primitive] to evaluate for the specified rule.
   */
  target: string | Date | undefined;
  comparisonDate: string | Date | undefined;

  /**
   * The constructor for the [StringIsNotNullEmptyRangeRule].
   * @param name The name of the rule.
   * @param message The message to display when the rule is violated.
   * @param target The target that the rule(s) will be evaluated against.
   */
  constructor(
    name: string,
    message: string,
    target: string | Date | undefined,
    comparisonDate: string | Date | undefined,
    isDisplayable = false) {
    super(name, message, isDisplayable);
    this.target = target;
    this.comparisonDate = comparisonDate;

    this.configureRules();
  }

  /**
   * A helper method to configure/add rules to the validation context.
   */

  configureRules() {
    this.rules.push(new IsNotNullOrUndefined('StringIsNotNull', 'The target cannot be null or undefined.', this.target));
    this.rules.push(new IsNotNullOrUndefined('StringIsNotNull', 'The comparison date cannot be null or undefined.', this.comparisonDate));
    if (this.target != null && this.comparisonDate != null) {
      // target and comparison date values are valid
      this.rules.push(new StringIsValidDateString('TargetDateStringIsValidDateString', `The target date value [${this.target.toString()}] is not valid.`, this.target, true));
      this.rules.push(new StringIsValidDateString('ComparisonDateStringIsValidDateString', `The comparison date value [${this.comparisonDate.toString()}] is not valid.`, this.comparisonDate, true));

      // target date is greater than the comparison date;
      this.rules.push(new IsTrue('TargetDateIsGreater', `The target date [${this.target.toLocaleString()}] is not greater than the comparison date [${this.comparisonDate.toLocaleString()}].`, this.target.valueOf() > this.comparisonDate.valueOf()));
    }
  }
}
