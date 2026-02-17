import { useEffect, useState } from "react"
import { useAuth } from "../../../../auth/AuthContext"
import { db } from "../../../../auth/firebase"
import { doc, getDoc } from "firebase/firestore"

const DashboardPage = () => {
    const { user } = useAuth()
    const [profile, setProfile] = useState(null)

    useEffect(() => {
        const fetchProfile = async () => {
            if (!user) return

            const docRef = doc(db, "freelancers", user.uid)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                setProfile(docSnap.data())
            }
        }

        fetchProfile()
    }, [user])

    return (
        <div>
            <h2>Freelancer Dashboard</h2>

            {profile ? (
                <>
                    <h3>Name: {profile.name}</h3>
                    <p>Bio: {profile.bio}</p>

                    <h4>Skills:</h4>
                    <ul>
                        {profile.skills?.map((skill, index) => (
                            <li key={index}>{skill}</li>
                        ))}
                    </ul>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}

export default DashboardPage
