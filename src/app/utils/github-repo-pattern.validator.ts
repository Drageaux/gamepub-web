import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

const githubNamePattern = /^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/i;

export const githubRepoPatternValidator = (canBeEmpty = false) => {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value) {
      const split: string[] = control.value.split('/');
      if (split.length !== 2) {
        return { tooManySlashes: true };
      }

      const correct = split.every((x) => x.match(githubNamePattern));
      return correct ? null : { incorrectPattern: true };
    } else {
      if (canBeEmpty) return null;
    }

    return { incorrectPattern: true };
  };
};
