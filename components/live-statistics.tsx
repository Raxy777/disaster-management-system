"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, AlertTriangle, Home, Users } from "lucide-react";
import { useEffect, useState } from "react";

// Mock data for statistics
const thresholdPeople = 318;
const initialStats = [
	{
		title: "Active Disasters",
		value: 12,
		icon: AlertTriangle,
		color: "text-red-500",
		bgColor: "bg-red-50",
		change: "+2 today",
	},
	{
		title: "People Affected",
		value: 24186,
		icon: Users,
		color: "text-[#0077B6]",
		bgColor: "bg-blue-50",
		change: "+318 today",
	},
	{
		title: "Shelters Active",
		value: 48,
		icon: Home,
		color: "text-green-500",
		bgColor: "bg-green-50",
		change: "+5 today",
	},
	{
		title: "Response Teams",
		value: 86,
		icon: Activity,
		color: "text-[#FF9933]",
		bgColor: "bg-orange-50",
		change: "+12 today",
	},
]

const statThresholds: Record<string, number> = {
	"People Affected":3,
}

export function LiveStatistics() {
	const [stats, setStats] = useState(initialStats)
	const [prevStats, setPrevStats] = useState(initialStats)

	// Simulate live updates
	useEffect(() => {
		const interval = setInterval(() => {
			setStats((prevStatsState) => {
				const updatedStats = prevStatsState.map((stat, idx) => {
					let newValue = stat.value
					let changeStr = stat.change
					if (stat.title === "People Affected") {
						const threshold = statThresholds[stat.title] || 1
						const randomChange = Math.floor(Math.random() * 10) + threshold
						newValue = stat.value + randomChange
						const diff = newValue - prevStats[idx].value
						changeStr = diff === 0 ? "No change" : `${diff > 0 ? "+" : ""}${diff + thresholdPeople} today`
					}
					return {
						...stat,
						value: newValue,
						change: changeStr,
					}
				})
				setPrevStats(prevStatsState)
				return updatedStats
			})
		}, 8000)
		return () => clearInterval(interval)
	}, [prevStats])

	return (
		<section className="bg-gray-50 py-12">
			<div className="container">
				<h2 className="mb-8 text-center text-2xl font-bold tracking-tight md:text-3xl">Live Statistics</h2>
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{stats.map((stat) => (
						<Card key={stat.title} className="overflow-hidden">
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
								<div className={`rounded-full p-2 ${stat.bgColor}`}>
									<stat.icon className={`h-4 w-4 ${stat.color}`} />
								</div>
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">
									{stat.title === "People Affected" ? stat.value.toLocaleString() : stat.value}
								</div>
								<p className="text-xs text-muted-foreground">{stat.change}</p>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	)
}
