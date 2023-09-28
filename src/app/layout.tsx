import { ApolloWrapper } from "@/graphql/ApolloProvider";
import type { Metadata } from "next";
import { AppSessionProvider } from "@/contexts/AppSessionContext";
import { AppApiInitializationProvider } from "@/contexts/AppApiInitialization";
import ThemeRegistry from "@/theme/common/theme-registry";
import AppTemplateHeader from "@/components/molecules/AppTemplateHeader";
import { defaultOpenGraph } from "@/constants/metadata";

export const metadata: Metadata = {
  title: {
    template: "%s | Carojon",
    default: "Carojon - Your place of convenience",
  },
  description:
    "Search any business, Get things done, stay focus on productive task",
  openGraph: {
    ...defaultOpenGraph,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <ThemeRegistry>
          <AppSessionProvider>
            <ApolloWrapper>
              <AppApiInitializationProvider>
                <div className='app-template-wrapper'>
                  <AppTemplateHeader />
                  <div>{children}</div>
                </div>
              </AppApiInitializationProvider>
            </ApolloWrapper>
          </AppSessionProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
