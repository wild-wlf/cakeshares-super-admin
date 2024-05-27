/* eslint-disable no-unreachable */
import React, { useState, useEffect, startTransition } from 'react';
import { createContextHook } from 'use-context-hook';
import { clearCookie, getCookie, setCookie } from '@/helpers/common';
import authService from '@/services/authService';
import { useCancellablePromise } from '@/helpers/promiseHandler';
import { useRouter } from 'next/router';
import Toast from '@/components/molecules/Toast';

const context = {};

export const AuthContext = createContextHook(context);

export const AuthContextProvider = props => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!getCookie(process.env.NEXT_PUBLIC_TOKEN_COOKIE));
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [loading_user, setLoadingUser] = useState(false);
  const [fetch_user, setFetchUser] = useState(false);
  const { cancellablePromise } = useCancellablePromise();
  const [reFetch, setRefetch] = useState(false);
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [allowedPages, setAllowedPages] = useState(
    JSON.parse(getCookie(process.env.NEXT_PUBLIC_ALLOWED_PAGES_COOKIE)) || [],
  );

  const publicPages = ['/sign-in'];

  const privatePages = [
    '/',
    '/dashboard',
    '/manage-user',
    '/manage-products',
    '/community-chat',
    '/stakeholder-chat',
    '/settings',
  ];

  const onLogout = async () => {
    try {
      await authService.logout();
    } finally {
      clearCookie(process.env.NEXT_PUBLIC_TOKEN_COOKIE);
      clearCookie(process.env.NEXT_PUBLIC_ALLOWED_PAGES_COOKIE);
      clearCookie('is_email_verified');
      clearCookie('email');
      await router.push('/sign-in');
      Toast({ type: 'success', message: 'Logout Successfully' });
      setLoadingUser(false);
      setIsLoggedIn(false);
    }
  };

  const getPermissions = () => {
    // debugger
    if (!isLoggedIn) return;
    setLoadingUser(true);
    if (!allowedPages) return;
    cancellablePromise(authService.getCurrentAdmin())
      .then(res => {
        setAllowedPages(res.permissions.filter(p => p.includes('.nav')).map(p => `/${p.split('.')[0]}`));
        setCookie(
          process.env.NEXT_PUBLIC_ALLOWED_PAGES_COOKIE,
          JSON.stringify(res.permissions.filter(p => p.includes('.nav')).map(p => `/${p.split('.')[0]}`)),
        );

        setLoadingUser(false);
        setUser(res);
        if (publicPages.includes(router.pathname)) {
          router.push('/dashboard');
        }
      })
      .catch(err => {
        setLoadingUser(false);
        Toast({
          type: 'error',
          message: err.message,
        });
      });
  };
  /**
   * @description - This function is used to fetch the user details from the server
   */
  // useEffect(() => {
  //   if (isLoggedIn) {
  //     getPermissions();
  //   }
  //   // listen to event
  //   window.addEventListener("FETCH_ADMIN_ROLE", () => {
  //     getPermissions();
  //   });
  //   return () => {
  //     window.removeEventListener("FETCH_ADMIN_ROLE", () => {
  //       getPermissions();
  //     });
  //   };
  // }, [isLoggedIn, fetch_user]);

  useEffect(() => {
    if (isLoggedIn) {
      getPermissions();
    } else if (!isLoggedIn) {
      if (privatePages.includes(router.pathname)) {
        router.push('/sign-in');
      }
    }
  }, [isLoggedIn]);

  const onLogin = async ({ email, password, rememberMe }) => {
    setLoadingUser(true);
    setLoading(true);
    try {
      const res = await authService.login({
        email,
        password,
      });

      if (!res?.token) {
        throw new Error(res?.message);
      }

      setCookie(process.env.NEXT_PUBLIC_TOKEN_COOKIE, res.token);
      router.push('/dashboard');
      setAllowedPages([...res?.admin?.permissions.filter(p => p.includes('.nav')).map(p => `/${p.split('.')[0]}`)]);
      setCookie(
        process.env.NEXT_PUBLIC_ALLOWED_PAGES_COOKIE,
        JSON.stringify(res?.admin?.permissions.filter(p => p.includes('.nav')).map(p => `/${p.split('.')[0]}`)),
      );
      setIsLoggedIn(true);
      Toast({ type: 'success', message: 'Logged In Successfully!' });
      setLoadingUser(false);
      setLoading(false);
    } catch ({ message }) {
      setIsLoggedIn(false);
      setLoadingUser(false);
      setLoading(false);
      Toast({ type: 'error', message });
    }
  };

  /**
   * @description - If the User is Logged in we start listning to the socket
   *
   */
  //   useEffect(() => {
  //     const startListening = () => {
  //       const socket = webSocketConnection.reOpen();
  //       socket.addEventListener("message", (event) => {
  //         const data = JSON.parse(event.data);
  //         const sound = new Audio(
  //           "https://plastk.s3.ca-central-1.amazonaws.com/mp3_file/jim_notification.mp3"
  //         );
  //         window.dispatchEvent(new Event("mousemove"));
  //         sound.play();
  //         Toast({
  //           type: "info",
  //           message: data.message
  //             ? `Received: ${data.message}`
  //             : "Updates Received From Admin",
  //         });
  //         switch (data.type) {
  //           case "LOG_OUT":
  //             onLogout();
  //             break;
  //           default:
  //             window.dispatchEvent(new Event(data.type));
  //             break;
  //         }
  //       });
  //       socket.addEventListener("close", (e) => {
  //         if (e.reason !== "reopening")
  //           setTimeout(() => {
  //             if (isLoggedIn) {
  //               startListening();
  //             } else {
  //               router.push("/");
  //               webSocketConnection.close();
  //             }
  //           }, 5000);
  //       });
  //     };

  //     if (isLoggedIn) {
  //       startListening();
  //     } else {
  //       router.push("/");
  //       webSocketConnection.close();
  //     }
  //   }, [isLoggedIn]);

  // useEffect(() => {
  //   const startListening = () => {
  //     const socket = webSocketConnection.reOpen();
  //     socket.addEventListener("message", (event) => {
  //       const data = JSON.parse(event.data);
  //       const sound = new Audio(
  //         "https://plastk.s3.ca-central-1.amazonaws.com/mp3_file/jim_notification.mp3"
  //       );
  //       window.dispatchEvent(new Event("mousemove"));
  //       sound.play();
  //       Toast({
  //         type: "info",
  //         message: data.message
  //           ? `Received: ${data.message}`
  //           : "Updates Received From Admin",
  //       });
  //       switch (data.type) {
  //         case "LOG_OUT":
  //           onLogout();
  //           break;
  //         default:
  //           window.dispatchEvent(new Event(data.type));
  //           break;
  //       }
  //     });
  //     socket.addEventListener("close", (e) => {
  //       if (e.reason !== "reopening")
  //         setTimeout(() => {
  //           if (isLoggedIn) {
  //             startListening();
  //           }
  //         }, 5000);
  //     });
  //   };
  //   if (isLoggedIn) startListening();
  //   else {
  //     webSocketConnection.close();
  //   }
  // }, [isLoggedIn]);

  /**
   * @description - If someone tries to temper with the cookies we take the appropriate action
   */
  useEffect(() => {
    function listenCookieChange(callback, interval) {
      let old_bap_token = getCookie(process.env.NEXT_PUBLIC_TOKEN_COOKIE);
      let old_allowed = getCookie(process.env.NEXT_PUBLIC_ALLOWED_PAGES_COOKIE);
      startTransition(() => {
        setInterval(() => {
          const new_bap_token = getCookie(process.env.NEXT_PUBLIC_TOKEN_COOKIE);
          const new_allowed = getCookie(process.env.NEXT_PUBLIC_ALLOWED_PAGES_COOKIE);
          if (new_bap_token !== old_bap_token) {
            try {
              callback(new_bap_token, process.env.NEXT_PUBLIC_TOKEN_COOKIE);
            } finally {
              old_bap_token = new_bap_token;
            }
          }
          if (new_allowed !== old_allowed) {
            try {
              callback(new_allowed, process.env.NEXT_PUBLIC_ALLOWED_PAGES_COOKIE);
            } finally {
              old_allowed = new_allowed;
            }
          }
        }, interval);
      });
    }
    listenCookieChange((value, cookie) => {
      if (cookie === process.env.NEXT_PUBLIC_TOKEN_COOKIE) {
        if (!value) {
          // onLogout();
        }
      }
      if (cookie === process.env.NEXT_PUBLIC_ALLOWED_PAGES_COOKIE) {
        if (JSON.stringify(allowedPages) !== value && isLoggedIn) {
          getPermissions();
        }
      }
    }, 1000);
  }, []);

  const hasPermission = perm => user?.permissions?.includes(perm);
  return (
    <AuthContext.Provider
      value={{
        setIsLoggedIn,
        onLogout,
        onLogin,
        refetch: () => setRefetch(_ => !_),
        fetchUser: () => setFetchUser(() => !fetch_user),
        setShowTokenModal,
        setLoading,
        hasPermission,
        allowedPages,
        showTokenModal,
        loading,
        isLoggedIn,
        fetch: reFetch,
        user,
        setUser,
        loading_user,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};
