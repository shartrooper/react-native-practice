// Helper functions
const chainParamArguments = (args: string[]): string => {
  const re: RegExp = /(\$(\w+)):/;

  const paramArray = args
    .map(arg => {
      const keyword = re.exec(arg);
      if (!keyword) return '';
      return keyword[0].replace(re, '$2: $1');
    })
    .filter(sentence => sentence)
    .join();

  return paramArray.length ? `(${paramArray})` : paramArray;
};

const chainQueryArguments = (args: string[]): string => `(${args.join()})`;

// Utility functions
export const gqlQueryBuilder = (queryName: string, fields: string[], args?: string[]): string => {
  const params = args ? chainParamArguments(args) : '';
  return `
        ${queryName}${params}{
            ${fields.join()}
        }
    `;
};

export const queryArranger = (
  queries: string[],
  args?: string[],
  queryType: 'query' | 'mutation' = 'query',
): string => {
  const queryArguments = args ? chainQueryArguments(args) : '';
  return `${queryType} ${queryArguments}{
        ${queries.join(' ')}
    }`;
};

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
