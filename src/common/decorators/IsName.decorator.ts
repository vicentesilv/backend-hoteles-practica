import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

const messages: Record<string, string> = {
  es: '$property solo debe contener letras (a-z, A-Z) y espacios',
  en: '$property must only contain letters (a-z, A-Z) and spaces',
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
          return typeof value === 'string' && /^[a-zA-Z\s]+$/.test(value);
        },
      },
    });
  };
}