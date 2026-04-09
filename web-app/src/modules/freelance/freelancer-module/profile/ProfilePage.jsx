import { useState } from "react"
import { useAuth } from "../../../../auth/AuthContext"
import { db } from "../../../../auth/firebase"
import { doc, setDoc } from "firebase/firestore"

const ProfilePage = () => {
    const { user } = useAuth()
    const [name, setName] = useState("")
    const [bio, setBio] = useState("")

    const saveProfile = async () => {
        await setDoc(doc(db, "freelancers", user.uid), {
            name,
            bio,
            email: user.email,
            skills: [],
        })

        alert("Profile Saved!")
    }

    return (
        <div>
            <h2>Create Profile</h2>

            <input
                type="text"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
            />

            <input
                type="text"
                placeholder="Bio"
                onChange={(e) => setBio(e.target.value)}
            />

            <button onClick={saveProfile}>Save</button>
        </div>
    )
}

export default ProfilePage
