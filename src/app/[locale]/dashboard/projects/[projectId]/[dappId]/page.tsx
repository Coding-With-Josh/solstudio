import { validateRequest } from "~/actions/auth";
import { getProjectById } from "../../action";
import { getdappById } from "../action";
import TabSections from "./tab-sections";
import { notFound } from "next/navigation";

export default async function DAppPage({
  params,
}: {
  params: { projectId: string; dappId: string };
}) {
  const { user } = await validateRequest();
  const dapp = await getdappById(params.dappId, params.projectId);
  const project = await getProjectById(params.projectId);

  if (!dapp || !project) {
    notFound();
  }

  return (
    <div className="container space-y-8">
      <div>
        <h1 className="text-3xl font-bold">{dapp.name}</h1>
        <p className="text-muted-foreground">{dapp.description}</p>
      </div>
      <TabSections dapp={dapp} project={project} />
    </div>
  );
}
