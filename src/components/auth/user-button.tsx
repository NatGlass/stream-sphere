import {
    UserButton as ClerkUserButton
} from "@clerk/nextjs"


function UserButton({props}: any) {
  return (
    <ClerkUserButton {...props} />
  )
}

export default UserButton