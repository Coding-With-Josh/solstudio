import { type Project, type dApp } from "@prisma/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import DeleteCard from "./delete-card";
import EditableDetails from "./editable-details";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import Link from "next/link";
import { formatDate } from "~/lib/utils";

export default function TabSections({
  project,
  dapps,
}: {
  project: Project;
  dapps: dApp[];
}) {
  return (
    <Tabs defaultValue="details">
      <TabsList>
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="dapps">DApps</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      
      <TabsContent value="details">
        <EditableDetails initialValues={project} />
      </TabsContent>

      <TabsContent value="dapps">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">DApps</h2>
          {dapps && dapps.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {dapps.map((dapp) => (
                <Link
                  key={dapp.id}
                  href={`/dashboard/projects/${project.id}/${dapp.id}`}
                >
                  <Card className="hover:bg-accent transition-colors">
                    <CardHeader>
                      <CardTitle>{dapp.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{dapp.description}</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Last updated: {formatDate(dapp.updatedAt.toLocaleDateString())}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No DApps created yet.</p>
          )}
        </div>
      </TabsContent>

      <TabsContent value="settings">
        <DeleteCard id={project.id} />
      </TabsContent>
    </Tabs>
  );
}
