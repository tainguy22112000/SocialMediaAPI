const errorMessage = {
  NOT_REGISTERED: 'This user has not been registered',
  INVALID_PASSWORD: 'Invalid password',
  registerd: (email: string) => `${email} has been already registered`,
  INVALID_TOKEN: 'Auth Failed (Invalid Credentials)',
  UNAUTHORIZED: 'Auth Failed (Unauthorized)'
}

export { errorMessage }
