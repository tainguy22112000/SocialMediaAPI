const errorMessage = {
  NOT_REGISTERED: 'This user is not registered',
  INVALID_PASSWORD: 'Invalid password',
  registerd: (email: string) => `${email} has been already registered`
}

export { errorMessage }
