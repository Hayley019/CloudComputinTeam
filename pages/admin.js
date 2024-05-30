import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

export default function admin() {
    const { data: session, status } = useSession();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (status === "authenticated" && session?.user.role === "admin") {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    }, [session, status]);

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    if (isAdmin) {
        return <p>You are an admin, welcome!</p>;
    }

    return <p>You are not authorized to view this page!</p>;
}