import { SignInButton as ClerkSignInButton } from '@clerk/nextjs';

function SignInButton({ children }: { children: any }) {
  return (
    <div>
      <ClerkSignInButton>{children}</ClerkSignInButton>
    </div>
  );
}

export default SignInButton;
