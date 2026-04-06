"use client";
import { useState } from "react";

const TARGETS = [
  { rank: 1, name: "Amazon", pool: "Fortune 500", sector: "Technology", triad: "Amazon vs Walmart vs Target", employees: "1,570,000", emailBase: "~350,000", turmoil: 4.6, composite: 4.2, timing: "30K layoffs Jan 2026. RTO mandate ongoing.", status: "not_started", leadChannel: "Blind", angle: "The biggest layoff in Amazon history. What do 350K corporate employees think?", strategy: { approach: "Leverage RTO mandate frustration and mass layoff anxiety among 350K corporate email users.", tactics: ["Blind posts targeting Amazon employees (124K on Blind)", "r/amazon subreddit seeding with anonymous pulse angle", "QR codes at Seattle HQ coffee shops and SLU area", "LinkedIn carousel: 'What 350K Amazon corporate employees really think'"], channels: ["Blind", "Reddit", "LinkedIn"] } },
  { rank: 2, name: "UnitedHealth", pool: "Fortune 500", sector: "Healthcare", triad: "UnitedHealth vs Humana vs CVS Health", employees: "400,000", emailBase: "~200,000", turmoil: 4.6, composite: 4.2, timing: "30K buyout eligible. Weekly layoffs. CEO assassination aftermath.", status: "not_started", leadChannel: "TheLayoff.com", angle: "30,000 employees offered buyouts. Some say severance feels like relief from a dark situation.", strategy: { approach: "Post-assassination crisis, buyout offers to 30K, and near-weekly layoffs create unprecedented healthcare industry turmoil.", tactics: ["TheLayoff.com UnitedHealth board (extremely active)", "Blind healthcare/insurance channels", "LinkedIn posts on healthcare industry morale crisis", "Reddit r/healthinsurance and industry subreddits"], channels: ["TheLayoff.com", "Blind", "LinkedIn"] } },
  { rank: 3, name: "Oracle", pool: "Fortune 500", sector: "Technology", triad: "Oracle vs Boeing vs Apple", employees: "162,000", emailBase: "~130,000", turmoil: 4.8, composite: 4.1, timing: "30K fired via 6am email, Mar 31. Emotions raw NOW.", status: "not_started", leadChannel: "Blind", angle: "Fired by a 6am email. Survivors told to stretch. $6B quarterly income.", strategy: { approach: "6am mass firing email created raw emotional moment. Survivors are angry and looking for outlets.", tactics: ["TheLayoff.com Oracle board (extremely active right now)", "Blind posts targeting Oracle employees post-layoff", "LinkedIn posts riding the 'fired by email' news cycle", "Reddit r/oracle community engagement"], channels: ["Blind", "LinkedIn", "Reddit"] } },
  { rank: 4, name: "Dept. of Veterans Affairs", pool: "Federal Gov", sector: "Government", triad: "DHS vs HHS vs VA", employees: "482,000", emailBase: "~460,000", turmoil: 4.8, composite: 4.1, timing: "80K targeted reductions. Congressional pause expired.", status: "not_started", leadChannel: "Reddit", angle: "80K VA employees may lose their jobs. They serve people who served the country.", strategy: { approach: "Federal workers have opinions they cannot express through official channels. VA is the largest federal employer with near-universal email.", tactics: ["r/fednews launch post as 'anonymous daily pulse for federal workers'", "AFGE union newsletter placement (largest federal union)", "VA-specific Facebook groups for employees", "QR codes at VA medical centers near admin offices"], channels: ["Reddit", "Facebook Groups", "Newsletters"] } },
  { rank: 5, name: "DHS", pool: "Federal Gov", sector: "Government", triad: "DHS vs HHS vs VA", employees: "260,000", emailBase: "~180,000", turmoil: 4.6, composite: 4.0, timing: "400+ positions eliminated. FEMA gutted. CISA cut 130.", status: "not_started", leadChannel: "Reddit", angle: "FEMA gutted. CISA slashed. The agency that protects the homeland is losing its people.", strategy: { approach: "DOGE cuts hitting FEMA (200+ dismissed), CISA (130 cut), and CBP non-law-enforcement. Buyout offers of up to $25K.", tactics: ["r/fednews with DHS-specific content and FEMA angle", "AFGE union newsletter placement", "Federal employee Facebook groups", "LinkedIn posts on homeland security workforce crisis"], channels: ["Reddit", "Newsletters", "LinkedIn"] } },
  { rank: 6, name: "HHS", pool: "Federal Gov", sector: "Government", triad: "DHS vs HHS vs VA", employees: "83,000", emailBase: "~80,000", turmoil: 4.8, composite: 4.0, timing: "Most DOGE-targeted agency. 10K additional cuts announced.", status: "not_started", leadChannel: "Reddit", angle: "Medicare, CDC, FDA - all under the knife. What do HHS employees think?", strategy: { approach: "Most DOGE-targeted agency. 10K additional job cuts announced with restructuring. Employees are terrified and opinionated.", tactics: ["r/fednews with HHS-specific content", "AFGE and NTEU union newsletter placement", "Facebook groups for federal health workers", "Government employee forums and listservs"], channels: ["Reddit", "Facebook Groups", "Newsletters"] } },
  { rank: 7, name: "Meta", pool: "Fortune 500", sector: "Technology", triad: "Meta vs Google vs Microsoft", employees: "67,000", emailBase: "~67,000", turmoil: 4.2, composite: 4.0, timing: "Ongoing performance layoffs. Trust crisis.", status: "not_started", leadChannel: "Blind", angle: "Masculine energy. Performance layoffs nobody believes. Where is this company heading?", strategy: { approach: "Performance-based layoffs and 'masculine energy' culture shift generate strong opinions among 67K employees.", tactics: ["Blind posts (50K+ Meta employees on Blind)", "Reddit r/meta and tech career subreddits", "LinkedIn carousel on Big Tech morale comparison", "TikTok/Reels content about corporate culture shifts"], channels: ["Blind", "Reddit", "LinkedIn"] } },
  { rank: 8, name: "Google", pool: "Fortune 500", sector: "Technology", triad: "Meta vs Google vs Microsoft", employees: "183,000", emailBase: "~183,000", turmoil: 4.3, composite: 4.0, timing: "15K laid off early 2026. All-in AI bet gutting non-AI roles.", status: "not_started", leadChannel: "Blind", angle: "15,000 cut so Google can win the AI race. Waze gutted. Search teams hollowed. What do survivors think?", strategy: { approach: "Massive AI pivot cutting 8% of workforce. Waze, non-AI Search, and Ad sales teams hit hardest. Voluntary exit packages offered.", tactics: ["Blind posts (Google has massive Blind presence)", "TheLayoff.com Google board", "Reddit r/google and tech career subreddits", "LinkedIn posts on Big Tech AI reckoning"], channels: ["Blind", "TheLayoff.com", "Reddit"] } },
  { rank: 9, name: "Citigroup", pool: "Fortune 500", sector: "Finance", triad: "Citigroup vs Morgan Stanley vs Wells Fargo", employees: "240,000", emailBase: "~200,000", turmoil: 4.4, composite: 3.9, timing: "Layoffs begin Apr 14-18. TWO WEEK WINDOW.", status: "not_started", leadChannel: "Blind", angle: "CEO: 'We are not graded on effort.' Employee: 'Total implosion.' 20K jobs cut.", strategy: { approach: "CEO said 'we are not graded on effort' while cutting 20K jobs. Layoffs starting Apr 14-18 create a two-week window.", tactics: ["Blind finance channels (heavy Citi presence)", "QR codes at NYC Midtown finance corridor", "LinkedIn posts timed to Apr 14 layoff start", "Wall Street Oasis forum seeding"], channels: ["Blind", "Physical / QR", "LinkedIn"] } },
  { rank: 10, name: "Boeing", pool: "Fortune 500", sector: "Manufacturing", triad: "Oracle vs Boeing vs Apple", employees: "170,000", emailBase: "~140,000", turmoil: 4.4, composite: 3.9, timing: "Safety crisis ongoing. Criminal investigations.", status: "not_started", leadChannel: "Reddit", angle: "Doors flying off. Criminal investigations. Do employees trust management to fix it?", strategy: { approach: "Safety crisis and criminal investigations create an environment where employees want to speak but fear retaliation.", tactics: ["Reddit r/boeing and aviation subreddits", "LinkedIn targeting aerospace/defense workers", "Everett/Renton area QR code deployment near Boeing plants", "Press pitches with employee safety sentiment data"], channels: ["Reddit", "LinkedIn", "Press / PR"] } },
  { rank: 11, name: "Warner Bros Discovery", pool: "Fortune 500", sector: "Media", triad: "Warner Bros vs Disney vs Netflix", employees: "37,000", emailBase: "~28,000", turmoil: 4.2, composite: 3.8, timing: "Ongoing cable cuts. Merger culture clash.", status: "not_started", leadChannel: "Facebook Groups", angle: "Two media giants merged and nobody's sure it's working.", strategy: { approach: "Merger culture clash and ongoing cable cuts create deep uncertainty. Natural comparison with Disney.", tactics: ["Facebook entertainment industry groups", "TheLayoff.com Warner Bros board", "LinkedIn posts on media merger culture clash", "Reddit r/television and industry subreddits"], channels: ["Facebook Groups", "LinkedIn", "Reddit"] } },
  { rank: 12, name: "Ford", pool: "Fortune 500", sector: "Automotive", triad: "Ford vs General Motors vs Tesla", employees: "177,000", emailBase: "~60,000", turmoil: 4.2, composite: 3.7, timing: "15K layoffs, 3 plants closing. EV strategy in retreat.", status: "not_started", leadChannel: "TheLayoff.com", angle: "15,000 jobs gone. Three plants closing. The EV winter is real and Ford workers are paying for it.", strategy: { approach: "EV pivot reversal creating multi-year layoff wave. 15K cuts, plant closures, battery facility retooling. UAW tension rising.", tactics: ["TheLayoff.com Ford board (very active)", "UAW partnership and union newsletter outreach", "Reddit r/ford and automotive subreddits", "LinkedIn posts on manufacturing/EV industry transition"], channels: ["TheLayoff.com", "UAW / Unions", "Reddit"] } },
  { rank: 13, name: "OpenAI", pool: "Private", sector: "Technology / AI", triad: "Anthropic vs OpenAI vs xAI", employees: "~4,000", emailBase: "~4,000", turmoil: 3.8, composite: 3.7, timing: "For-profit conversion. Constant leadership drama.", status: "not_started", leadChannel: "Hacker News", angle: "The company building AGI. What do people inside think about safety vs. speed?", strategy: { approach: "Safety vs speed debate creates passionate internal opinions. Small but incredibly influential employee base.", tactics: ["Hacker News Show HN post with safety/morale angle", "Blind posts in AI company channels", "X/Twitter engagement with AI safety discourse", "Direct outreach to known AI safety advocates"], channels: ["Hacker News", "Blind", "X / Twitter"] } },
  { rank: 14, name: "Tesla", pool: "Fortune 500", sector: "Automotive", triad: "Ford vs General Motors vs Tesla", employees: "140,000", emailBase: "~45,000", turmoil: 4.0, composite: 3.7, timing: "Berlin cuts 1,700. Musk distracted by DOGE. Morale cratering.", status: "not_started", leadChannel: "Reddit", angle: "Elon's building DOGE while Tesla burns. 1,700 quietly cut in Berlin. Employees compare it to Squid Game.", strategy: { approach: "Musk's DOGE distraction, Berlin stealth layoffs, and ongoing rolling cuts create deep morale crisis. Mission clarity lost.", tactics: ["Reddit r/teslamotors and r/realtesla (employee-heavy)", "Blind posts in automotive/tech channels", "LinkedIn posts on Tesla culture vs mission disconnect", "TikTok/Reels corporate culture content"], channels: ["Reddit", "Blind", "LinkedIn"] } },
  { rank: 15, name: "Disney", pool: "Fortune 500", sector: "Media", triad: "Warner Bros vs Disney vs Netflix", employees: "225,000", emailBase: "~55,000", turmoil: 4.0, composite: 3.6, timing: "4th round of layoffs in a year.", status: "not_started", leadChannel: "Facebook Groups", angle: "Four rounds of layoffs while revenue goes up. What do the people who make the magic think?", strategy: { approach: "Four rounds of layoffs while revenue grows. Creative employees feel betrayed. Strong emotional angle.", tactics: ["Facebook: Film Industry Network (142K members)", "Entertainment industry Discord servers", "LinkedIn posts targeting entertainment/media workers", "Press pitches with 'Staff says' Disney employee data"], channels: ["Facebook Groups", "LinkedIn", "Press / PR"] } },
  { rank: 16, name: "Microsoft", pool: "Fortune 500", sector: "Technology", triad: "Meta vs Google vs Microsoft", employees: "220,000", emailBase: "~220,000", turmoil: 3.8, composite: 3.6, timing: "Rumored 11-22K cuts. Nadella: 'Size is a massive disadvantage.'", status: "not_started", leadChannel: "Blind", angle: "CEO says 220K employees is a 'massive disadvantage' in the AI race. Gaming, Azure, Sales bracing for cuts.", strategy: { approach: "Nadella calling company size a disadvantage signals ongoing cuts. Gaming, Azure, and Sales teams most at risk. Hierarchy flattening.", tactics: ["Blind posts (Microsoft has huge Blind presence)", "TheLayoff.com Microsoft board", "Reddit r/microsoft and tech career subreddits", "LinkedIn posts on Big Tech restructuring"], channels: ["Blind", "TheLayoff.com", "LinkedIn"] } },
  { rank: 17, name: "xAI", pool: "Private", sector: "Technology / AI", triad: "Anthropic vs OpenAI vs xAI", employees: "~1,500", emailBase: "~1,500", turmoil: 4.0, composite: 3.5, timing: "SpaceX acquired xAI. Co-founders fleeing. Musk rebuilding from scratch.", status: "not_started", leadChannel: "X / Twitter", angle: "Half the co-founders quit. SpaceX absorbed it. Musk says he's 'rebuilding from the foundations up.'", strategy: { approach: "SpaceX acquisition, mass co-founder departures, and 'rebuild from foundations' create chaos. Intense sleep-pod culture.", tactics: ["X/Twitter (Musk's own platform, employees are vocal there)", "Hacker News AI community threads", "Blind AI company channels", "Reddit r/machinelearning and AI subreddits"], channels: ["X / Twitter", "Hacker News", "Blind"] } },
  { rank: 18, name: "Wells Fargo", pool: "Fortune 500", sector: "Finance", triad: "Citigroup vs Morgan Stanley vs Wells Fargo", employees: "210,000", emailBase: "~180,000", turmoil: 3.8, composite: 3.5, timing: "65K jobs lost since 2019. AI rollout replacing roles. Cuts ongoing.", status: "not_started", leadChannel: "Blind", angle: "65,000 jobs gone in 7 years. AI replacing loan officers. The slow-motion gutting of Wells Fargo.", strategy: { approach: "Steady workforce reduction from 275K to 210K. AI driving 30-35% efficiency gains in engineering. Loan servicing roles being eliminated.", tactics: ["Blind finance channels", "TheLayoff.com Wells Fargo board (active)", "LinkedIn posts on banking AI displacement", "Reddit r/banking and finance subreddits"], channels: ["Blind", "TheLayoff.com", "LinkedIn"] } },
  { rank: 19, name: "General Motors", pool: "Fortune 500", sector: "Automotive", triad: "Ford vs General Motors vs Tesla", employees: "163,000", emailBase: "~55,000", turmoil: 3.8, composite: 3.5, timing: "Factory Zero to single shift. Battery plants paused. 1,750 indefinite layoffs.", status: "not_started", leadChannel: "TheLayoff.com", angle: "Record profits. EV dreams on hold. 1,750 workers told to go home indefinitely.", strategy: { approach: "EV scaling back despite record profits. Factory Zero cutting to one shift, battery plants paused. UAW tension over job guarantees.", tactics: ["TheLayoff.com GM board", "UAW partnership and union communication channels", "Reddit r/cars and automotive subreddits", "LinkedIn posts on Detroit's EV reckoning"], channels: ["TheLayoff.com", "UAW / Unions", "Reddit"] } },
  { rank: 20, name: "CVS Health", pool: "Fortune 500", sector: "Healthcare", triad: "UnitedHealth vs Humana vs CVS Health", employees: "300,000", emailBase: "~120,000", turmoil: 3.8, composite: 3.4, timing: "$2B cost-cutting. Aetna layoffs ongoing. $5.7B write-down.", status: "not_started", leadChannel: "TheLayoff.com", angle: "$5.7 billion write-down. 2,900 roles cut. The pharmacy giant is bleeding from the Aetna wound.", strategy: { approach: "$2B cost-cutting initiative driving rolling Aetna layoffs. Oak Street Health acquisition write-down signals strategic failure.", tactics: ["TheLayoff.com CVS board", "Blind healthcare/insurance channels", "LinkedIn posts on healthcare industry restructuring", "Reddit r/pharmacy and healthcare subreddits"], channels: ["TheLayoff.com", "Blind", "LinkedIn"] } },
  { rank: 21, name: "Morgan Stanley", pool: "Fortune 500", sector: "Finance", triad: "Citigroup vs Morgan Stanley vs Wells Fargo", employees: "82,000", emailBase: "~75,000", turmoil: 3.6, composite: 3.4, timing: "2,500 cut March 2026. Record profits + cuts.", status: "not_started", leadChannel: "Blind", angle: "Record profits. 2,500 laid off anyway. Wall Street sentiment showdown with Citi.", strategy: { approach: "Record profits alongside 2,500 cuts. Natural rivalry with Citi creates comparison content.", tactics: ["Blind finance channels with Citi comparison angle", "QR codes at Times Square / Midtown offices", "LinkedIn content on 'record profits + layoffs' paradox", "Finance newsletter placements"], channels: ["Blind", "Physical / QR", "Newsletters"] } },
  { rank: 22, name: "Humana", pool: "Fortune 500", sector: "Healthcare", triad: "UnitedHealth vs Humana vs CVS Health", employees: "67,000", emailBase: "~50,000", turmoil: 3.6, composite: 3.3, timing: "Reorgs every 6 months. Medicare Advantage pivot. 30% feel insecure.", status: "not_started", leadChannel: "TheLayoff.com", angle: "Layoffs every six months like clockwork. 30% of employees feel insecure. Medicare Advantage or bust.", strategy: { approach: "Constant reorgs and Medicare Advantage pivot create rolling uncertainty. 36% cite instability as reason to leave.", tactics: ["TheLayoff.com Humana board", "Blind healthcare channels", "LinkedIn posts on healthcare payer instability", "Indeed and Glassdoor community engagement"], channels: ["TheLayoff.com", "Blind", "LinkedIn"] } },
  { rank: 23, name: "Planned Parenthood", pool: "Large NGO", sector: "Public Sector", triad: "Red Cross vs Feeding America vs Planned Parenthood", employees: "12,000", emailBase: "~9,000", turmoil: 4.2, composite: 3.3, timing: "Internal turmoil. Political pressure never stops.", status: "not_started", leadChannel: "LinkedIn", angle: "Mission-driven employees navigating political warfare and internal turmoil.", strategy: { approach: "Mission-driven employees navigating political warfare. Strong opinions that cannot be expressed publicly.", tactics: ["LinkedIn targeting nonprofit/public sector workers", "NGO-focused newsletters and communities", "Facebook groups for reproductive health workers", "Direct outreach to nonprofit professional networks"], channels: ["LinkedIn", "Newsletters", "Facebook Groups"] } },
  { rank: 24, name: "Walmart", pool: "Fortune 500", sector: "Retail", triad: "Amazon vs Walmart vs Target", employees: "2,100,000", emailBase: "~25,000", turmoil: 3.4, composite: 3.2, timing: "1,500 corporate cuts. AI investment. Forced relocations to Bentonville.", status: "not_started", leadChannel: "Reddit", angle: "World's biggest employer cutting corporate and forcing relocations. The AI efficiency machine is coming for HQ.", strategy: { approach: "1,500 corporate layoffs, AI-driven efficiency push, and forced relocations to Bentonville create tension between store-level stability and HQ chaos.", tactics: ["Reddit r/walmart (massive employee subreddit)", "TheLayoff.com Walmart board", "LinkedIn posts on retail AI displacement", "Blind retail/corporate channels"], channels: ["Reddit", "TheLayoff.com", "LinkedIn"] } },
  { rank: 25, name: "CA State Gov", pool: "State Gov", sector: "Government", triad: "FL State Gov vs TX State Gov vs CA State Gov", employees: "234,000", emailBase: "~230,000", turmoil: 3.6, composite: 3.2, timing: "$11.9B deficit. 10K vacant positions cut. Salary cuts proposed.", status: "not_started", leadChannel: "SEIU Local 1000", angle: "$767M in proposed salary cuts. 10,000 vacant positions eliminated. The Golden State workforce is tarnishing.", strategy: { approach: "$11.9B deficit driving salary cut proposals and position eliminations. SEIU Local 1000 (96K members) actively fighting back.", tactics: ["SEIU Local 1000 newsletter and member communications", "Reddit r/CAStateWorkers (very active)", "Facebook groups for California state employees", "LinkedIn posts on public sector compensation crisis"], channels: ["SEIU Local 1000", "Reddit", "Facebook Groups"] } },
  { rank: 26, name: "Target", pool: "Fortune 500", sector: "Retail", triad: "Amazon vs Walmart vs Target", employees: "440,000", emailBase: "~18,000", turmoil: 3.8, composite: 3.1, timing: "New CEO Feb 2026. 12 quarters falling sales.", status: "not_started", leadChannel: "Reddit", angle: "12 straight quarters down. New CEO. Can this ship turn around?", strategy: { approach: "12 straight quarters of declining sales plus new CEO creates uncertainty. 18K corporate email users are reachable.", tactics: ["Blind retail/corporate channels", "Reddit r/target (employee-heavy subreddit)", "LinkedIn posts on retail leadership transitions", "QR codes at Minneapolis HQ area"], channels: ["Reddit", "Blind", "LinkedIn"] } },
  { rank: 27, name: "Netflix", pool: "Fortune 500", sector: "Media", triad: "Warner Bros vs Disney vs Netflix", employees: "16,000", emailBase: "~16,000", turmoil: 3.2, composite: 3.1, timing: "Product division layoffs. Culture shifting from candor to fear.", status: "not_started", leadChannel: "LinkedIn", angle: "The 'no rules' culture is growing rules. Insiders say candor is being replaced by fear. What happened to Netflix?", strategy: { approach: "Culture shift from famous 'candor' to 'fear-based' environment. Product division reorganization. Employees losing trust.", tactics: ["LinkedIn posts on Netflix culture transformation", "Blind tech/media channels", "Reddit r/netflix and entertainment industry subreddits", "Press pitches on culture shift angle"], channels: ["LinkedIn", "Blind", "Reddit"] } },
  { rank: 28, name: "FL State Gov", pool: "State Gov", sector: "Government", triad: "FL State Gov vs TX State Gov vs CA State Gov", employees: "180,000", emailBase: "~175,000", turmoil: 3.4, composite: 3.0, timing: "DeSantis launching state-level DOGE. 700+ jobs proposed for elimination.", status: "not_started", leadChannel: "SEIU Newsletters", angle: "Florida's own DOGE is coming. 700 state jobs targeted. Dozens of boards on the chopping block.", strategy: { approach: "DeSantis creating state-level DOGE task force. 700+ jobs targeted, boards being eliminated. Federal DOGE ripple effect.", tactics: ["SEIU and AFSCME Florida chapter newsletters", "Reddit r/florida and state employee subreddits", "Facebook groups for Florida government workers", "LinkedIn posts on state-level government efficiency push"], channels: ["SEIU Newsletters", "Reddit", "Facebook Groups"] } },
  { rank: 29, name: "Anthropic", pool: "Private", sector: "Technology / AI", triad: "Anthropic vs OpenAI vs xAI", employees: "~3,000", emailBase: "~3,000", turmoil: 3.0, composite: 2.9, timing: "Essential rivalry pair with OpenAI. Rapid scaling.", status: "not_started", leadChannel: "Hacker News", angle: "The safety-first AI lab. How do they compare to OpenAI on burnout and mission?", strategy: { approach: "The 'safety-first' positioning creates natural curiosity about how employees compare to OpenAI on burnout and mission.", tactics: ["Hacker News cross-posting with OpenAI comparison angle", "Blind AI company channels", "LinkedIn thought leadership on AI workplace culture", "Direct DMs to vocal Anthropic employees on X"], channels: ["Hacker News", "Blind", "LinkedIn"] } },
  { rank: 30, name: "Red Cross", pool: "Large NGO", sector: "Public Sector", triad: "Red Cross vs Feeding America vs Planned Parenthood", employees: "33,000", emailBase: "~25,000", turmoil: 3.0, composite: 2.8, timing: "Donation slumps. Corporate restructuring history. Mission vs bureaucracy tension.", status: "not_started", leadChannel: "LinkedIn", angle: "The world's most recognized relief org. Do the people inside feel like they're actually helping?", strategy: { approach: "Gap between humanitarian mission and corporate bureaucracy creates frustrated employees. Historical donation-driven layoff cycles.", tactics: ["LinkedIn targeting nonprofit/humanitarian workers", "NGO-focused newsletters and communities", "Facebook groups for disaster relief workers", "Indeed and Glassdoor community engagement"], channels: ["LinkedIn", "Newsletters", "Facebook Groups"] } },
  { rank: 31, name: "TX State Gov", pool: "State Gov", sector: "Government", triad: "FL State Gov vs TX State Gov vs CA State Gov", employees: "340,000", emailBase: "~330,000", turmoil: 2.8, composite: 2.6, timing: "Anti-privatization fights. Union advocacy on staffing levels.", status: "not_started", leadChannel: "CWA-TSEU", angle: "340,000 state workers in the biggest red state. What do they think about how government actually works?", strategy: { approach: "Largest state workforce of the three. CWA-TSEU union active on privatization fights and staffing. Less visible turmoil but massive addressable base.", tactics: ["CWA-TSEU (Texas State Employees Union) outreach", "Reddit r/texas and state employee subreddits", "Facebook groups for Texas state workers", "LinkedIn posts on red state vs blue state public sector"], channels: ["CWA-TSEU", "Reddit", "Facebook Groups"] } },
  { rank: 32, name: "Apple", pool: "Fortune 500", sector: "Technology", triad: "Oracle vs Boeing vs Apple", employees: "164,000", emailBase: "~164,000", turmoil: 2.4, composite: 2.3, timing: "Rare sales layoffs. AI team expanding 20%. Mostly stable.", status: "not_started", leadChannel: "Blind", angle: "Apple almost never lays people off. So when they cut sales roles, people notice. What's shifting inside?", strategy: { approach: "Rarity of Apple layoffs makes even small cuts newsworthy. AI expansion while cutting sales creates strategic tension.", tactics: ["Blind posts (Apple has significant Blind presence)", "TheLayoff.com Apple board", "LinkedIn posts on Apple's unusual restructuring", "Hacker News Apple-focused threads"], channels: ["Blind", "TheLayoff.com", "LinkedIn"] } },
  { rank: 33, name: "Feeding America", pool: "Large NGO", sector: "Public Sector", triad: "Red Cross vs Feeding America vs Planned Parenthood", employees: "~670", emailBase: "~670", turmoil: 2.4, composite: 2.2, timing: "Largest US charity by revenue. Political pressure on food assistance programs.", status: "not_started", leadChannel: "LinkedIn", angle: "The largest charity in America feeds 46 million people. What do the 670 people who run it think?", strategy: { approach: "Tiny HQ staff running the nation's largest hunger relief network. Political pressure on SNAP and food assistance creates mission urgency.", tactics: ["LinkedIn targeting nonprofit/hunger relief workers", "NGO-focused newsletters (Chronicle of Philanthropy)", "Facebook groups for food bank and nonprofit workers", "Partnership with local food bank employee networks"], channels: ["LinkedIn", "Newsletters", "Facebook Groups"] } },
];

