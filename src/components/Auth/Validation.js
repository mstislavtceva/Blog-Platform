const isValidUrl = (url) => {
  const urlPattern = new RegExp(
    '^(https?:\\/\\/)?' +
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
      '((\\d{1,3}\\.){3}\\d{1,3}))' +
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
      '(\\?[;&a-z\\d%_.~+=-]*)?' +
      '(\\#[-a-z\\d_]*)?$',
    'i'
  );
  // eslint-disable-next-line prefer-regex-literals
  const empty = new RegExp('^s*$');
  return urlPattern.test(url) || empty.test(url);
};

const getOptions = (watch = '') => ({
  username: {
    required: 'Username field is required ',
    minLength: {
      value: 3,
      message: 'Your username needs to be at least 3 characters',
    },
    maxLength: {
      value: 20,
      message: 'Your username needs to be at most 20 characters',
    },
  },
  email: {
    required: 'Email field is required',
    validate: (email) =>
      // eslint-disable-next-line prefer-regex-literals
      new RegExp(
        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
      ).test(email) || 'Please enter a valid email',
  },
  password: {
    required: 'Password field is required',
    minLength: {
      value: 6,
      message: 'Your password needs to be at least 6 characters',
    },
    maxLength: {
      value: 40,
      message: 'Your password needs to be at most 40 characters',
    },
  },
  repeatPassword: {
    required: 'Repeat Password field is required',
    minLength: {
      value: 6,
      message: 'Your password needs to be at least 6 characters',
    },
    maxLength: {
      value: 40,
      message: 'Your password needs to be at most 40 characters',
    },
    validate: (value) => watch && (value === watch || 'Passwords must match'),
  },
  checkbox: {
    required: 'Confirm your consent to the processing of personal data',
  },
  image: {
    validate: (value) => isValidUrl(value) || 'Please enter a valid url',
  },
  title: {
    required: 'Title field is required',
  },
  desc: {
    required: 'Description filed is required',
  },
  text: {
    required: 'Text field is required',
  },
});

export default getOptions;
