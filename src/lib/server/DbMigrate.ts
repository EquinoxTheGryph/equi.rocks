export default class DbMigrate {
    verion() {
        // Check the current version and return its name
    }

    needsMigrating() {
        // Check if the database needs to be migrated to the most recent version
        // Returns a boolean
    }

    migrate(target?: string) {
        // Migrate up or down, depending on the target (always up if null)
        // Apply the required steps
        // Set the current version in the db
        // Returns the current version if successful
    }
}