const CHANNELS = [
  { name: "Blind", type: "Community", priority: "High", targets: "Tech, Finance", status: "not_started", notes: "10M+ verified users. Amazon 124K, Meta 50K+, Google massive presence." },
  { name: "Reddit", type: "Community", priority: "High", targets: "Fed Gov, Tech, Retail, Auto", status: "not_started", notes: "r/fednews 359K members. r/teslamotors, r/target, r/boeing, r/CAStateWorkers all active." },
  { name: "LinkedIn", type: "Social", priority: "High", targets: "All pools", status: "not_started", notes: "Carousel posts get 7% engagement. Personal profiles > company pages." },
  { name: "TheLayoff.com", type: "Community", priority: "High", targets: "Tech, Finance, Healthcare, Auto", status: "not_started", notes: "Highly active boards per company. UnitedHealth, Oracle, Ford, CVS all surging." },
  { name: "Press / PR", type: "Content", priority: "High", targets: "Data stories", status: "not_started", notes: "Rivalry data is journalist catnip. Target labor/workplace beats at Axios, BI, Fast Company." },
  { name: "Newsletters", type: "Content", priority: "High", targets: "Workplace, NGO, Gov", status: "not_started", notes: "Work3 (30K+), Future of Work Culture, Chronicle of Philanthropy, Morning Brew." },
  { name: "Union Channels", type: "Partnership", priority: "High", targets: "Auto, State Gov, Fed Gov", status: "not_started", notes: "UAW ($40M organizing push), SEIU Local 1000 (96K CA workers), AFGE, CWA-TSEU." },
  { name: "TikTok / Reels", type: "Social", priority: "Medium", targets: "Broad reach", status: "not_started", notes: "#CorporateTikTok 4.9B views. DeAndre Brown 1.1M followers." },
  { name: "Podcasts", type: "Content", priority: "Medium", targets: "Thought leadership", status: "not_started", notes: "WorkLife w/ Adam Grant, Pivot, How I Built This (25M+ downloads)." },
  { name: "X / Twitter", type: "Social", priority: "Medium", targets: "Tech, AI, Media", status: "not_started", notes: "Hot takes from survey data. xAI employees vocal here. Ride trending stories." },
  { name: "Discord / Slack", type: "Community", priority: "Medium", targets: "Tech, Fed Gov", status: "not_started", notes: "Slack FedRAMP authorized. ReactiFlux 200K+ devs." },
  { name: "Facebook Groups", type: "Community", priority: "Medium", targets: "Gov, Healthcare, NGO, Media", status: "not_started", notes: "Strong for nurses, teachers, federal workers, entertainment industry (Film Industry Network 142K)." },
  { name: "Physical / QR", type: "Offline", priority: "Medium", targets: "HQ corridors, events", status: "not_started", notes: "NYC Midtown finance corridor, Seattle SLU, Burbank studios, Detroit auto HQs, WeWork spaces." },
  { name: "Hacker News", type: "Community", priority: "Medium", targets: "Tech, AI", status: "not_started", notes: "Show HN for AI triad. Technical audience, high engagement on workplace culture." },
];

