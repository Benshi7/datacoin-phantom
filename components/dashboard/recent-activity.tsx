const activities = [
  {
    id: 1,
    type: "Health Data Share",
    amount: 250,
    time: "2 minutes ago",
    status: "completed",
  },
  {
    id: 2,
    type: "Financial Data Update",
    amount: 180,
    time: "5 minutes ago",
    status: "completed",
  },
  {
    id: 3,
    type: "Social Data Share",
    amount: 320,
    time: "10 minutes ago",
    status: "completed",
  },
  {
    id: 4,
    type: "Location Data Share",
    amount: 150,
    time: "15 minutes ago",
    status: "completed",
  },
]

export function RecentActivity() {
  return (
    <div className="space-y-8">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-center">
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">{activity.type}</p>
            <p className="text-sm text-muted-foreground">{activity.time}</p>
          </div>
          <div className="ml-auto font-medium">+{activity.amount} DHT</div>
        </div>
      ))}
    </div>
  )
}

