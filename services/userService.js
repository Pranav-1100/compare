const { User } = require('../database');

class UserService {
  static async createUser(userData) {
    return User.create(userData);
  }

  static async getUserById(userId) {
    return User.findByPk(userId);
  }

  static async updateUser(userId, updateData) {
    const user = await User.findByPk(userId);
    if (!user) throw new Error('User not found');
    return user.update(updateData);
  }
}

module.exports = UserService;