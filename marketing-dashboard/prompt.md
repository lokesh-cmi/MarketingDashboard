# Project Prompts - Marketing Dashboard

This file contains all the prompts used to build this Marketing Dashboard project.

---

## Prompt 1: Initial Dashboard Creation
**Date**: January 11, 2026

```
I am creating a marketing dashboard, please check the ui given in the picture and update the code wrt ui i given. Create necessary files. Please ask for questions you have later
```

---

## Prompt 2: Git Operations
**Date**: January 11, 2026

```
Commit this changes with message "Landing page ui" and push to repo
```

---

## Prompt 3: Documentation
**Date**: January 11, 2026

```
Create a prompt.md file and add all the prompts I asked till now for this project
```

---

## Prompt 4: Google Analytics Integration
**Date**: January 11, 2026

```
I want to install @google-analytics/data to fetch google analytics data and i have google-analytics-account.json file and property_id required to get the data. Now I want to show fetch data onto GoogleAnalyticsOverview.tsx with these parameters: Sessions, Uses, Page Views and Engagement rates in the form of monthly chart for last 6 months
```

---

## Prompt 5: Environment Configuration
**Date**: January 11, 2026

```
Create a .env file and add propertyId 257748921 present in googleAnalytics.ts
```

---

## Prompt 6: Commit Google Analytics Integration
**Date**: January 11, 2026

```
Commit these changes with message "Google Analytics integrated"
```

---

## Prompt 7: Google Search Console Integration
**Date**: January 11, 2026

```
now i want to install googleapis and i have already added necessary information in env.local file. now i want you to fetch the data from google search console with parameters impressions, clicks, ctr and average position and show the data in the form of graph in @marketing-dashboard/components/SearchConsoleOverview.tsx
```

---

## Prompt 8: Search Console Timeframe Update
**Date**: January 11, 2026

```
For search console graph, keep it as last 6 months
```

---

## Prompt 9: Commit Search Console Integration
**Date**: January 11, 2026

```
commit these changes with "Integrated search control overview
```

---

## Prompt 10: Add View More Buttons
**Date**: January 11, 2026

```
In both google Analytics overview and search Console overview, keep a "View More" button next to headings which onClick route to specific pages
```

---

## Prompt 11: Update Google Analytics Overview Screen
**Date**: January 11, 2026

```
I want the google-analytics overview screen as per my uploaded image. Can u try this
```

---

## Prompt 12: Commit Analytics Overview Update
**Date**: January 11, 2026

```
commit these changes with "Updated GoogleAnalyticsOverview screen" message
```

---

## Prompt 13: Category-Based Overview Switching
**Date**: January 11, 2026

```
I want to add a feature where the current four tiles Google analytics Overview, search console Overview, hubspot overview, semrush overview visible when SEO is selected by default on landing. When clicked on paid campaigns, i want to show two tiles - linkedin ads overview and google ads overview. On click of social media it should show oktopost overview.
```

---

## Prompt 14: LinkedIn Ads Mock Data and Route
**Date**: January 11, 2026

```
Create a mock data for Linkedin Ads overview and provide a graph. Add view more button and on click open a route and provide data as of in the image
```

---

## Prompt 15: LinkedIn Ads Graph Style Update
**Date**: January 11, 2026

```
The graph in route looks different. I want data in the image form
```

---

## Prompt 16: Google Ads Overview and Route
**Date**: January 11, 2026

```
now for google ads overview, add some dummy graph which looks realistic google ads graph and the route should show as per the image
```

---

## Prompt 17: LinkedIn Ads Graph Realism
**Date**: January 11, 2026

```
In linkedin ads overview make the graph of mock data more realistic
```

---

## Prompt 18: Oktopost Overview for Social Media
**Date**: January 11, 2026

```
now for social media oktopost, as it is only one tool no need to add any route instead full data will be displayed in the dashboard itself. please add mock data and graph should be similar to the image.
```

---

## Prompt 19: Oktopost Name and Multi-Platform Data
**Date**: January 11, 2026

```
The name should be oktopost under social media, make the graph realistic with data from linkedin, instagram, facebook and twitter in 4 different tiles.
```

---

## Prompt 20: LinkedIn Ads Route Updates
**Date**: January 11, 2026

```
In linkedin ads route the graph seems to be unrealistic so change the mock data graph into realistic graph and remove the Add report and Save button from the top right corner
```

---

## Prompt 21: Commit Paid Campaigns and Social Media
**Date**: January 11, 2026

```
commit all the changes "paid campaigns and social media" updated and push the changes
```

---

## Prompt 22: SEMrush Mock Data Creation
**Date**: January 11, 2026

