import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Download,
  FileText,
  FileCog,
  FileSpreadsheet,
  Printer,
  Share2,
} from "lucide-react";

interface ExportPanelProps {
  onExport?: (format: string, options: ExportOptions) => void;
  availableData?: string[];
  isExporting?: boolean;
}

interface ExportOptions {
  dataType: string;
  format: string;
  includeHeaders: boolean;
  dateRange?: {
    from: Date | null;
    to: Date | null;
  };
}

const ExportPanel = ({
  onExport = () => {},
  availableData = ["attendance", "grades", "schedule"],
  isExporting = false,
}: ExportPanelProps) => {
  const [selectedFormat, setSelectedFormat] = useState<string>("csv");
  const [selectedData, setSelectedData] = useState<string>(availableData[0]);
  const [includeHeaders, setIncludeHeaders] = useState<boolean>(true);
  const [showOptions, setShowOptions] = useState<boolean>(false);

  const handleExport = () => {
    onExport(selectedFormat, {
      dataType: selectedData,
      format: selectedFormat,
      includeHeaders,
      dateRange: {
        from: null,
        to: null,
      },
    });
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="h-5 w-5 text-primary" />
          Export Data
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="quick" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="quick">Quick Export</TabsTrigger>
            <TabsTrigger value="advanced">Advanced Options</TabsTrigger>
          </TabsList>

          <TabsContent value="quick" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Data Type
                </label>
                <Select value={selectedData} onValueChange={setSelectedData}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select data to export" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableData.map((data) => (
                      <SelectItem key={data} value={data}>
                        {data.charAt(0).toUpperCase() + data.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Format</label>
                <Select
                  value={selectedFormat}
                  onValueChange={setSelectedFormat}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select export format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="csv">
                      <div className="flex items-center gap-2">
                        <FileSpreadsheet className="h-4 w-4" />
                        CSV
                      </div>
                    </SelectItem>
                    <SelectItem value="pdf">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        PDF
                      </div>
                    </SelectItem>
                    <SelectItem value="excel">
                      <div className="flex items-center gap-2">
                        <FileSpreadsheet className="h-4 w-4" />
                        Excel
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-2 justify-end">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <FileCog className="h-4 w-4" />
                    Preview
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Export Preview</DialogTitle>
                    <DialogDescription>
                      Preview of your {selectedData} data in {selectedFormat}{" "}
                      format.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="border rounded-md p-4 h-64 overflow-auto bg-gray-50">
                    <div className="text-sm font-mono">
                      {selectedFormat === "csv" ? (
                        <pre>
                          {`date,course,attendance,status
2023-06-01,CSE101,Present,On-time
2023-06-02,MAT201,Present,On-time
2023-06-03,PHY102,Absent,N/A
2023-06-04,CSE101,Present,Late
...`}
                        </pre>
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <p className="text-gray-500">
                            Preview not available for {selectedFormat} format
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => {}}>
                      Close
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Button
                onClick={handleExport}
                disabled={isExporting}
                className="flex items-center gap-2"
              >
                {isExporting ? (
                  <>
                    <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Exporting...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    Export Now
                  </>
                )}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Data Type
                </label>
                <Select value={selectedData} onValueChange={setSelectedData}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select data to export" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableData.map((data) => (
                      <SelectItem key={data} value={data}>
                        {data.charAt(0).toUpperCase() + data.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Format</label>
                <Select
                  value={selectedFormat}
                  onValueChange={setSelectedFormat}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select export format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="csv">CSV</SelectItem>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="excel">Excel</SelectItem>
                    <SelectItem value="json">JSON</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Options</label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="includeHeaders"
                    checked={includeHeaders}
                    onChange={(e) => setIncludeHeaders(e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <label htmlFor="includeHeaders" className="text-sm">
                    Include column headers
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="showOptions"
                    checked={showOptions}
                    onChange={(e) => setShowOptions(e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <label htmlFor="showOptions" className="text-sm">
                    Show additional options
                  </label>
                </div>
              </div>
            </div>

            {showOptions && (
              <div className="space-y-4 border-t pt-4">
                <h3 className="text-sm font-medium">Additional Options</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Paper Size
                    </label>
                    <Select defaultValue="a4">
                      <SelectTrigger>
                        <SelectValue placeholder="Select paper size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="a4">A4</SelectItem>
                        <SelectItem value="letter">Letter</SelectItem>
                        <SelectItem value="legal">Legal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Orientation
                    </label>
                    <Select defaultValue="portrait">
                      <SelectTrigger>
                        <SelectValue placeholder="Select orientation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="portrait">Portrait</SelectItem>
                        <SelectItem value="landscape">Landscape</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            <div className="pt-4 flex flex-wrap gap-2 justify-end">
              <Button variant="outline" className="flex items-center gap-2">
                <Printer className="h-4 w-4" />
                Print
              </Button>

              <Button variant="outline" className="flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>

              <Button
                onClick={handleExport}
                disabled={isExporting}
                className="flex items-center gap-2"
              >
                {isExporting ? (
                  <>
                    <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Exporting...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    Export
                  </>
                )}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ExportPanel;
