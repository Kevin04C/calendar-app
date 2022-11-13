

export const getEnvVariables = () => {

  const variables = import.meta.env;

  return {
    ...variables
  }
}
