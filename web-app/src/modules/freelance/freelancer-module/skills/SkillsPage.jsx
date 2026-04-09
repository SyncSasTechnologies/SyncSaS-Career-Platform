import { useState, useEffect } from "react";
import { useAuth } from "../../../../auth/AuthContext";
import { db } from "../../../../auth/firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";

const SkillsPage = () => {
    const { user } = useAuth();
    const [skills, setSkills] = useState([]);
    const [newSkill, setNewSkill] = useState("");

    useEffect(() => {
        const fetchSkills = async () => {
            const docRef = doc(db, "freelancers", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setSkills(docSnap.data().skills || []);
            }
        };
        if (user) fetchSkills();
    }, [user]);

    const saveSkills = async (updatedSkills) => {
        await updateDoc(doc(db, "freelancers", user.uid), {
            skills: updatedSkills,
        });
    };

    const addSkill = async () => {
        if (!newSkill.trim()) return;
        const updated = [...skills, newSkill];
        setSkills(updated);
        setNewSkill("");
        await saveSkills(updated);
    };

    const removeSkill = async (index) => {
        const updated = skills.filter((_, i) => i !== index);
        setSkills(updated);
        await saveSkills(updated);
    };

    return (
        <div style={{ padding: "30px" }}>
            <h2>Skills Management</h2>

            <input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add skill"
            />
            <button onClick={addSkill}>Add</button>

            <ul>
                {skills.map((skill, index) => (
                    <li key={index}>
                        {skill}
                        <button onClick={() => removeSkill(index)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SkillsPage;
