export const validateEmail = (email: string) => {
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  if (!emailRegex.test(email)) {
    console.log(email);
    return true;
  }

  // Если все условия прошли успешно, возвращаем null (без ошибок)
  return false;
};