const RIVALRY_TRIADS = [
  { a: "Citigroup", b: "Morgan Stanley", c: "Wells Fargo", hook: "Wall Street's Efficiency Bloodbath", sector: "Finance", tier: "A", channel: "Blind", score: 4.9 },
  { a: "Warner Bros Discovery", b: "Disney", c: "Netflix", hook: "The Streaming Wars from the Inside", sector: "Media & Entertainment", tier: "A", channel: "Facebook Groups", score: 4.8 },
  { a: "UnitedHealth", b: "Humana", c: "CVS Health", hook: "The Insurers Your Doctor Hates", sector: "Healthcare", tier: "A", channel: "TheLayoff.com", score: 4.7 },
  { a: "DHS", b: "HHS", c: "VA", hook: "The Enforcer, the Provider, and the Gutted", sector: "Federal Government", tier: "A", channel: "r/fednews", score: 4.6 },
  { a: "Meta", b: "Google", c: "Microsoft", hook: "Big Tech's AI Reckoning", sector: "Technology", tier: "A", channel: "Blind", score: 4.5 },
  { a: "Anthropic", b: "OpenAI", c: "xAI", hook: "Safety vs Speed vs Elon", sector: "AI", tier: "A", channel: "Hacker News", score: 4.5 },
  { a: "Amazon", b: "Walmart", c: "Target", hook: "The Everything Store vs Everyone Else", sector: "Retail", tier: "A", channel: "Reddit", score: 4.4 },
  { a: "Ford", b: "General Motors", c: "Tesla", hook: "Detroit vs Silicon Valley on Wheels", sector: "Automotive", tier: "B+", channel: "UAW partnership", score: 4.3 },
  { a: "Oracle", b: "Boeing", c: "Apple", hook: "The Misfits Table", sector: "Tech / Manufacturing", tier: "B+", channel: "TheLayoff.com", score: 4.1 },
  { a: "FL State Gov", b: "TX State Gov", c: "CA State Gov", hook: "Red State vs Blue State from Inside", sector: "State Government", tier: "B", channel: "SEIU newsletters", score: 4.0 },
  { a: "Red Cross", b: "Feeding America", c: "Planned Parenthood", hook: "Mission vs Reality", sector: "NGO / Public Sector", tier: "B", channel: "LinkedIn", score: 3.8 },
];

