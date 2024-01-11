import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import React from "react";
import {
  ErrorBoundary,
  Facet,
  SearchProvider,
  SearchBox,
  Results,
  PagingInfo,
  ResultsPerPage,
  Paging,
  WithSearch
} from "@elastic/react-search-ui";
import {
  BooleanFacet,
  Layout,
  SingleLinksFacet,
  SingleSelectFacet
} from "@elastic/react-search-ui-views";
import "@elastic/react-search-ui-views/lib/styles/styles.css";
import { SearchDriverOptions } from "@elastic/search-ui";
const connector = new AppSearchAPIConnector({
  searchKey: "search-2yh86bdddi8vjfyebzunaw2m",
  engineName: "reviews-search-engine",
  endpointBase: "https://4ad4dcbde3bd492cac5f082b2fece819.ent-search.us-central1.gcp.cloud.es.io"

});
const config: SearchDriverOptions = {
  alwaysSearchOnInitialLoad: true,
  apiConnector: connector,
  hasA11yNotifications: true,
  searchQuery: {
    result_fields: {
      review_id: {
        snippet: {
          fallback: true
        }
      },
      business_id: {
        snippet: {
          fallback: true
        }
      },
      user_id: {
        snippet: {
          fallback: true
        }
      },
      stars: { raw: {} },
      text: { raw: {} },
      feedback: { raw: {} }
    },
    search_fields: {
      review_id: {},
      business_id: { weight: 5 },
      user_id: {}
    },
    disjunctiveFacets: [""],
    facets: {
      feedback: { type: "value" },
      stars: { type: "value" },
      business_id: { type: "value", size: 100 },
      user_id: { type: "value", size: 100 }
    }
  }
};
export default function App() {
  return (
    <SearchProvider config={config}>
      <WithSearch
        mapContextToProps={({ wasSearched }) => ({
          wasSearched
        })}
      >
        {({ wasSearched }) => {
          return (
            <div className="App">
              <ErrorBoundary>
                <Layout
                  header={<SearchBox debounceLength={0} />}
                  sideContent={<div>
                    <Facet field="feedback" label="Feedback" filterType="any" isFilterable={true} />
                    <Facet field="stars" label="Rating" filterType="any" isFilterable={true} />
                    <Facet field="business_id" label="Business" filterType="any" isFilterable={true} />
                    <Facet field="user_id" label="User" filterType="any" isFilterable={true} />
                  </div>}
                  bodyContent={
                    <Results
                      titleField="review_id"
                      shouldTrackClickThrough
                    />
                  }
                  bodyHeader={
                    <React.Fragment>
                      {wasSearched && <PagingInfo />}
                      {wasSearched && <ResultsPerPage />}
                    </React.Fragment>
                  }
                  bodyFooter={<Paging />}
                />
              </ErrorBoundary>
            </div>
          );
        }}
      </WithSearch>
    </SearchProvider>
  );
}