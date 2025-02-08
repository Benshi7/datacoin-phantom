"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, FileText, Filter } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const reports = [
  {
    id: 1,
    name: "Monthly Data Sharing Report",
    description: "Detailed breakdown of all shared data",
    date: "Mar 1, 2024",
    size: "2.4 MB",
  },
  {
    id: 2,
    name: "Earnings Statement",
    description: "Financial report of DHT earnings",
    date: "Mar 1, 2024",
    size: "1.8 MB",
  },
  {
    id: 3,
    name: "Data Usage Analytics",
    description: "How your data is being utilized",
    date: "Feb 28, 2024",
    size: "3.2 MB",
  },
  {
    id: 4,
    name: "Privacy Audit Report",
    description: "Security and privacy assessment",
    date: "Feb 27, 2024",
    size: "1.1 MB",
  },
]

export function Reports() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Available Reports</CardTitle>
              <CardDescription>Download or view your data reports</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <FileText className="mr-2 h-4 w-4" />
                Generate Report
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Size</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{report.name}</TableCell>
                  <TableCell>{report.description}</TableCell>
                  <TableCell>{report.date}</TableCell>
                  <TableCell>{report.size}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Download</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