const STATUS_OPTIONS = [
  { key: "not_started", label: "Not Started", color: "bg-gray-100 text-gray-600", dot: "bg-gray-400" },
  { key: "researching", label: "Researching", color: "bg-blue-100 text-blue-700", dot: "bg-blue-400" },
  { key: "outreach", label: "Outreach", color: "bg-indigo-100 text-indigo-700", dot: "bg-indigo-400" },
  { key: "seeding", label: "Seeding", color: "bg-yellow-100 text-yellow-700", dot: "bg-yellow-400" },
  { key: "active", label: "Active", color: "bg-green-100 text-green-700", dot: "bg-green-500" },
  { key: "paused", label: "Paused", color: "bg-orange-100 text-orange-700", dot: "bg-orange-400" },
];

const STATUS_CONFIG = Object.fromEntries(STATUS_OPTIONS.map(s => [s.key, s]));

const POOL_COLORS = {
  "Fortune 500": "bg-blue-100 text-blue-700 border-blue-200",
  "Private": "bg-purple-100 text-purple-700 border-purple-200",
  "Federal Gov": "bg-red-100 text-red-700 border-red-200",
  "State Gov": "bg-amber-100 text-amber-700 border-amber-200",
  "Large NGO": "bg-emerald-100 text-emerald-700 border-emerald-200",
};

