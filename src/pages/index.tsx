import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";

export default function Home() {
  const user = useUser()
  return (
    <>
    <h1 className="text-black text-3xl"> Wassup?</h1>
    <div>
      {!user.isSignedIn && <SignInButton/>}
      {!!user.isSignedIn && <SignOutButton />}
    </div>
    </>
  );
}
