import Head from "next/head";
import { useRouter } from "next/router";

import { AuthProvider } from "@/contexts/AuthContext";
import AppTemplateHeader from "@/components/molecules/AppTemplateHeader";
import { ApolloWrapper } from "@/graphql/ApolloProvider";

const AppTemplate = ({
  children,
  showheader = true,
}: {
  children: any;
  showheader?: boolean;
}) => {
  const router = useRouter();
  return (
    <ApolloWrapper>
      <AuthProvider>
        <Head>
          <title>Carojon - Your place of convinience</title>
          <meta name='description' content='Search for any business' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <link rel='icon' type='image/png' href='/favicon.png' />
        </Head>

        <div className='app-template-wrapper'>
          {showheader && <AppTemplateHeader />}

          <div>{children}</div>
        </div>
      </AuthProvider>
    </ApolloWrapper>
  );
};

export default AppTemplate;
