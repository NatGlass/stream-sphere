import { signIn } from '@/../next-auth';
import { FcGoogle } from 'react-icons/fc';
import { Button } from '../atoms/button';

function SignUp() {
  return (
    <form
      action={async () => {
        'use server';

        await signIn('google');
      }}
      className="p-4 bg-muted rounded-xl"
    >
      <Button className="bg-white">
        <FcGoogle className="w-4 h-4 mr-2" />
        Sign up with Google
      </Button>
    </form>
  );
}

export default SignUp;