```
Create a mock data file containing info about the image provided. The 4 graphs provided under keywords section and the site health graph of site audit section should be displayed in the semrush overview tile which is in the dashboard.
```

---

## Prompt 23: SEMrush Overview Tile Size
**Date**: January 11, 2026

```
keep the semrush overview tile size same as the others and only include the graphs under keywords and site health as it is provided in the image dont include any additional graphs
```

---

## Prompt 24: SEMrush Tile Layout Update
**Date**: January 11, 2026

```
make the semrush tile size same as the google Analytics Overview and search console overview tiles and remove the graphs under keywords and only keep the text of that section and keep the site health graph as it is.
```

---

## Prompt 25: SEMrush View More Route
**Date**: January 11, 2026

```
Now create a view more button to semrush overview tile and take the mock data from @marketing-dashboard/lib/semrushData.ts add the graph and mock data in the route similar to this image.
```

---

## Prompt 26: SEMrush Keywords and Site Health Alignment
**Date**: January 11, 2026

```
can you adjust the key words section and site health section adjacent to each other in semrush overview
```

---

## Prompt 27: SEMrush Page Route Modification
**Date**: January 11, 2026

```
Modify the semrush page route to match the snapshot provided
Update the mock file created for semrush and adjust the UI there after
In the UI, do not include the header part that contains create seo project, share and stuff
```

---

## Prompt 28: SEMrush Top Section UI Correction
**Date**: January 11, 2026

```
The top section is not properly built
Please update it to have 2 sections - AI search & SEO as there in snapshot. The UI is also little ambigious. Please correct the top section UI
```

---

## Prompt 29: AI Visibility Graph Addition
**Date**: January 11, 2026

```
There is a small graph missing beside AI visibility's data Please add it
```

---

## Prompt 30: AI Tools Section Headings
**Date**: January 11, 2026

```
For the bottom section in AI search that has t gpt, ai overview etc, the top and bottom contents need a heading saying Mentions for the top row and Cited pages for second row data content
```

---

## Prompt 31: AI Tools Section Alignment
**Date**: January 11, 2026

```
Also in the same section, align the icon and the text adjacent to each other. Similarly adjust the mentions and cited pages adjacent to the values
```

---

## Prompt 32: SEO Section Bottom Row Alignment
**Date**: January 11, 2026

```
In the SEO section, the bottom row needs to be adjusted side to each other - the organic and paid keywords
```

---

## Prompt 33: SEO Section Row Inline
**Date**: January 11, 2026

```
The bottom row content should be inlined with top row content
```

---

## Prompt 34: Position Tracking Section Update
**Date**: January 11, 2026

```
In the position tracking section, the visibility data and graph along with keywords are not matching the snapshot uploaded befoire
PLease make changes to match the spec
```

---

## Prompt 35: Position Tracking Horizontal Alignment
**Date**: January 11, 2026

```
In the position tracking, the visibility, keywords and top keywords are to be aligned adjacent to each other in single line
```

---

## Prompt 36: Top Keywords Text Ellipsis
**Date**: January 11, 2026

```
In top keywords, ellipsise the word text and put the position in single line as it is shifting to necxt line
```

---

## Prompt 37: Commit SEMrush Changes
**Date**: January 11, 2026

```
commit changes "sem rush done"
```

---

## Prompt 38: HubSpot Overview Update
**Date**: January 11, 2026

```
In Hubspot overview make this graph visible as is. Along with the graph, also show the second snapshot pasted. Align them exactly as the other tabs like semrush, hubspot search console, google analytics.
```

---

## Prompt 39: HubSpot Graph Alignment
**Date**: January 11, 2026

```
Align the graph properly to the left, and reduce the font of total deals to the tab size of Google Analytics overview.
```

---

## Prompt 40: HubSpot Metrics Simplification
**Date**: January 11, 2026

```
Remove Active deals, Lost deals, Deals won. Just show (Count) Deals and (SUM) AMOUNT IN COMPANY CURRENCY
```

---

## Prompt 41: HubSpot Layout Reorder
**Date**: January 11, 2026

```
put the total deals on the top and then show the marketing contacts on the bottom. But match the font exactly with rest of the page with Total Deals. Make sure the font mathces with GoogleAnalyticsOverview Page please.
```

---

## Prompt 42: HubSpot Box Size Adjustment
**Date**: January 11, 2026

```
Reduce the graph size and please make sure the box size matches the GoogleAnalyticsOverview it is over the expected size. Align the graph to the left equally left to the legend "Marketing Source - Digital".
```

---

## Prompt 43: HubSpot Graph and Font Final Adjustment
**Date**: January 11, 2026

```
I still see the graph aligned in the middle. Can you push it to the left. And reduce the font size of COUNT DEALS and SUM AMOUNT IN COMPANY CURRENCY values to make the box look smaller than it is
```

