import { validateRequest } from "~/actions/auth";
import { getProjectById } from "../action";
import { getdapps } from "./action";
import TabSections from "./tab-sections";
import CreateDappModal from "./create-dapp-modal";
import { Card } from "~/components/ui/card";

export default async function ProjectPage({
  params,
}: {
  params: { projectId: string };
}) {
  const { user } = await validateRequest();
  const project = await getProjectById(params.projectId);
  const dapps = await getdapps(params.projectId);

  if (!project) {
    return (
      <div className="container">
        <h1 className="text-2xl font-bold">Project not found</h1>
      </div>
    );
  }

  return (
    <div className="container space-y-8">
      <div>
        <h1 className="text-3xl font-bold">{project.name}</h1>
        <p className="text-muted-foreground">{project.domain}</p>
      </div>
      
      <div className="grid gap-4">
        <CreateDappModal projectId={params.projectId} />
        <TabSections project={project} dapps={dapps} />
      </div>
    </div>
  );
}
