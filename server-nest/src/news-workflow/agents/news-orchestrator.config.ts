/**
 * Letta agent configuration for the NewsWorkflowOrchestrator
 */
export const NEWS_ORCHESTRATOR_CONFIG = {
  name: "NewsWorkflowOrchestrator",
  description:
    "Agent that searches news articles, extracts locations, and generates summaries",
  model: "openai/gpt-4o-mini",
  embedding: "openai/text-embedding-3-small",
  system: `You are a news research orchestrator. Your job is to:
1. Search for news articles using web_search with the user's query + region + date range
2. For each article, extract any location mentions (addresses, cross streets, businesses, parks, landmarks)
3. Return results in the specified JSON format

When extracting locations, look for:
- Street addresses ("123 Main St")
- Intersections ("corner of 5th and Broadway")
- Business names with location context ("at the Starbucks on Powell St")
- Parks and landmarks ("in Golden Gate Park", "near City Hall")
- Neighborhoods ("in the Mission District")

For each location, classify it as one of:
- ADDRESS: Full street address
- CROSS_STREET: Intersection of two streets
- BUSINESS: Named business/establishment
- PARK: Park or recreational area
- LANDMARK: Notable landmark or building
- CITY: City/neighborhood reference
- OTHER: Other location type

When returning results, use this JSON format for each article:
{
  "url": "article url",
  "title": "article title",
  "source": "publication name",
  "publishedAt": "ISO date string",
  "content": "full article text",
  "summary": "2-3 sentence summary of key points",
  "keyPoints": ["point 1", "point 2", "point 3"],
  "sentiment": "positive|negative|neutral",
  "locations": [
    {
      "mention": "original text from article",
      "mentionType": "ADDRESS|CROSS_STREET|BUSINESS|PARK|LANDMARK|CITY|OTHER",
      "context": "surrounding sentence for context"
    }
  ]
}`,
  memoryBlocks: [
    {
      label: "persona",
      value:
        "I am a news research agent that finds and processes news articles to extract locations and generate summaries.",
    },
    {
      label: "workflow_state",
      value: "", // Updated during processing with current workflow context
    },
  ],
  tools: ["web_search"],
};

/**
 * Python source code for the geocode_location custom tool
 * This tool is registered with Letta and called by the agent
 */
export const GEOCODE_TOOL_SOURCE = `
def geocode_location(location: str, region_context: str) -> dict:
    """
    Geocode a location string to lat/lng coordinates using Nominatim.

    Args:
        location: The location to geocode (e.g., "123 Main St" or "corner of 5th and Broadway")
        region_context: The city/region for context (e.g., "San Francisco, CA, USA")

    Returns:
        dict with lat, lng, formatted_address, confidence, or error message
    """
    import requests
    import time

    # Combine location with region for better accuracy
    query = f"{location}, {region_context}"

    url = "https://nominatim.openstreetmap.org/search"
    params = {
        "q": query,
        "format": "jsonv2",
        "limit": 1,
        "addressdetails": 1
    }
    headers = {"User-Agent": "MapSearcher/1.0"}

    try:
        response = requests.get(url, params=params, headers=headers, timeout=10)
        results = response.json()

        if results:
            result = results[0]
            return {
                "success": True,
                "lat": float(result["lat"]),
                "lng": float(result["lon"]),
                "formatted_address": result.get("display_name", ""),
                "confidence": float(result.get("importance", 0.5))
            }
        else:
            return {"success": False, "error": "No results found"}
    except Exception as e:
        return {"success": False, "error": str(e)}
`;

/**
 * Python source code for the save_article_results custom tool
 * This tool saves processed articles back to the database via API callback
 */
export const SAVE_RESULTS_TOOL_SOURCE = `
def save_article_results(workflow_id: str, articles: list) -> dict:
    """
    Save processed articles to the database via API callback.

    Args:
        workflow_id: The workflow UUID
        articles: List of processed article objects with locations and summaries

    Returns:
        dict with success status and count of saved articles
    """
    import requests
    import os

    api_url = os.environ.get("CALLBACK_API_URL", "http://localhost:3000")
    api_key = os.environ.get("CALLBACK_API_KEY", "")

    try:
        response = requests.post(
            f"{api_url}/api/news-workflow/{workflow_id}/results",
            json={"articles": articles},
            headers={"Authorization": f"Bearer {api_key}"},
            timeout=30
        )

        if response.ok:
            return {"success": True, "saved_count": len(articles)}
        else:
            return {"success": False, "error": f"API returned {response.status_code}"}
    except Exception as e:
        return {"success": False, "error": str(e)}
`;
