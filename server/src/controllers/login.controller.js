import * as services from '../services/login.services';

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await services.loginUser(username, password);

    if (result) {
      const { user, token } = result;
      res.status(200).json({ message: 'Login successful', user, token });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (err) {
    res.status(500).json({
      message: 'Internal Server Error',
      error: err.message,
    });
  }
};