import createViewerToken from '@/actions/token';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {JwtPayload, jwtDecode} from "jwt-decode"

function useViewerToken(hostIdentity: string) {
  const [token, setToken] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [identity, setIdentity] = useState<string | null>(null);

  useEffect(() => {
    const createToken = async () => {
      try {
        const viewerToken = await createViewerToken(hostIdentity);

        setToken(viewerToken);

        const decodedToken = jwtDecode(viewerToken) as JwtPayload & {
          name?: string;
        }

        const decodedName = decodedToken?.name;
        const decodedIdentity = decodedToken.jti;

        if (decodedIdentity) {
          setIdentity(decodedIdentity);
        }

        if (decodedName) {
          setName(decodedName);
        }

      } catch (error) {
        toast.error('Something went wrong');
      }
    };

    createToken()
  }, [hostIdentity]);

  return { token, name, identity };
}

export default useViewerToken;
