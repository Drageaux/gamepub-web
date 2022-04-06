import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export function noWhitespaceValidator(
  control: AbstractControl
): ValidationErrors | null {
  const trimmedLength = (control.value || '').trim().length === 0;
  return !trimmedLength ? null : { whitespace: true };
}
