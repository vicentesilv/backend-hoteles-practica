import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

const messages: Record<string, string> = {
  es: '$property solo debe contener letras y espacios',
  en: '$property must only contain letters and spaces',
};

export function IsName(
  lang: string = 'en',
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsName',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [lang],
      options: {
        message: messages[lang] ?? messages['en'],
        ...validationOptions,
      },
      validator: {
        validate(value: any, _args: ValidationArguments): boolean {
          return (
            typeof value === 'string' &&
            /^[\p{L}\p{M}\s'-]+$/u.test(value)
          );
        },
      },
    });
  };
}