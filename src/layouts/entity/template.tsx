/**
 * This is an example of how to create a template that makes use of streams data.
 * The stream data originates from Yext's Knowledge Graph. When a template in
 * concert with a stream is built by the Yext Sites system, a static html page
 * is generated for every corresponding (based on the filter) stream document.
 *
 * Another way to think about it is that a page will be generated using this
 * template for every eligible entity in your Knowledge Graph.
 */
import ErrorBoundaryWithAnalytics from "src/components/common/ErrorBoundaryWithAnalytics";
import { LazyLoadWrapper } from "src/components/common/LazyLoadWrapper";
import type { LocationProfile, TemplateRenderProps } from "src/types/entities";

import Breadcrumbs from "src/components/common/Breadcrumbs";
import Banner from "src/components/entity/Banner";
import Core from "src/components/entity/Core";
import Events from "src/components/entity/Events";
// import FAQs from "src/components/entity/FAQs";
// import Gallery from "src/components/entity/Gallery";
import Hero from "src/components/entity/Hero";
// import Insights from "src/components/entity/Insights";
import Nearby from "src/components/entity/Nearby";
// import Products from "src/components/entity/Products";
// import Promo from "src/components/entity/Promo";
// import Reviews from "src/components/entity/Reviews";
// import Team from "src/components/entity/Team";

import type { Template } from "@yext/pages";
import { Main } from "src/layouts/main";
import "src/index.css";

interface EntityLayoutProps {
  data: TemplateRenderProps<LocationProfile>;
}

const EntityLayout = ({ data }: EntityLayoutProps) => {
  const {
    id,
    yextDisplayCoordinate,
    name,
    address,
    description,
    hours,
    photoGallery,
    c_nearbySection: nearby,
    c_eventsSection: events,
    dm_directoryParents_defaultdirectory: directoryParents,
  } = data.document;

  const showEvents = events?.title && events.events;

  return (
    <>
      <ErrorBoundaryWithAnalytics name="breadcrumbs">
        <Breadcrumbs
          breadcrumbs={directoryParents || []}
          separator="/"
          className="container"
        />
      </ErrorBoundaryWithAnalytics>
      <ErrorBoundaryWithAnalytics name="hero">
        <Hero
          name={name}
          address={address}
          hours={hours}
        />
      </ErrorBoundaryWithAnalytics>
      <ErrorBoundaryWithAnalytics name="core">
        <Core profile={data.document} />
      </ErrorBoundaryWithAnalytics>
      {showEvents && (
        <ErrorBoundaryWithAnalytics name="events">
          <Events title={events.title} items={events.events} />
        </ErrorBoundaryWithAnalytics>
      )}
      <LazyLoadWrapper>
        <ErrorBoundaryWithAnalytics name="nearby">
          <Nearby
            title={nearby?.title}
            linkToLocator={nearby?.linkToLocator}
            buttonText={nearby?.cta?.label}
            buttonLink={nearby?.cta?.link}
            coordinate={yextDisplayCoordinate}
            id={id}
          />
        </ErrorBoundaryWithAnalytics>
      </LazyLoadWrapper>
    </>
  );
};

/**
 * This is the main template. It can have any name as long as it's the default export.
 * The props passed in here are the direct stream document defined by `config`.
 *
 * There are a bunch of custom components being used from the src/components folder. These are
 * an example of how you could create your own. You can set up your folder structure for custom
 * components any way you'd like as long as it lives in the src folder (though you should not put
 * them in the src/templates folder as this is specific for true template files).
 */
const Entity: Template<TemplateRenderProps<LocationProfile>> = (data) => {
  return (
    <Main data={data}>
      <EntityLayout data={data} />
    </Main>
  );
};

export default Entity;
