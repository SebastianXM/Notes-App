import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { db, type User } from "./db"

export function useCurrentUser() {
    const { data: session } = useSession()
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchUser() {
            if (session?.user?.email) {
                const { data, error } = await db
                    .from('users')
                    .select('*')
                    .eq('email', session.user.email)
                    .single()

                if (data && !error) {
                    setUser(data)
                } else if (error) {
                    console.error('Error fetching user:', error)
                }
            }
            setLoading(false)
        }

        fetchUser()
    }, [session])

    return { user, loading }
}
