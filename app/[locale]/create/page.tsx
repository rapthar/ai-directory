import AgencyForm from "@/components/agency-form";
import { getSEOTags } from "@/lib/seo";
import config from "@/config";

export const metadata = getSEOTags({
  title: `List your Agency | ${config.appName}`,
  canonicalUrlRelative: "/create",
});

const CreatePage = () => {
  return (
    <div className="min-h-screen bg-[#0B1829] text-white">
      <div className="max-w-[1400px] mx-auto px-6 py-24 sm:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <AgencyForm />
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
