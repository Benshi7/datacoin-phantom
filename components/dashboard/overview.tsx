"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan 1",
    total: 1200,
  },
  {
    name: "Jan 2",
    total: 2100,
  },
  {
    name: "Jan 3",
    total: 1800,
  },
  {
    name: "Jan 4",
    total: 2800,
  },
  {
    name: "Jan 5",
    total: 2300,
  },
  {
    name: "Jan 6",
    total: 3500,
  },
  {
    name: "Jan 7",
    total: 3000,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value} DHT`}
        />
        <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
      </BarChart>
    </ResponsiveContainer>
  )
}