function TurmoilBar({ score }) {
  const pct = (score / 5) * 100;
  const color = score >= 4.5 ? "bg-red-500" : score >= 3.5 ? "bg-orange-400" : "bg-yellow-400";
  return (
    <div className="flex items-center gap-2">
      <div className="w-24 h-2.5 bg-gray-200 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color} transition-all`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs font-mono text-gray-500 w-8">{score.toFixed(1)}</span>
    </div>
  );
}

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.not_started;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${cfg.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

function StatusDropdown({ status, onChange }) {
  const [open, setOpen] = useState(false);
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.not_started;
  return (
    <div className="relative">
      <button
        onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium cursor-pointer hover:ring-2 hover:ring-gray-300 transition-all ${cfg.color}`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
        {cfg.label}
        <svg className="w-3 h-3 ml-0.5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </button>
      {open && (
        <div className="absolute z-50 mt-1 right-0 bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-[140px]" onClick={(e) => e.stopPropagation()}>
          {STATUS_OPTIONS.map((opt) => (
            <button
              key={opt.key}
              onClick={(e) => { e.stopPropagation(); onChange(opt.key); setOpen(false); }}
              className={`w-full text-left px-3 py-1.5 text-xs flex items-center gap-2 hover:bg-gray-50 ${status === opt.key ? "font-bold" : ""}`}
            >
              <span className={`w-2 h-2 rounded-full ${opt.dot}`} />
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function PoolBadge({ pool }) {
  return (
    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium border ${POOL_COLORS[pool] || "bg-gray-100 text-gray-600 border-gray-200"}`}>
      {pool}
    </span>
  );
}

