import { Button } from '../atoms/button';

function SignInButton({ children }: { children: any }) {
  return (
    <div>
      <Button>
        <div>{children}</div>
      </Button>
    </div>
  );
}

export default SignInButton;
