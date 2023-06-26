import { Profile } from "@/components/profile/profile"

async function getUser(username: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/staff/retrieve_user/${username}`)
  return res.json()
}

export default async function Users({ params: { username }, }: { params: { username: string } }) {
  const userData = getUser(username)
  const [user] = await Promise.all([userData])

  return (
    <div className="align-middle justify-items-center">
      <Profile />
      <h1>{user.email}</h1>
    </div>
  );
}
