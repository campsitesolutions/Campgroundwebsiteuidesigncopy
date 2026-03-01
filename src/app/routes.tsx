import { createBrowserRouter, redirect } from "react-router";
import { RootLayout } from "./layouts/RootLayout";
import { TemplateGallery } from "./pages/TemplateGallery";
import { TemplateSeasonal } from "./pages/TemplateSeasonal";
import { TemplateOvernight } from "./pages/TemplateOvernight";
import { TemplateTrailers } from "./pages/TemplateTrailers";
import { SectionLibrary } from "./pages/SectionLibrary";
import { MyLayout } from "./pages/MyLayout";
import { LeadCapture } from "./pages/LeadCapture";
import { ComponentReviewBoard } from "./pages/ComponentReviewBoard";
import { SectionPreview } from "./pages/SectionPreview";
import { IntakeWizard } from "./components/IntakeWizard";
import { LayoutPreview } from "./pages/LayoutPreview";
import { StrategySummary } from "./pages/StrategySummary";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <TemplateGallery />,
      },
      {
        path: "t/seasonal",
        element: <TemplateSeasonal />,
      },
      {
        path: "t/overnight",
        element: <TemplateOvernight />,
      },
      {
        path: "t/trailers",
        element: <TemplateTrailers />,
      },
      {
        path: "library",
        element: <SectionLibrary />,
      },
      {
        path: "section-library",
        loader: () => redirect("/library"),
      },
      {
        path: "strategy-summary",
        element: <StrategySummary />,
      },
      {
        path: "my-layout",
        element: <MyLayout />,
      },
      {
        path: "lead",
        element: <LeadCapture />,
      },
      {
        path: "review",
        element: <ComponentReviewBoard />,
      },
      {
        path: "preview/:sectionId",
        element: <SectionPreview />,
      },
      {
        path: "layout-preview/:id",
        element: <LayoutPreview />,
      },
    ],
  },
  {
    path: "/wizard",
    element: <IntakeWizard />,
  },
]);