import { type dApp, type Project } from "@prisma/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import DeleteCard from "./delete-card";
import EditableDetails from "./editable-details";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { formatDate } from "~/lib/utils";

export default function TabSections({
  dapp,
  project,
}: {
  dapp: dApp;
  project: Project;
}) {
  return (
    <Tabs defaultValue="details">
      <TabsList>
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="components">Components</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>

      <TabsContent value="details">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>DApp Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium">Name</h3>
                <p className="text-sm text-muted-foreground">{dapp.name}</p>
              </div>
              <div>
                <h3 className="font-medium">Description</h3>
                <p className="text-sm text-muted-foreground">{dapp.description}</p>
              </div>
              <div>
                <h3 className="font-medium">Project</h3>
                <p className="text-sm text-muted-foreground">{project.name}</p>
              </div>
              <div>
                <h3 className="font-medium">Created</h3>
                <p className="text-sm text-muted-foreground">
                  {formatDate(dapp.createdAt)}
                </p>
              </div>
              <div>
                <h3 className="font-medium">Last Updated</h3>
                <p className="text-sm text-muted-foreground">
                  {formatDate(dapp.updatedAt)}
                </p>
              </div>
            </CardContent>
          </Card>
          <EditableDetails dapp={dapp} project={project} />
        </div>
      </TabsContent>

      <TabsContent value="components">
        <Card>
          <CardHeader>
            <CardTitle>Components</CardTitle>
          </CardHeader>
          <CardContent>
            {dapp.components && dapp.components.length > 0 ? (
              <div className="grid gap-4">
                {dapp.components.map((component) => (
                  <Card key={component.id}>
                    <CardHeader>
                      <CardTitle>{component.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Type: {component.type}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No components added yet.
              </p>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="settings">
        <DeleteCard dapp={dapp} project={project} />
      </TabsContent>
    </Tabs>
  );
}
