import { NextStudio } from "next-sanity/studio";

import config from "../../../sanity.config";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return (
    <div className="studio">
      <NextStudio config={config} />
    </div>
  );
}
