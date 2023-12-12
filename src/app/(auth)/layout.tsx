import { PropsWithChildren } from 'react';
import './auth.css';

function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="w-full h-screen">
      <div className="w-full h-full auth-bg">
        <div className="h-full w-full max-w-[1400px] mx-auto">
          <div className="w-full h-full lg:w-1/3 flex justify-center items-center backdrop-blur-sm px-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
