export const isValidEmail = (email: string): boolean => {
  try {
    if (email == '' || email == undefined) {
      throw new Error('Email is required to be validated.');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailValid = emailRegex.test(email);

    if (!emailValid) {
      throw new Error('Email is not valid.');
    }

    return emailValid;
  } catch (error) {
    const err = error as Error;
    throw new Error(err.message);
  }
};

export const isValidUsername = (username: string) => {
  try {
    if (!username) {
      throw new Error('A username is required to be validated.');
    }

    if (username.length < 3 || username.length > 20) {
      throw new Error('Username must be between 3 and 20 characters.');
    }

    const usernameRegex = /^[a-zA-Z0-9]{3,20}$/;

    if (!usernameRegex.test(username)) {
      throw new Error('Username can only contain alphanumeric characters.');
    }

    return true;
  } catch (error) {
    const err = error as Error;
    throw new Error(err.message);
  }
};

export const isValidPassword = (password: string) => {
  try {
    if (!password) {
      throw new Error('A password is required.');
    }

    if (password.length < 8 || password.length > 20) {
      throw new Error('Password must be between 8 and 20 characters.');
    }

    if (!/[0-9]/.test(password)) {
      throw new Error('Password must contain at least one number.');
    }

    if (!/[a-z]/.test(password)) {
      throw new Error('Password must contain at least one lowercase letter.');
    }

    if (!/[A-Z]/.test(password)) {
      throw new Error('Password must contain at least one uppercase letter.');
    }

    if (!/[$@#%^&*_\-]/.test(password)) {
      throw new Error(
        'Password must contain at least one special character: $@#%^&*_-.'
      );
    }

    const passwordRegex = /^[0-9a-zA-Z$@#%^&*_\-]{8,20}$/;
    if (!passwordRegex.test(password)) {
      throw new Error(
        'Password can only contain alphanumeric characters and $@#%^&*_-.'
      );
    }

    return true;
  } catch (error) {
    const err = error as Error;
    throw new Error(err.message);
  }
};

export const isValidConfirmationCode = (confirmationCode: string): boolean => {
  try {
    if (confirmationCode == '') {
      throw new Error('A confirmation code is required to be validated.');
    }

    const confirmationCodeRegex = /^[a-zA-Z0-9-]+$/;
    const confirmationCodeValid = confirmationCodeRegex.test(confirmationCode);

    if (!confirmationCodeValid) {
      throw new Error('Confirmation code provided is not valid.');
    }

    return confirmationCodeValid;
  } catch (error) {
    const err = error as Error;
    throw new Error(err.message);
  }
};

export const isValidName = (name: string): boolean => {
  try {
    if (name == '') {
      throw new Error('A name is required to be validated.');
    }

    const nameRegex = /^[a-zA-Z]+$/;
    const nameValid = nameRegex.test(name);

    if (!nameValid) {
      throw new Error('Name provided is not valid.');
    }

    return nameValid;
  } catch (error) {
    const err = error as Error;
    throw new Error(err.message);
  }
};

export const isValidPhone = (phone: string): boolean => {
  try {
    if (!phone) {
      throw new Error('A phone number is required.');
    }

    const phoneRegex = /^[0-9]{11,15}$/;

    if (!phoneRegex.test(phone)) {
      throw new Error(
        'Invalid phone number. A valid phone number is between 11 and 15 digits long.'
      );
    }

    return true;
  } catch (error) {
    const err = error as Error;
    throw new Error(err.message);
  }
};
