export const mapIntoQueryFieldsArray = <F>(fields: F): string[] => {
  if (typeof fields !== 'object') {
    return [];
  }
  if (Array.isArray(fields)) {
    return fields;
  }

  return Object.entries(fields).reduce((acc: string[], current: [key: string, value: string]): string[] => {
    const [, value] = current;
    return [...acc, value];
  }, []);
};

export const gqlQueryBuilder = (queryName: string, fields: string[]): string => {
  return `
        ${queryName}{
            ${fields.join()}
        }
    `;
};

export const queryArranger = (queries: string[]): string => {
  return `query {
        ${queries.join(' ')}
    }`;
};
