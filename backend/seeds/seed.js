import mongoose from "mongoose"
import dotenv from "dotenv"
import User from "../src/models/User.model.js"
import Gig from "../src/models/Gig.model.js"
import { freelancersSeed } from "./users.seed.js"
import { gigsSeed } from "./gigs.seed.js"

dotenv.config()

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/syncsaas"
    console.log(`Connecting to MongoDB at ${mongoUri}...`)
    
    await mongoose.connect(mongoUri)
    
    console.log("✓ Connected to MongoDB")

    // Clear existing data
    console.log("\nClearing existing data...")
    const usersDeleted = await User.deleteMany({ "roles.freelancer": true })
    const gigsDeleted = await Gig.deleteMany({})
    console.log(`✓ Deleted ${usersDeleted.deletedCount} users`)
    console.log(`✓ Deleted ${gigsDeleted.deletedCount} gigs`)

    // Seed users
    console.log("\nSeeding users...")
    const createdUsers = await User.insertMany(freelancersSeed)
    console.log(`✓ Created ${createdUsers.length} freelancers`)
    console.log("Freelancers created:")
    createdUsers.forEach((user) => {
      console.log(`  - ${user.name} (${user.email})`)
    })

    // Seed gigs
    console.log("\nSeeding gigs...")
    const createdGigs = await Gig.insertMany(gigsSeed)
    console.log(`✓ Created ${createdGigs.length} gigs`)
    console.log("Gigs created by category:")
    const gigsByCategory = {}
    createdGigs.forEach((gig) => {
      if (!gigsByCategory[gig.category]) {
        gigsByCategory[gig.category] = 0
      }
      gigsByCategory[gig.category]++
    })
    Object.entries(gigsByCategory).forEach(([category, count]) => {
      console.log(`  - ${category}: ${count} gigs`)
    })

    console.log("\n✅ Database seeding completed successfully!")
    console.log(`\nSummary:`)
    console.log(`Total Freelancers: ${createdUsers.length}`)
    console.log(`Total Gigs: ${createdGigs.length}`)
    
    process.exit(0)
  } catch (error) {
    console.error("\n❌ Error seeding database:")
    console.error(error.message)
    if (error.stack) {
      console.error(error.stack)
    }
    process.exit(1)
  }
}

// Run the seed function
seedDatabase()
