import {
  ValidatorConstraint,
  type ValidationArguments,
  type ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isValidDate', async: false })
export class IsValidDate implements ValidatorConstraintInterface {
  private property = '';

  validate(
    dateString: string,
    validationArguments?: ValidationArguments | undefined,
  ): boolean {
    this.property = validationArguments?.property ?? '';
    const regEx = /^\d{4}-\d{2}-\d{2}$/;
    if (dateString.match(regEx) == null) return false;
    const d = new Date(dateString);
    const dNum = d.getTime();
    if (dNum === 0 && dNum !== 0) return false;
    return d.toISOString().slice(0, 10) === dateString;
  }

  defaultMessage(): string {
    return `${this.property} date '$value' is not valid`;
  }
}
