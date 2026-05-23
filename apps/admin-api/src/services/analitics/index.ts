export class AnalyticsService {
    async getAnalytics(storeId: number) {
      try {
        const url = `${process.env.POSTHOG_API_URL}/api/projects/${process.env.POSTHOG_PROJECT_ID}/events`
  
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${process.env.POSTHOG_API_KEY}`,
            'Content-Type': 'application/json',
          },
        })
  
        if (!response.ok) {
          throw new Error(`PostHog error: ${response.status}`)
        }
  
        const data = await response.json()
  
        return data
      } catch (error) {
        console.error('Error fetching analytics:', error)
        return null
      }
    }
  }