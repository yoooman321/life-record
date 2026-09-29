type objType = number | string | File | boolean;

type appendDataArgs = {
  formData: FormData;
  key: string;
  value: objType;
};

const toSnakeCase = (str: string): string => {
  const snakeKey = str.replace(
    /[A-Z]/g,
    (letter) => `_${letter.toLowerCase()}`,
  );
  return snakeKey;
};

const appendData = ({ formData, key, value }: appendDataArgs) => {
  if (typeof value === 'number' || typeof value === 'boolean') {
    formData.append(toSnakeCase(key), value.toString());
  } else {
    formData.append(toSnakeCase(key), value);
  }
};

export const objectToFormData = (
  obj: Record<string, objType | objType[] | undefined | null | boolean>,
): FormData => {
  const formData = new FormData();
  Object.entries(obj).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => {
        appendData({ formData, key, value: v });
      });
    } else if (value !== undefined && value !== null && value !== '') {
      appendData({ formData, key, value });
    }
  });

  return formData;
};
