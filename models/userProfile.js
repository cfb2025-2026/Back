/**
 * User Profile Model
 * In-memory storage for demonstration purposes
 * In production, this would connect to a database
 */

class UserProfile {
  constructor() {
    // In-memory storage (in production, use a database)
    this.profiles = new Map();
    
    // Initialize with a sample profile
    this.profiles.set('1', {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      bio: 'Software developer passionate about building great products.',
      avatar: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  }

  /**
   * Get a profile by ID
   * @param {string} id - User ID
   * @returns {Object|null} User profile or null if not found
   */
  getProfile(id) {
    return this.profiles.get(id) || null;
  }

  /**
   * Update a profile
   * @param {string} id - User ID
   * @param {Object} updates - Profile updates
   * @returns {Object|null} Updated profile or null if not found
   */
  updateProfile(id, updates) {
    const profile = this.profiles.get(id);
    if (!profile) {
      return null;
    }

    const allowedFields = ['firstName', 'lastName', 'email', 'bio', 'avatar'];
    const filteredUpdates = {};
    
    allowedFields.forEach(field => {
      if (updates[field] !== undefined) {
        filteredUpdates[field] = updates[field];
      }
    });

    const updatedProfile = {
      ...profile,
      ...filteredUpdates,
      updatedAt: new Date().toISOString()
    };

    this.profiles.set(id, updatedProfile);
    return updatedProfile;
  }

  /**
   * Create a new profile
   * @param {Object} profileData - Profile data
   * @returns {Object} Created profile
   */
  createProfile(profileData) {
    const id = Date.now().toString();
    const profile = {
      id,
      firstName: profileData.firstName || '',
      lastName: profileData.lastName || '',
      email: profileData.email || '',
      bio: profileData.bio || '',
      avatar: profileData.avatar || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.profiles.set(id, profile);
    return profile;
  }

  /**
   * Get all profiles
   * @returns {Array} List of all profiles
   */
  getAllProfiles() {
    return Array.from(this.profiles.values());
  }
}

// Singleton instance
const userProfileModel = new UserProfile();

module.exports = userProfileModel;