function PriorityBadge({ priority }) {
  const colors = {
    High: "bg-red-100 text-red-700 border-red-200",
    Medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
    Low: "bg-gray-100 text-gray-500 border-gray-200",
  };
  return (
    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium border ${colors[priority] || colors.Low}`}>
      {priority}
    </span>
  );
}

function CountdownBanner() {
  const launch = new Date("2026-05-01T00:00:00");
  const now = new Date();
  const diff = Math.max(0, Math.ceil((launch - now) / (1000 * 60 * 60 * 24)));
  const pct = Math.min(100, ((30 - diff) / 30) * 100);
  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white px-6 py-5 rounded-2xl flex items-center justify-between shadow-lg">
      <div>
        <div className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Public Beta Launch</div>
        <div className="text-2xl font-bold mt-1 tracking-tight">May 1, 2026</div>
        <div className="mt-2 w-48 h-1.5 bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full" style={{ width: `${pct}%` }} />
        </div>
      </div>
      <div className="text-right">
        <div className="text-5xl font-black tracking-tighter">{diff}</div>
        <div className="text-sm text-gray-400 -mt-1">days to go</div>
      </div>
    </div>
  );
}

function SummaryCards() {
  const totalEmail = TARGETS.reduce((sum, t) => {
    const n = t.emailBase.replace(/[^0-9]/g, "");
    return sum + (parseInt(n) || 0);
  }, 0);
  const fmtEmail = totalEmail >= 1000000 ? (totalEmail / 1000000).toFixed(1) + "M" : (totalEmail / 1000).toFixed(0) + "K";
  const avgTurmoil = (TARGETS.reduce((s, t) => s + t.turmoil, 0) / TARGETS.length).toFixed(1);
  const urgentCount = TARGETS.filter(t => t.turmoil >= 4.5).length;
  const poolCount = [...new Set(TARGETS.map(t => t.pool))].length;
  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
      {[
        { label: "Targets", value: TARGETS.length, sub: "across " + poolCount + " pools" },
        { label: "Addressable", value: fmtEmail, sub: "est. corporate email" },
        { label: "Avg Turmoil", value: avgTurmoil + "/5", sub: "higher = more opportunity" },
        { label: "Urgent", value: urgentCount, sub: "turmoil >= 4.5" },
        { label: "Rivalry Triads", value: RIVALRY_TRIADS.length, sub: "3-way viral mechanic" },
      ].map((card, i) => (
        <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-sm transition-shadow">
          <span className="text-xs text-gray-500 uppercase tracking-wide font-semibold">{card.label}</span>
          <div className="text-2xl font-black text-gray-900 mt-2">{card.value}</div>
          <div className="text-xs text-gray-400 mt-0.5">{card.sub}</div>
        </div>
      ))}
    </div>
  );
}

function TargetDetail({ target, onClose, statusMap, onStatusChange }) {
  const triadInfo = RIVALRY_TRIADS.find(t =>
    t.a === target.name || t.b === target.name || t.c === target.name
  ) || null;

  const currentStatus = statusMap[target.name] || target.status;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto p-6" onClick={e => e.stopPropagation()}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl font-black text-gray-900">#{target.rank}</span>
              <h2 className="text-2xl font-black text-gray-900">{target.name}</h2>
            </div>
            <div className="flex gap-2 mt-2">
              <PoolBadge pool={target.pool} />
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{target.sector}</span>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xs text-gray-500 uppercase font-semibold">Total Employees</div>
              <div className="text-lg font-bold mt-1">{target.employees}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xs text-gray-500 uppercase font-semibold">Email Base</div>
              <div className="text-lg font-bold mt-1">{target.emailBase}</div>
            </div>
          </div>

          <div>
            <div className="text-xs text-gray-500 uppercase font-semibold mb-2">Turmoil Score</div>
            <TurmoilBar score={target.turmoil} />
          </div>

          {target.strategy && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="text-xs text-blue-600 uppercase font-semibold mb-2">Strategy</div>
              <p className="text-sm text-blue-800">{target.strategy.approach}</p>
            </div>
          )}

          {target.strategy && target.strategy.tactics && (
            <div>
              <div className="text-xs text-gray-500 uppercase font-semibold mb-2">Key Tactics</div>
              <ul className="space-y-1.5">
                {target.strategy.tactics.map((tactic, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <input type="checkbox" className="mt-0.5 w-3 h-3 rounded" />
                    <span>{tactic}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {target.strategy && target.strategy.channels && (
            <div>
              <div className="text-xs text-gray-500 uppercase font-semibold mb-2">Best Channels</div>
              <div className="flex flex-wrap gap-2">
                {target.strategy.channels.map((channel, i) => (
                  <span key={i} className="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">
                    {channel}
                  </span>
                ))}
              </div>
            </div>
          )}

          {triadInfo && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
              <div className="text-xs text-orange-600 uppercase font-semibold mb-2">Rivalry Triad</div>
              <div className="text-sm font-bold text-orange-800 mb-2">{triadInfo.a} vs {triadInfo.b} vs {triadInfo.c}</div>
              <p className="text-xs text-orange-700 italic">&quot;{triadInfo.hook}&quot;</p>
            </div>
          )}

          <div>
            <div className="text-xs text-gray-500 uppercase font-semibold mb-1">Entry Angle</div>
            <p className="text-sm text-gray-700 italic">&quot;{target.angle}&quot;</p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="text-xs text-yellow-600 uppercase font-semibold">Timing</div>
            <p className="text-sm text-yellow-800 mt-1">{target.timing}</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 uppercase font-semibold">Status:</span>
            <StatusDropdown status={currentStatus} onChange={(s) => onStatusChange(target.name, s)} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [tab, setTab] = useState("targets");
  const [sortBy, setSortBy] = useState("rank");
  const [selectedTarget, setSelectedTarget] = useState(null);
  const [statusMap, setStatusMap] = useState({});
  const [filterPool, setFilterPool] = useState("all");

  const handleStatusChange = (name, newStatus) => {
    setStatusMap(prev => ({ ...prev, [name]: newStatus }));
  };

  const pools = ["all", ...Object.keys(POOL_COLORS)];

  const filtered = filterPool === "all" ? TARGETS : TARGETS.filter(t => t.pool === filterPool);

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "turmoil") return b.turmoil - a.turmoil;
    if (sortBy === "composite") return b.composite - a.composite;
    if (sortBy === "email") {
      const parseEmail = (s) => {
        const n = s.replace(/[^0-9]/g, "");
        return parseInt(n) || 0;
      };
      return parseEmail(b.emailBase) - parseEmail(a.emailBase);
    }
    return a.rank - b.rank;
  });

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Staff GTM Command Center</h1>
        </div>
        <p className="text-gray-500 text-sm">Go-to-market strategy tracker - 79seconds / staff.is</p>
      </div>

      <div className="space-y-4">
        <CountdownBanner />
        <SummaryCards />

        <div className="flex gap-1 bg-white rounded-xl border border-gray-200 p-1.5 w-fit shadow-sm">
          {[
            { id: "targets", label: "Targets", count: TARGETS.length },
            { id: "channels", label: "Channels", count: CHANNELS.length },
            { id: "rivalries", label: "Rivalries", count: RIVALRY_TRIADS.length },
            { id: "timeline", label: "Timeline" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                tab === t.id
                  ? "bg-gray-900 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {t.label}
              {t.count && <span className={`ml-1.5 text-xs ${tab === t.id ? "text-gray-400" : "text-gray-400"}`}>{t.count}</span>}
            </button>
          ))}
        </div>

        {tab === "targets" && (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between flex-wrap gap-3">
              <h2 className="font-bold text-gray-900 text-lg">Target Companies</h2>
              <div className="flex gap-3 items-center flex-wrap">
                <div className="flex gap-1 items-center">
                  <span className="text-xs text-gray-400 mr-1">Pool</span>
                  {pools.map((p) => (
                    <button key={p} onClick={() => setFilterPool(p)}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                        filterPool === p ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}>
                      {p === "all" ? "All" : p}
                    </button>
                  ))}
                </div>
                <div className="flex gap-1 items-center">
                  <span className="text-xs text-gray-400 mr-1">Sort</span>
                  {[
                    { key: "rank", label: "Rank" },
                    { key: "turmoil", label: "Turmoil" },
                    { key: "composite", label: "Score" },
                    { key: "email", label: "Email" },
                  ].map((s) => (
                    <button key={s.key} onClick={() => setSortBy(s.key)}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                        sortBy === s.key ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}>
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-gray-400 uppercase tracking-wider border-b border-gray-100 bg-gray-50/50">
                    <th className="px-5 py-3 w-10">#</th>
                    <th className="px-4 py-3">Company</th>
                    <th className="px-4 py-3">Pool</th>
                    <th className="px-4 py-3">Sector</th>
                    <th className="px-4 py-3">Lead Channel</th>
                    <th className="px-4 py-3 text-right">Email Base</th>
                    <th className="px-4 py-3">Turmoil</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((t, i) => (
                    <tr
                      key={t.name}
                      onClick={() => setSelectedTarget(t)}
                      className={`border-b border-gray-50 cursor-pointer transition-colors ${
                        i % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                      } hover:bg-blue-50/60`}
                    >
                      <td className="px-5 py-3 text-gray-400 font-mono text-xs font-bold">{t.rank}</td>
                      <td className="px-4 py-3 font-semibold text-gray-900">{t.name}</td>
                      <td className="px-4 py-3"><PoolBadge pool={t.pool} /></td>
                      <td className="px-4 py-3 text-gray-600 text-xs">{t.sector}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded text-xs font-medium bg-green-50 text-green-700 border border-green-200">{t.leadChannel}</span>
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-gray-700 text-xs">{t.emailBase}</td>
                      <td className="px-4 py-3"><TurmoilBar score={t.turmoil} /></td>
                      <td className="px-4 py-3">
                        <StatusDropdown
                          status={statusMap[t.name] || t.status}
                          onChange={(s) => handleStatusChange(t.name, s)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "channels" && (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-bold text-gray-900 text-lg">Channel Strategy</h2>
              <p className="text-xs text-gray-400 mt-0.5">Prioritized distribution channels for seeding Staff</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-gray-400 uppercase tracking-wider border-b border-gray-100 bg-gray-50/50">
                    <th className="px-5 py-3">Channel</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Priority</th>
                    <th className="px-4 py-3">Best For</th>
                    <th className="px-4 py-3">Key Intel</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {CHANNELS.map((ch, i) => (
                    <tr key={ch.name} className={`border-b border-gray-50 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/30"}`}>
                      <td className="px-5 py-3 font-semibold text-gray-900">{ch.name}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">{ch.type}</span>
                      </td>
                      <td className="px-4 py-3"><PriorityBadge priority={ch.priority} /></td>
                      <td className="px-4 py-3 text-gray-600 text-xs">{ch.targets}</td>
                      <td className="px-4 py-3 text-gray-500 text-xs max-w-xs">{ch.notes}</td>
                      <td className="px-4 py-3"><StatusBadge status={ch.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "rivalries" && (
          <div className="space-y-4">
            <div>
              <h2 className="font-bold text-gray-900 text-lg">Rivalry Triads</h2>
              <p className="text-sm text-gray-500 mt-1">Three-way comparisons create 4x the content surface of binary pairs. Each triad generates 3 pairwise matchups + 1 three-way ranking - the core viral mechanic.</p>
            </div>
            {RIVALRY_TRIADS.map((triad, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${triad.tier === "A" ? "bg-green-100 text-green-700" : triad.tier === "B+" ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-600"}`}>Tier {triad.tier}</span>
                    <span className="text-xs text-gray-400">{triad.sector}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">Score</span>
                    <span className="text-sm font-black text-gray-900">{triad.score}</span>
                    <span className="text-xs text-gray-400">/ 5</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 text-center">
                    <div className="text-lg font-black text-gray-900">{triad.a}</div>
                  </div>
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white font-black text-xs shadow-lg">VS</div>
                  </div>
                  <div className="flex-1 text-center">
                    <div className="text-lg font-black text-gray-900">{triad.b}</div>
                  </div>
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white font-black text-xs shadow-lg">VS</div>
                  </div>
                  <div className="flex-1 text-center">
                    <div className="text-lg font-black text-gray-900">{triad.c}</div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                  <div className="text-sm text-gray-600 italic">&quot;{triad.hook}&quot;</div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-gray-400">Best channel:</span>
                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200">{triad.channel}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "timeline" && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h2 className="font-bold text-gray-900 text-lg mb-1">May 1 to Election Day Viral Playbook</h2>
            <p className="text-sm text-gray-500 mb-6">4 phases, 187 days - zero budget, QR-driven growth</p>
            <div className="space-y-0">
              {[
                { week: "Phase 1", dates: "May 1 - Jun 15", phase: "SEED", color: "from-blue-500 to-blue-600", target: "500 subs", tasks: [
                  "PUBLIC BETA - MAY 1",
                  "r/fednews launch post - 'anonymous daily pulse for federal workers'",
                  "Blind posts: Finance triad (Citi vs MS vs Wells Fargo) + Big Tech triad (Meta vs Google vs MSFT)",
                  "Hacker News Show HN for AI triad - safety/morale angle",
                  "TheLayoff.com seeding: Oracle, UnitedHealth, Ford, CVS boards",
                  "Facebook: Film Industry Network (142K) for Media triad",
                  "QR deployment: Burbank studios, NYC Midtown finance corridor, Seattle SLU",
                  "Every new subscriber gets personal QR code + 'Invite 3 coworkers' prompt",
                ]},
                { week: "Phase 2", dates: "Jun 16 - Aug 15", phase: "IGNITE RIVALRIES", color: "from-yellow-500 to-orange-500", target: "2,500 subs", tasks: [
                  "First Rivalry Reports drop - side-by-side triad comparison image cards",
                  "Triad leaderboards: 'Which company's employees are happiest this week?'",
                  "'Share your ranking' - branded image card generator for LinkedIn/Instagram",
                  "UAW outreach for Ford/GM/Tesla triad (aligns with $40M organizing push)",
                  "SEIU Local 1000 outreach for CA state gov triad (96K workers)",
                  "Healthcare triad launch: UnitedHealth vs Humana vs CVS on TheLayoff.com",
                  "Caltrain QR campaign - Palo Alto, Mountain View platforms for Big Tech triad",
                  "Second Blind/Reddit wave with real anonymized data comparisons",
                ]},
                { week: "Phase 3", dates: "Aug 16 - Sep 30", phase: "AMPLIFY", color: "from-green-500 to-emerald-500", target: "10,000 subs", tasks: [
                  "Press pitches: Axios, Business Insider, Fast Company with 'Staff says' data",
                  "Podcast circuit: WorkLife w/ Adam Grant, Pivot, Prof G Pod, How I Built This",
                  "HLTH Conference pre-buzz for Health Insurance triad (Nov event)",
                  "American Automotive Summit (Sep 15-16, Detroit) - QR in conference materials",
                  "Launch 'Election Pulse' daily series - how the election affects workers",
                  "Newsletter partnerships: Morning Brew, The Hustle, TLDR Newsletter",
                  "NGO triad launch: Red Cross vs Feeding America vs Planned Parenthood",
                ]},
                { week: "Phase 4", dates: "Oct 1 - Nov 5", phase: "ELECTION SPRINT", color: "from-red-500 to-rose-600", target: "25,000+ subs", tasks: [
                  "Daily Election Pulse: political opinions at work, would you leave based on outcome?",
                  "State Gov triad peaks: FL vs TX vs CA employee opinions on the election",
                  "Federal triad peaks: DHS/HHS/VA on job security post-election",
                  "'Staff Predicts' - aggregate employee sentiment as informal election predictor",
                  "Election night live results: 'How do you feel about the result?'",
                  "Final QR blitz: every conference, union hall, commuter corridor",
                  "Referral sprint: 'Invite 5 coworkers this week' challenge with leaderboard",
                ]},
              ].map((w, i) => (
                <div key={i} className="flex gap-5">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${w.color} flex items-center justify-center text-white text-sm font-black shadow-sm`}>
                      {i + 1}
                    </div>
                    {i < 3 && <div className="w-0.5 flex-1 bg-gray-200 my-2" />}
                  </div>
                  <div className="pb-8 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-gray-900">{w.week}</span>
                      <span className="text-sm text-gray-500">{w.dates}</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold text-white bg-gradient-to-r ${w.color}`}>{w.phase}</span>
                      <span className="text-xs text-gray-400 ml-1">Target: {w.target}</span>
                    </div>
                    <ul className="mt-3 space-y-2">
                      {w.tasks.map((task, j) => (
                        <li key={j} className="text-sm text-gray-600 flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-1.5 flex-shrink-0" />
                          <span className={task.includes("PUBLIC BETA") ? "font-bold text-gray-900" : ""}>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {selectedTarget && (
        <TargetDetail
          target={selectedTarget}
          onClose={() => setSelectedTarget(null)}
          statusMap={statusMap}
          onStatusChange={handleStatusChange}
        />
      )}

      <div className="mt-8 text-xs text-gray-400 text-center pb-4">
        Staff GTM Command Center v2.0 - Data as of April 5, 2026 - 79seconds
      </div>
    </div>
  );
}
