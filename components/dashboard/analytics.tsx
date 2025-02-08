"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts"

const lineData = [
  { name: "Jan", health: 4000, financial: 2400, social: 2400 },
  { name: "Feb", health: 3000, financial: 1398, social: 2210 },
  { name: "Mar", health: 2000, financial: 9800, social: 2290 },
  { name: "Apr", health: 2780, financial: 3908, social: 2000 },
  { name: "May", health: 1890, financial: 4800, social: 2181 },
  { name: "Jun", health: 2390, financial: 3800, social: 2500 },
]

const pieData = [
  { name: "Health Data", value: 400 },
  { name: "Financial Data", value: 300 },
  { name: "Social Data", value: 300 },
  { name: "Location Data", value: 200 },
]

const COLORS = ["#6366f1", "#ec4899", "#22c55e", "#eab308"]

export function Analytics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Data Contribution Trends</CardTitle>
          <CardDescription>Compare your data sharing across different categories</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={lineData}>
              <XAxis dataKey="name" stroke="#888888" />
              <YAxis stroke="#888888" />
              <Tooltip />
              <Line type="monotone" dataKey="health" stroke="#6366f1" strokeWidth={2} />
              <Line type="monotone" dataKey="financial" stroke="#ec4899" strokeWidth={2} />
              <Line type="monotone" dataKey="social" stroke="#22c55e" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Data Distribution</CardTitle>
          <CardDescription>Current allocation of your shared data</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {pieData.map((entry, index) => (
              <div key={entry.name} className="flex items-center">
                <div className="h-3 w-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                <span className="text-sm">{entry.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-7">
        <CardHeader>
          <CardTitle>Earnings Analysis</CardTitle>
          <CardDescription>Your earning patterns over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={lineData}>
              <XAxis dataKey="name" stroke="#888888" />
              <YAxis stroke="#888888" />
              <Tooltip />
              <Area type="monotone" dataKey="health" stackId="1" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} />
              <Area type="monotone" dataKey="financial" stackId="1" stroke="#ec4899" fill="#ec4899" fillOpacity={0.2} />
              <Area type="monotone" dataKey="social" stackId="1" stroke="#22c55e" fill="#22c55e" fillOpacity={0.2} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