---

## Prompt 44: SEMrush Overview Layout Change
**Date**: January 11, 2026

```
On SEMrushOverview make the SiteHealth Data come down and expand Keywords to occupy rest of the space when SiteHealth goes down to the bottom.
```

---

## Prompt 45: Site Health Graph Size Increase
**Date**: January 11, 2026

```
Increase the size of the site health graph 10%
```

---

## Prompt 46: HubSpot Detail Page Creation
**Date**: January 11, 2026

```
Create HubspotPage when clicked on ViewMore on HupsotOverview. Use the two screenshots pasted one after the other. Place the with 100% width one after the other
```

---

## Prompt 47: HubSpot Page Layout Reorder
**Date**: January 11, 2026

```
Revert the tabs upside down. Show Total Deals on the top and then Pipeline graphs data on the bottom
```

---

## Prompt 48: Commit HubSpot Changes
**Date**: January 11, 2026

```
Commit the changes with the message: Hubspot changes done
```

---

## Prompt 49: SEMrush Site Health Layout Update
**Date**: January 11, 2026

```
Beside Site Health show Errors and Warnings on SEMrush Overview tab. Align Errors and Warnings up and down but put SiteHealth to the left align to the middle
```

---

## Prompt 50: SEMrush Errors Warnings Size Reduction
**Date**: January 11, 2026

```
Remove crawledPages and reduce the Errors and Warnings graph sizes to minimum.
```

---

## Prompt 51: Oktopost Overview Box Removal
**Date**: January 11, 2026

```
Remove Oktopost Overview box in OktopostOverview page.
```

---

## Prompt 52: Commit Overview Pages Adjustments
**Date**: January 11, 2026

```
Commit with message: Overview Pages adjusted
```

---

## Prompt 53: Apply Header and Background Globally
**Date**: January 11, 2026

```
The header and background should be applied same for the dashboard and all the routes
```

---

## Prompt 54: Add Followers Tile to Social Media
**Date**: January 11, 2026

```
I will need to add followes tile in social media Overview page in all the four components - linkedin, instagram, facebook and twitter same as total Impressions, engagement, clicks etc and write a mock file for oktopost.
```

---

## Prompt 55: Google Ads Route Updates
**Date**: January 11, 2026

```
In paid campaigns - in google ads Overview route page the second graph name should be leads instead of clicks and change the axis values from 'acme dental, acme auto body, acme Marketing and acme law' to 'applied and gen ai, intelligent automation, cloud and data, digital products and platforms' respectively and also change the related info in the same page accordingly
```

---

## Prompt 56: Google Ads Leads Graph Updates
**Date**: January 11, 2026

```
In the paid campaigns - in google ads overview route page, in the leads graph last bar name should be completely 'digital products and platforms' try to adjust in 2 lines but complete name should be visible in the graph and one more requirement is there is a search functionality in the same page make it workable so that i can search from the below results.
```

---

## Prompt 57: LinkedIn Ads Route Heading and Graph Updates
**Date**: January 11, 2026

```
In the paid campaigns - in linkedin ads overview route page change the heading name from 'Linkedin: Organic vs Paid' to 'LinkedIn ads overview' and make the graphs in each tile more realistic based on the data above (increments and decrements of the values). And don't commit the changes and push them without asking permission.
```

---

## Prompt 58: Category Context Preservation
**Date**: January 11, 2026

```
We will need to fix one thing when we are exploring the categories under paid campaign for example and we click for the linkedin ads overview route page and we click back to the dashboard button we need to stay in the paid campaign page as it is the main dashboard page for categories linkedin ads and google ads categories same will apply for SEO page and social media. Dont commit and push any of the changes without asking my permission.
```

---

## Prompt 59: HubSpot Data Error Fix
**Date**: January 11, 2026

```
@node (926-940) getting error at hubspotData
```

---

## Prompt 60: SEMrush Top Keywords Enhancement
**Date**: January 11, 2026

```
In the SEO dashboard page - in the semRush Overview route page in the top keywords section in the positions column instead of showing the previous rank, show up arrow in green for rank increase and down arrow in red for rank decrease and also increase the mock data for keywords upto 100 and add a scroller only for that particular section to scroll the keywords and also remove the 'view full report' button from that page wherever displayed.
```

---

## Prompt 61: Keywords Display Limit
**Date**: January 11, 2026

```
The table is very large, display only 5 keywords at a time and let the other keywords be displayed with the help of scroller but display only 5 to be viewed
```

---

## Prompt 62: Mock Data Organization
**Date**: January 11, 2026

```
For hubspot, semrush, linkedin ads, google ads and ok to post uses mock data for visualization, hence keep this mock data in seperate files in a seperate folder. In above for any of the overviews if the mock data is not available then only add it.
```

