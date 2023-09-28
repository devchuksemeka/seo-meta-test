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
        <div className='app-template-wrapper'>
          {showheader && <AppTemplateHeader />}

          <div>{children}</div>
        </div>
      </AuthProvider>
    </ApolloWrapper>
  );
};

export default AppTemplate;
