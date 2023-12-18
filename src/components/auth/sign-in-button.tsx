import Link from 'next/link';
import { Button } from '../atoms/button';

function SignInButton() {
  return (
    <Link href="/sign-in">
      <Button size="sm">Sign In</Button>
    </Link>
  );
}

export default SignInButton;
