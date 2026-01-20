import { useAuth } from "../auth/AuthContext"

export const useRole = () => {
  const { user } = useAuth()

  // TEMP: until DB is connected
  const roles = {
    intern: false,
    jobSeeker: false,
    freelancer: false,
    mentor: false,
    employer: false,
    client: false,
    admin: false
  }

  return { roles }
}
