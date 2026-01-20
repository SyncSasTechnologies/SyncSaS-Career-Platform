import { createContext, useContext, useEffect, useState } from "react"
import { useAuth } from "./AuthContext"
import { fetchCurrentUser } from "../services/user.service"

const RoleContext = createContext()

export function RoleProvider({ children }) {
  const { user } = useAuth()
  const [roles, setRoles] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      setRoles(null)
      setLoading(false)
      return
    }

    const loadUser = async () => {
      try {
        const dbUser = await fetchCurrentUser()
        setRoles(dbUser.roles)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [user])

  return (
    <RoleContext.Provider value={{ roles }}>
      {!loading && children}
    </RoleContext.Provider>
  )
}

export const useRole = () => useContext(RoleContext)
