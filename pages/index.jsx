import Head from 'next/head';
import Layout from '@/components/Layout';

export default function Index() {
  // const handleChange = (event) => {
  //   if (event.target.checked) {
  //     setFeedbackBadges(true);
  //   } else {
  //     setFeedbackBadges(false);
  //   }
  //   // setFeedbackBadges((current) => !current);
  // };

  return (
    <>
      <Head>
        <title>Altogic Canny Alternative Public View</title>
        <meta name="description" content="Altogic Canny Alternative Public View" />
      </Head>
      <Layout />
    </>
  );
}
