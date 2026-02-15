export const nameRegex = /^[A-Za-z][A-Za-z\s'-]{1,49}$/;
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

export const validateUserInputSignup = (name, email, password) => {
  if (!nameRegex.test(name)) return "Invalid name";
  if (!emailRegex.test(email)) return "Invalid email";
  if (!passwordRegex.test(password)) return "Weak password";
  return null;
};

export const validateUserInputLogin = (email, password) => {
  if (!emailRegex.test(email) || !passwordRegex.test(password)) return "Invalid email or password";
  return null;
};
