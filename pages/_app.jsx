import { authActions } from '@/redux/auth/authSlice';
import { notificationActions } from '@/redux/notification/notificationSlice';
import { wrapper } from '@/redux/store';
import localStorageUtil from '@/utils/localStorageUtil';
import 'animate.css/animate.min.css';
import { getCookie } from 'cookies-next';
import { useEffect } from 'react';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, cssTransition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';
import { ideaActions } from '@/redux/ideas/ideaSlice';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  const toastTransition = cssTransition({
    enter: 'animate__animated animate__slideInDown',
    exit: 'animate__animated animate__slideOutUp'
  });
  const company = useSelector((state) => state.company.company);
  const { user, guestInfo, userIp } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const guestInfo = localStorageUtil.get('guestAuthentication');
    if (guestInfo) {
      dispatch(authActions.setGuestInfo(guestInfo));
    }
  }, []);
  useEffect(() => {
    const theme = localStorageUtil.get('theme');
    document.body.className = theme;
  }, []);

  useEffect(() => {
    if (company) {
      document.title = company.name;
      document.body.className = company.theme;
      localStorageUtil.set('theme', company.theme);
      localStorageUtil.set('companyId', company._id);
    }
  }, [company]);

  useEffect(() => {
    const userFromCookie = JSON.parse(getCookie('user') || null);
    const session = JSON.parse(getCookie('session') || null);
    if (userFromCookie && session) {
      dispatch(authActions.authStateChange({ user: userFromCookie, session }));
      localStorage.removeItem('guestAuthentication');
    }
  }, []);

  useEffect(() => {
    if (user && company) {
      dispatch(
        notificationActions.getNotifications({
          userId: user?._id,
          companyId: company?._id,
          limit: 50,
          page: 1,
          isMember: company.role && company?.role !== 'Guest'
        })
      );
    }
  }, [user, company]);

  useEffect(() => {
    if (company) {
      dispatch(
        ideaActions.getUserVotes({
          filter: [
            `this.companyId == '${company?._id}'`,
            user
              ? `this.userId == '${user._id}'`
              : guestInfo.email
              ? `this.guestEmail == '${guestInfo.email}'`
              : `this.ip == '${userIp}'`
          ]
            .filter(Boolean)
            .join(' && ')
        })
      );
    }
  }, [company, user, guestInfo, userIp]);

  return (
    <>
      <Head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta
          name="description"
          content="Gather, organize, and prioritize customer feedback, create product roadmaps, and announce product updates for free using our customer feedback management tool."
        />
        <meta
          name="keywords"
          content="customer feedback, feedback management, product roadmap, feature prioritization, announcements tool, product updates, Idealy"
        />

        <link rel="icon" href={company?.favicon ?? '/favicon.ico'} />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="msapplication-config" content="browserconfig.xml" />
        <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

        <meta name="theme-color" content="#ffffff" />
        <link rel="canonical" href="http://idealy.io" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://idealy.io" />
        <meta property="og:title" content={company.name} />
        <meta property="og:image" content="https://www.idealy.io/og-idealy.png" />
        <meta
          property="og:description"
          content="Gather, organize, and prioritize customer feedback, create product roadmaps, and announce product updates for free using our customer feedback management tool."
        />
        <meta property="og:site_name" content="Idealy" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@altogic" />
        <meta name="twitter:creator" content="@enesmozer" />
        <meta name="twitter:url" content="https://twitter.com/Altogic" />
        <meta name="twitter:title" content={company.name} />
        <meta
          name="twitter:description"
          content="Gather, organize, and prioritize customer feedback, create product roadmaps, and announce product updates for free using our customer feedback management tool."
        />
        <meta name="twitter:image" content="https://www.idealy.io/og-idealy.png" />
      </Head>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="light"
        width="500px"
        transition={toastTransition}
      />
      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(MyApp);