---

## Prompt 63: Push Changes
**Date**: January 11, 2026

```
Please push the changes
```

---

## Prompt 64: Database Infrastructure Setup
**Date**: January 11, 2026

```
can you please make the necessary changes that you have mentioned now
create all the necessary infra needed as a free tier and install the necessary dependencies from npm
```

---

## Prompt 65: Use API Routes for Data
**Date**: January 11, 2026

```
Use API Routes to fetch data in components
```

---

## Prompt 66: Add Caching to Google Analytics and Search Console
**Date**: January 11, 2026

```
I see you missing the api routes for google analytics and google search console
```

---

## Prompt 67: Fix Cache Test Build Error
**Date**: January 11, 2026

```
I see a build error in cache-test page
```

---

## Prompt 68: Add Caching to Analytics Detailed
**Date**: January 11, 2026

```
In api/google-analytics-detailed
I presume the data should be coming from cache rather than you calling the api
where did you implement the logic of fetching the data from cache for each screen ?
```

---

## Prompt 69: Commit Cache and Database
**Date**: January 11, 2026

```
commit and push all changes "cache & db done"
```

---

## Prompt 70: Add Queries and Pages Tables
**Date**: January 11, 2026

```
In google search console screen
Can you add a table queires pages as in the snapshot Im attaching
```

---

## Prompt 71: Remove Search Console Graphs
**Date**: January 11, 2026

```
remove the graphs that are there in the same screen
```

---

## Prompt 72: Fix Search Console Page Error
**Date**: January 11, 2026

```
There is an error I can see in search-console page
```

---

## Prompt 73: Use API for Queries and Pages
**Date**: January 11, 2026

```
I presume you have taken the data from the snapshot provided
The data should be consumed from the cache or api for the queries and pages tables
```

---

## Prompt 74: Remove Second Header Dropdown
**Date**: January 11, 2026

```
can you remove the second dropdown present in the header
```

---

## Prompt 75: Update Dropdown Values
**Date**: January 11, 2026

```
Update the values in exisitng dropdiwn to last week, last month, last quarter, last 6 months, last year
```

---

## Prompt 76: Implement Date Filter Functionality
**Date**: January 11, 2026

```
Now when I select any one of the item in the dropdown, the whole data should be filtered on the selected item
```

---

## Prompt 77: Fix Date Filter Data Refresh
**Date**: January 11, 2026

```
Are you refreshing the data when you select the date filter
I see the data not getting refreshed
```

---

## Prompt 78: Fix Analytics and Search Console Detail Pages
**Date**: January 11, 2026

```
The same error with analytics page
Fix the issue in all screens
```

---

## Prompt 79: Fix 500 Error
**Date**: January 11, 2026

```
500 error
```

---

## Prompt 80: Push Date Filter Changes
**Date**: January 11, 2026

```
push changes "date filter"
```

---

## Prompt 81: Fix HubSpot Overview Empty Data
**Date**: January 11, 2026

```
HubSpot overview is not working somehow. neighter the mock data is showing
```

---

## Prompt 82: Remove Local Date Filters
**Date**: January 11, 2026

```
Great, now just keep the main filter near xmetrics and remove that filter from HubSpot and Semrush routes and LinkedIn Ads Overview route
```

---

## Prompt 83: Make Header Sticky
**Date**: January 11, 2026

```
Great. Now the header should stay at top and scroll shouldn't affect the header through out website
```

---

## Prompt 84: Keep Original Header Design
**Date**: January 11, 2026

```
Keep the design same. the ui looks awkward
```

---

## Prompt 85: Real-time Search Console Data
**Date**: January 11, 2026

```
in Google Search Console route, the data is not real time. Use Google API to fetch Queries and Pages data.
```

---

## Prompt 86: Commit and Push Real-time Changes
**Date**: January 11, 2026

```
Commit and push these changes
```

---

## Prompt 87: Mock Data Date Filtering
**Date**: January 12, 2026

```
Convert mock data in a way that date filters could be applied to it. I see that wherever there is mock data the filters are not applied and it is static. Start with Overview on the LandingPage, Hubspot Overview, it's route, SEMrushOverview and its route, Paid Campaigns pages and their routes, SocialMedia pages.
```

---

## Prompt 88: Fix Runtime Error
**Date**: January 12, 2026

```
I'm getting this error
(Runtime TypeError: Cannot read properties of null)
```

---

## Prompt 89: Push Mock Data Filtering Code
**Date**: January 12, 2026

```
Ok. Push the code
```

---



**Total Prompts**: 89
**Project Duration**: January 11-12, 2026
**Repository**: github.com:lokesh-cmi/MarketingDashboard.git
