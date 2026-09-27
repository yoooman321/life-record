type objType = number | string | File;

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
  if (typeof value === 'number') {
    console.log('ddddd', toSnakeCase(key));
    formData.append(toSnakeCase(key), value.toString());
  } else {
    console.log('gggg', toSnakeCase(key));
    formData.append(toSnakeCase(key), value);
  }
};

export const objectToFormData = (
  obj: Record<string, objType | objType[] | undefined | null>,
): FormData => {
  console.log('ll', obj);
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
