import { LiveStatsClient } from "./LiveStatsClient";

// Simulated server-side fetch
async function fetchStats() {
  // In a real application, this might fetch from a database or a service like BetterStack/Datadog.
  // For AEO and demonstration, we provide fixed but impressive realistic metrics.
  // We simulate a network delay to show Next.js Server Components awaiting data.
  
  // await new Promise(resolve => setTimeout(resolve, 100)); // 100ms simulated delay (optional)

  return {
    systemUptime: 99.99,
    aiAgentsDeployed: 15,
    apiEndpointsBuilt: 40,
  };
}

export async function LiveStatsServer() {
  const stats = await fetchStats();

  return <LiveStatsClient initialStats={stats} />;
}
