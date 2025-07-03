"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  File,
  FileText,
  Folder,
  Grid3X3,
  Home,
  ImageIcon,
  List,
  MoreVertical,
  Plus,
  Search,
  Settings,
  Star,
  Trash,
  Upload,
  Users,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Input } from "~/components/ui/input";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { mockData, type DriveItem } from "~/lib/mock-data";

// Mock data for files and folders

export default function DriveClone() {
  const [currentFolder, setCurrentFolder] = useState("root");
  const [viewMode, setViewMode] = useState("list");
  const [breadcrumbs, setBreadcrumbs] = useState([
    { id: "root", name: "My Drive" },
  ]);

  // Get file icon based on file type
  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case "pdf":
        return <FileText className="h-5 w-5 text-red-500" />;
      case "docx":
        return <FileText className="h-5 w-5 text-blue-500" />;
      case "txt":
        return <FileText className="h-5 w-5 text-gray-500" />;
      case "jpg":
      case "png":
        return <ImageIcon className="h-5 w-5 text-green-500" />;
      case "fig":
        return <File className="h-5 w-5 text-purple-500" />;
      case "sketch":
        return <File className="h-5 w-5 text-orange-500" />;
      default:
        return <File className="h-5 w-5 text-gray-500" />;
    }
  };

  // Handle folder navigation
  const navigateToFolder = (folderId: string, folderName: string) => {
    setCurrentFolder(folderId);

    // Update breadcrumbs
    const existingIndex = breadcrumbs.findIndex((b) => b.id === folderId);
    if (existingIndex !== -1) {
      setBreadcrumbs(breadcrumbs.slice(0, existingIndex + 1));
    } else {
      setBreadcrumbs([...breadcrumbs, { id: folderId, name: folderName }]);
    }
  };

  // Get current folder contents
  const getCurrentFolderContents = () => {
    if (currentFolder === "root") {
      return mockData.filter((item) => item.parent === null);
    }
    return mockData.filter((item) => item.parent === currentFolder);
  };

  const folderContents = getCurrentFolderContents();

  return (
    <div className="bg-background text-foreground dark flex h-screen flex-col">
      <header className="bg-background flex h-16 items-center border-b px-6">
        <div className="flex items-center gap-2 text-xl font-semibold text-blue-400">
          <Folder className="h-6 w-6" />
          <span>GDrive Clone</span>
        </div>
        <div className="ml-8 max-w-xl flex-1">
          <div className="relative">
            <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
            <Input
              type="search"
              placeholder="Search in Drive"
              className="bg-muted w-full pl-8 focus-visible:ring-blue-500"
            />
          </div>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <aside className="bg-muted/40 w-64 border-r">
          <div className="p-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full gap-2 bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4" />
                  New
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload files</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="rounded-lg border-2 border-dashed p-12 text-center">
                    <Upload className="text-muted-foreground mx-auto mb-4 h-8 w-8" />
                    <p className="mb-2 text-sm font-medium">
                      Drag and drop files here
                    </p>
                    <p className="text-muted-foreground mb-4 text-xs">or</p>
                    <Button size="sm">Browse files</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <nav className="grid gap-1 px-2">
            <Button
              variant={currentFolder === "root" ? "secondary" : "ghost"}
              className="justify-start gap-2"
              onClick={() => navigateToFolder("root", "My Drive")}
            >
              <Home className="h-4 w-4" />
              My Drive
            </Button>
            <Button variant="ghost" className="justify-start gap-2">
              <Users className="h-4 w-4" />
              Shared with me
            </Button>
            <Button variant="ghost" className="justify-start gap-2">
              <Star className="h-4 w-4" />
              Starred
            </Button>
            <Button variant="ghost" className="justify-start gap-2">
              <Trash className="h-4 w-4" />
              Trash
            </Button>
          </nav>
          <div className="mt-6 px-4">
            <div className="text-muted-foreground text-sm font-medium">
              Storage
            </div>
            <div className="bg-muted mt-2 h-2 rounded-full">
              <div className="h-full w-2/3 rounded-full bg-blue-600" />
            </div>
            <div className="text-muted-foreground mt-1 text-xs">
              6.5 GB of 15 GB used
            </div>
          </div>
        </aside>
        <main className="flex-1 overflow-hidden">
          <div className="flex h-12 items-center justify-between border-b px-6">
            <div className="flex items-center gap-2">
              {breadcrumbs.map((crumb, index) => (
                <div key={crumb.id} className="flex items-center">
                  {index > 0 && (
                    <ChevronRight className="text-muted-foreground mx-1 h-4 w-4" />
                  )}
                  <Button
                    variant="ghost"
                    className="h-8 text-sm"
                    onClick={() => navigateToFolder(crumb.id, crumb.name)}
                  >
                    {crumb.name}
                  </Button>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className={viewMode === "list" ? "bg-muted" : ""}
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={viewMode === "grid" ? "bg-muted" : ""}
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <ScrollArea className="h-[calc(100vh-7rem)]">
            <div className="p-6">
              <Tabs defaultValue="all">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="folders">Folders</TabsTrigger>
                  <TabsTrigger value="files">Files</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="mt-0">
                  {viewMode === "grid" ? (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                      {folderContents.map((item) => (
                        <div
                          key={item.id}
                          className="group hover:bg-muted/50 relative rounded-lg border p-3"
                        >
                          {item.type === "folder" ? (
                            <div
                              className="cursor-pointer"
                              onClick={() =>
                                navigateToFolder(item.id, item.name)
                              }
                            >
                              <Folder className="h-10 w-10 text-blue-500" />
                              <div className="mt-2 truncate font-medium">
                                {item.name}
                              </div>
                            </div>
                          ) : (
                            <Link href={`#file-${item.id}`} className="block">
                              {getFileIcon(item.type)}
                              <div className="mt-2 truncate font-medium">
                                {item.name}
                              </div>
                            </Link>
                          )}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100"
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Download</DropdownMenuItem>
                              <DropdownMenuItem>Rename</DropdownMenuItem>
                              <DropdownMenuItem>Move</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-500">
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-lg border">
                      <div className="text-muted-foreground grid grid-cols-12 gap-4 p-3 font-medium">
                        <div className="col-span-5">Name</div>
                        <div className="col-span-2">Type</div>
                        <div className="col-span-2">Size</div>
                        <div className="col-span-2">Modified</div>
                        <div className="col-span-1"></div>
                      </div>
                      {folderContents.map((item) => (
                        <div
                          key={item.id}
                          className="group hover:bg-muted/50 grid grid-cols-12 gap-4 border-t p-3"
                        >
                          <div className="col-span-5 flex items-center gap-3">
                            {item.type === "folder" ? (
                              <>
                                <Folder className="h-5 w-5 shrink-0 text-blue-500" />
                                <button
                                  className="truncate font-medium"
                                  onClick={() =>
                                    navigateToFolder(item.id, item.name)
                                  }
                                >
                                  {item.name}
                                </button>
                              </>
                            ) : (
                              <>
                                {getFileIcon(item.type)}
                                <Link
                                  href={`#file-${item.id}`}
                                  className="truncate font-medium"
                                >
                                  {item.name}
                                </Link>
                              </>
                            )}
                          </div>
                          <div className="text-muted-foreground col-span-2 flex items-center text-sm">
                            {item.type === "folder"
                              ? "Folder"
                              : item.type?.toUpperCase() || "File"}
                          </div>
                          <div className="text-muted-foreground col-span-2 flex items-center text-sm">
                            {item.size ??
                              (item.type === "folder" ? "—" : "0 KB")}
                          </div>
                          <div className="col-span-1 flex items-center justify-end">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 opacity-0 group-hover:opacity-100"
                                >
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                {item.type !== "folder" && (
                                  <DropdownMenuItem>Download</DropdownMenuItem>
                                )}
                                <DropdownMenuItem>Rename</DropdownMenuItem>
                                <DropdownMenuItem>Move</DropdownMenuItem>
                                <DropdownMenuItem className="text-red-500">
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="folders" className="mt-0">
                  {viewMode === "grid" ? (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                      {folderContents
                        .filter((item) => item.type === "folder")
                        .map((item) => (
                          <div
                            key={item.id}
                            className="group hover:bg-muted/50 relative rounded-lg border p-3"
                          >
                            <div
                              className="cursor-pointer"
                              onClick={() =>
                                navigateToFolder(item.id, item.name)
                              }
                            >
                              <Folder className="h-10 w-10 text-blue-500" />
                              <div className="mt-2 truncate font-medium">
                                {item.name}
                              </div>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100"
                                >
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Rename</DropdownMenuItem>
                                <DropdownMenuItem>Move</DropdownMenuItem>
                                <DropdownMenuItem className="text-red-500">
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="rounded-lg border">
                      <div className="text-muted-foreground grid grid-cols-12 gap-4 p-3 font-medium">
                        <div className="col-span-5">Name</div>
                        <div className="col-span-2">Type</div>
                        <div className="col-span-2">Size</div>
                        <div className="col-span-2">Modified</div>
                        <div className="col-span-1"></div>
                      </div>
                      {folderContents
                        .filter((item) => item.type === "folder")
                        .map((item) => (
                          <div
                            key={item.id}
                            className="group hover:bg-muted/50 grid grid-cols-12 gap-4 border-t p-3"
                          >
                            <div className="col-span-5 flex items-center gap-3">
                              <Folder className="h-5 w-5 shrink-0 text-blue-500" />
                              <button
                                className="truncate font-medium"
                                onClick={() =>
                                  navigateToFolder(item.id, item.name)
                                }
                              >
                                {item.name}
                              </button>
                            </div>
                            <div className="text-muted-foreground col-span-2 flex items-center text-sm">
                              Folder
                            </div>
                            <div className="text-muted-foreground col-span-2 flex items-center text-sm">
                              —
                            </div>
                            <div className="col-span-1 flex items-center justify-end">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 opacity-0 group-hover:opacity-100"
                                  >
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>Rename</DropdownMenuItem>
                                  <DropdownMenuItem>Move</DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-500">
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="files" className="mt-0">
                  {viewMode === "grid" ? (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                      {folderContents
                        .filter((item) => item.type === "file")
                        .map((item) => (
                          <div
                            key={item.id}
                            className="group hover:bg-muted/50 relative rounded-lg border p-3"
                          >
                            <Link href={`#file-${item.id}`} className="block">
                              {getFileIcon(item.type)}
                              <div className="mt-2 truncate font-medium">
                                {item.name}
                              </div>
                            </Link>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100"
                                >
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Download</DropdownMenuItem>
                                <DropdownMenuItem>Rename</DropdownMenuItem>
                                <DropdownMenuItem>Move</DropdownMenuItem>
                                <DropdownMenuItem className="text-red-500">
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="rounded-lg border">
                      <div className="text-muted-foreground grid grid-cols-12 gap-4 p-3 font-medium">
                        <div className="col-span-5">Name</div>
                        <div className="col-span-2">Type</div>
                        <div className="col-span-2">Size</div>
                        <div className="col-span-2">Modified</div>
                        <div className="col-span-1"></div>
                      </div>
                      {folderContents
                        .filter((item: DriveItem) => item.type === "file")
                        .map((item: DriveItem) => (
                          <div
                            key={item.id}
                            className="group hover:bg-muted/50 grid grid-cols-12 gap-4 border-t p-3"
                          >
                            <div className="col-span-5 flex items-center gap-3">
                              {getFileIcon(item.type)}
                              <Link
                                href={`#file-${item.id}`}
                                className="truncate font-medium"
                              >
                                {item.name}
                              </Link>
                            </div>
                            <div className="text-muted-foreground col-span-2 flex items-center text-sm">
                              {item.type?.toUpperCase() ?? "File"}
                            </div>
                            <div className="text-muted-foreground col-span-2 flex items-center text-sm">
                              {item.size ?? "0 KB"}
                            </div>
                            <div className="col-span-1 flex items-center justify-end">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 opacity-0 group-hover:opacity-100"
                                  >
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>Download</DropdownMenuItem>
                                  <DropdownMenuItem>Rename</DropdownMenuItem>
                                  <DropdownMenuItem>Move</DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-500">
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </ScrollArea>
        </main>
      </div>
    </div>
  );
}
