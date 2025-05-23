import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { db, adminDb } from "./db"

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,            
        })
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account?.provider === "google") {
                try {
                    // Check if user already exists
                    const { data: existingUser, error: fetchError } = await adminDb
                        .from('users')
                        .select('id')
                        .eq('email', user.email)
                        .single()

                    if (fetchError && fetchError.code !== 'PGRST116') {
                        // PGRST116 is "not found" error, which is expected for new users
                        console.error('Error checking existing user:', fetchError)
                        return false
                    }

                    // If user doesn't exist, create them
                    if (!existingUser) {
                        const { error: insertError } = await adminDb
                            .from('users')
                            .insert({
                                email: user.email!,
                                name: user.name || 'Anonymous User',
                            })

                        if (insertError) {
                            console.error('Error creating user:', insertError)
                            return false
                        }

                        console.log('New user created:', user.email)
                    } else {
                        // Update existing user's info if needed
                        const { error: updateError } = await db
                            .from('users')
                            .update({
                                name: user.name || 'Anonymous User',
                            })
                            .eq('email', user.email)

                        if (updateError) {
                            console.error('Error updating user:', updateError)
                        }
                    }

                    return true
                } catch (error) {
                    console.error('Database error during sign in:', error)
                    return false
                }
            }
            return true
        },
        async session({ session, token }) {
            // Add user ID to session
            if (session.user?.email) {
                const { data: user } = await db
                    .from('users')
                    .select('id')
                    .eq('email', session.user.email)
                    .single()
                
                if (user) {
                    (session.user as any).id = user.id
                }
            }
            return session
        },
    }
}
 