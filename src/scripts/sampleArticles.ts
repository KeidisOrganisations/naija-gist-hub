
import { supabase } from '@/integrations/supabase/client';

// Sample categories
const categories = [
  { name: 'Finance', slug: 'finance', description: 'Money matters, savings, investments and financial advice' },
  { name: 'Tech', slug: 'tech', description: 'Technology tips, gadgets, and digital skills' },
  { name: 'Life', slug: 'life', description: 'Everyday life hacks and personal development' },
  { name: 'Education', slug: 'education', description: 'Learning resources, school tips, and educational guidance' },
  { name: 'Business', slug: 'business', description: 'Entrepreneurship, startups, and business strategies' },
];

// Sample articles
const articles = [
  {
    title: "How to Save Money for House Rent in Lagos Without Killing Yourself",
    content: `
# How to Save Money for House Rent in Lagos Without Killing Yourself

Living in Lagos comes with its unique challenges, and one of the biggest hurdles is the high cost of housing. With annual rent payments often required upfront, saving for rent can feel like an impossible task. However, with careful planning and strategic financial choices, you can build your rent fund without sacrificing your wellbeing.

## Start Early and Set Clear Goals

The key to successfully saving for rent in Lagos is to start as early as possible. Ideally, begin your saving journey at least 6-8 months before your rent is due.

1. Calculate exactly how much you need to save
2. Divide this amount by the number of months you have left
3. Set up a dedicated savings account specifically for rent

## Automate Your Savings

Don't rely on willpower alone. Set up automatic transfers to your rent savings account on payday. This "pay yourself first" approach ensures that saving happens before you can spend the money elsewhere.

## Cut Costs Without Cutting Joy

Look for areas where you can reduce expenses without making yourself miserable:

- Consider sharing transportation costs through carpooling
- Cook meals in batch to reduce food expenses
- Renegotiate bills like internet and cable
- Use pay-as-you-go services instead of subscriptions where possible

## Increase Your Income

In Lagos's bustling economy, there are always opportunities to earn extra income:

- Offer services in your area of expertise (writing, design, tutoring)
- Sell items you no longer need
- Take on weekend or evening freelance work
- Explore online gig economy platforms

## Choose the Right Savings Vehicle

Don't just let your rent money sit in a regular account. Consider high-yield savings options or money market funds that are still liquid but offer better returns than typical savings accounts.

## Track Your Progress

Use budgeting apps to monitor your savings progress. Celebrating small milestones can help maintain motivation throughout your saving journey.

## Consider Rent Loans as a Last Resort

Several banks and financial institutions in Nigeria now offer rent loans. While this should not be your first choice, it can be a backup option if your savings fall short. Just ensure you understand the interest rates and repayment terms fully.

## Conclusion

Saving for rent in Lagos requires discipline and planning, but it doesn't have to drain all joy from your life. By starting early, automating savings, finding creative ways to earn more, and tracking your progress, you can reach your rent goals while maintaining a balanced lifestyle.

Remember, the peace of mind that comes from having your rent sorted is worth the temporary sacrifices along the way.
    `,
    excerpt: "Learn practical strategies to save for expensive Lagos accommodation without sacrificing your quality of life.",
    slug: "save-money-house-rent-lagos",
    status: "published",
    category_id: "", // Will be filled in after categories are inserted
    featured_image: "https://images.unsplash.com/photo-1580048915913-4f8f5cb481c4?q=80&w=2340&auto=format&fit=crop",
    published_at: new Date().toISOString(),
    view_count: 2500
  },
  {
    title: "NYSC Survival Guide: From Camp to PPA Without Tears",
    content: `
# NYSC Survival Guide: From Camp to PPA Without Tears

The National Youth Service Corps (NYSC) year is a rite of passage for Nigerian graduates. While it can be one of the most memorable experiences of your life, it can also be challenging if you're unprepared. This comprehensive guide will help you navigate everything from camp registration to settling at your Place of Primary Assignment (PPA).

## Before Camp: Preparation is Key

### Documentation
Ensure you have all required documents:
- Original and photocopies of your credentials
- Student ID card
- Statement of result
- Birth certificate or age declaration
- National ID card
- Several passport photographs (white background)

### What to Pack
Camp essentials include:
- NYSC call-up letter
- Plain white T-shirts and shorts
- Comfortable underwear and socks (at least 7 pairs)
- Toiletries and personal hygiene products
- Medications and first aid supplies
- Bedsheets and light blanket
- Mosquito net and repellent
- Water bottle and food container
- Power bank and charging cables
- Small padlock for your box
- Comfortable shoes for parade and casual wear
- Cash (ATMs may not always be accessible)

## Camp Life: Surviving the Three Weeks

### Registration Process
- Arrive early on your first day to avoid long queues
- Follow instructions for documentation verification
- Be patient and maintain a positive attitude
- Keep your valuables secure at all times

### Daily Routine
- Morning drills start early (typically 5 AM)
- Participate actively in all activities
- Stay hydrated, especially during parade sessions
- Make friends across different platoons

### Staying Healthy
- Drink only clean water
- Eat at the official mammy market or kitchen
- Wash hands regularly
- Get adequate rest when possible

## Securing a Good PPA

This can make or break your service year. Strategies include:

- Network with camp officials and influential corps members
- Express interest in organizations aligned with your career goals
- Prepare a professional CV to present to potential employers
- Be proactive about seeking redeployment if initially posted to an undesirable location

## After Camp: Settling In

### Accommodation
- Consider safety, proximity to PPA, and affordability
- Verify neighborhood security before committing
- Negotiate rent terms (monthly payments if possible)
- Document all agreements with landlords

### Financial Management
- Create a budget based on your allawee (monthly stipend)
- Explore legitimate side hustles that don't interfere with primary duties
- Save a portion of your stipend monthly
- Open a bank account in your service state if necessary

### Professional Development
- Identify skill gaps and use the service year to address them
- Volunteer for community development projects
- Build meaningful relationships with colleagues and superiors
- Document your achievements for future reference

## Common Challenges and Solutions

### Delayed Payment of Allowances
- Maintain an emergency fund
- Ensure your bank details are correctly captured
- Follow up with appropriate authorities if issues persist

### Workplace Difficulties
- Maintain professionalism at all times
- Document instances of harassment or exploitation
- Report serious issues to your NYSC Local Government Inspector

### Homesickness
- Create a support network of fellow corps members
- Explore your service state during free time
- Maintain regular contact with family and friends
- Engage in community activities

## Conclusion

Your NYSC year can be transformative with the right preparation and attitude. Embrace the opportunities for personal growth, professional development, and cultural exchange. Years later, many Nigerians look back on their service year as challenging but ultimately rewarding. With this guide, you're well-equipped to make the most of your NYSC experience.
    `,
    excerpt: "Everything you need to know to survive and thrive during your National Youth Service year in Nigeria.",
    slug: "nysc-survival-guide",
    status: "published",
    category_id: "", // Will be filled in after categories are inserted
    featured_image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2340&auto=format&fit=crop",
    published_at: new Date().toISOString(),
    view_count: 4200
  },
  {
    title: "How to Start a Small Business with Just ₦50,000",
    content: `
# How to Start a Small Business with Just ₦50,000

Starting a business doesn't always require millions in capital. With creativity, strategic planning, and hard work, you can launch a profitable venture with as little as ₦50,000. This guide will show you how to maximize this modest investment to create a sustainable business in Nigeria's competitive marketplace.

## Choose the Right Business Model

With limited capital, focus on businesses with:
- Low startup costs
- Quick turnover
- Minimal inventory requirements
- Ability to scale gradually

### Viable Options Under ₦50,000

1. **Dropshipping/Reselling**
   - Partner with suppliers who can ship directly to customers
   - Focus on niche products with good margins
   - Leverage social media for free marketing
   - Initial costs: Product samples, basic branding, data for online activities

2. **Service-Based Businesses**
   - Offer services based on existing skills (writing, design, tutoring, etc.)
   - Start with minimal equipment and upgrade as you earn
   - Use freelance platforms to find initial clients
   - Initial costs: Basic tools/equipment, business cards, transportation

3. **Food Production/Processing**
   - Start with small batches of specialty items (snacks, pastries, spices)
   - Sell to friends, family, and local shops before expanding
   - Initial costs: Ingredients, packaging, cooking equipment

4. **Digital Products**
   - Create and sell ebooks, templates, or online courses
   - One-time creation cost, unlimited selling potential
   - Initial costs: Content creation tools, internet access

## Maximize Your ₦50,000 Investment

### Essential vs. Nice-to-Have Expenses

Critically evaluate every expense:

**Must-Have:**
- Basic inventory or service tools
- Simple packaging or presentation materials
- Transportation for business activities
- Communication (phone/data)

**Delay Until Profitable:**
- Fancy office space (work from home initially)
- Premium branding materials
- Advanced equipment (start with basics)
- Paid advertising (use free marketing channels first)

### Smart Budgeting Example

For a small baking business:
- ₦20,000: Initial ingredients and basic supplies
- ₦10,000: Packaging materials and labels
- ₦10,000: Transportation for deliveries
- ₦5,000: Data for social media marketing
- ₦5,000: Contingency fund

## Growth Strategies on a Tight Budget

### Reinvestment Plan
Commit to reinvesting a percentage of all early profits back into the business:
- First ₦20,000 profit: Reinvest 80%
- Next ₦30,000 profit: Reinvest 60%
- Next ₦50,000 profit: Reinvest 40%

### Free and Low-Cost Marketing

- **Social Media Marketing**
  - Create business profiles on relevant platforms
  - Post consistently with quality images and engaging content
  - Join community groups where potential customers gather
  
- **Word-of-Mouth**
  - Offer existing customers incentives for referrals
  - Provide exceptional service worth talking about
  - Create shareable packaging or materials

- **Partnerships**
  - Collaborate with complementary businesses
  - Join forces with other small entrepreneurs for shared marketing
  - Offer your products/services to established businesses

### Bookkeeping from Day One

Even with minimal capital, proper financial tracking is crucial:
- Separate business money from personal funds
- Record all expenses and income, no matter how small
- Analyze which products/services are most profitable
- Use free accounting apps designed for small businesses

## Common Pitfalls to Avoid

- **Premature Scaling**
  Trying to grow too quickly can deplete your limited resources

- **Underpricing**
  Many small businesses charge too little, making profitability impossible

- **Neglecting Legal Requirements**
  Even small businesses need to comply with basic registration requirements

- **Inventory Overstock**
  Tying up too much money in unsold products

- **Spreading Too Thin**
  Focus on doing one thing exceptionally well before diversifying

## Real Success Stories

*"I started making chin-chin with just ₦30,000 three years ago. Today my snack business employs 5 people and supplies to 20 shops across Lagos."* - Amaka, Lagos

*"With ₦45,000, I bought a used camera and started taking graduation photos at my university. Now I run a photography studio with two employees."* - Joseph, Enugu

## Conclusion

Starting a business with ₦50,000 requires creativity, discipline, and strategic thinking, but it's entirely possible. Focus on delivering exceptional value, managing your limited resources wisely, and reinvesting for sustainable growth. Remember, many of Nigeria's business giants started with even less—what matters most is starting and learning as you grow.
    `,
    excerpt: "Practical steps to launch a profitable small business in Nigeria with minimal capital investment.",
    slug: "start-small-business-50000-naira",
    status: "published",
    category_id: "", // Will be filled in after categories are inserted
    featured_image: "https://images.unsplash.com/photo-1664575602554-2087b04935d5?q=80&w=2340&auto=format&fit=crop",
    published_at: new Date().toISOString(),
    view_count: 3800
  },
  {
    title: "How to Apply for Canadian Study Visa from Nigeria",
    content: `
# How to Apply for Canadian Study Visa from Nigeria

Canada remains one of the most popular destinations for Nigerian students seeking quality education abroad. With its world-class universities, post-graduation work opportunities, and pathway to permanent residency, it's easy to understand why. This comprehensive guide walks you through the process of applying for a Canadian study visa from Nigeria.

## Pre-Application Preparation

### Researching Programs and Institutions

Before beginning your visa application, you need to:

1. **Identify suitable programs**
   - Consider your academic background, career goals, and budget
   - Research program requirements, duration, and accreditation
   - Check employment rates for graduates in your field

2. **Select potential institutions**
   - Look at university rankings for your subject area
   - Consider location, climate, and cost of living
   - Research scholarship opportunities for international students

3. **Verify that the institution is a Designated Learning Institution (DLI)**
   - Only DLIs can host international students
   - Each DLI has a unique number you'll need for your application

### Financial Planning

Canadian visa officers need to see that you can finance your education and living expenses:

1. **Calculate total costs**
   - Tuition fees (typically CAD 20,000 - 30,000 per year for international students)
   - Living expenses (approximately CAD 10,000 - 15,000 per year)
   - Health insurance (varies by province)
   - Travel costs and emergency funds

2. **Identify funding sources**
   - Personal or family savings
   - Scholarships (institutional, government, or private)
   - Educational loans
   - Sponsorships

3. **Prepare financial documentation**
   - Bank statements (typically showing funds for at least one year of study)
   - Loan approval letters
   - Scholarship award letters
   - Affidavits of support from sponsors

## Application Process

### Secure Admission First

1. **Apply to Canadian institutions**
   - Submit applications according to university deadlines (typically 6-12 months before program start)
   - Provide transcripts, recommendation letters, statement of purpose, and English proficiency test results
   - Pay application fees (usually CAD 100-250 per institution)

2. **Receive and accept an offer of admission**
   - You'll need the acceptance letter for your visa application

### Study Permit Application

1. **Create a MyCIC account**
   - Register on the Immigration, Refugees and Citizenship Canada (IRCC) website

2. **Gather required documents**
   - Valid Nigerian passport
   - Acceptance letter from a DLI
   - Proof of financial support
   - Passport-sized photographs (meeting Canadian specifications)
   - Immigration Medical Examination (IME) results
   - English or French language proficiency test results
   - Statement of purpose/study plan
   - Proof of ties to Nigeria (property, employment, family)

3. **Complete the application forms**
   - Application for Study Permit (IMM 1294)
   - Family Information Form (IMM 5645)
   - Statutory Declaration of Common-law Union (if applicable)
   - Use of a Representative Form (if using an agent)

4. **Pay the processing fee**
   - Study permit application fee (CAD 150)
   - Biometrics fee (CAD 85)

5. **Submit biometrics**
   - Visit the designated Visa Application Centre (VAC) in Lagos or Abuja
   - Provide fingerprints and photo

### After Submission

1. **Track your application**
   - Use the online portal to monitor progress

2. **Respond to requests for additional information**
   - IRCC might request additional documents or an interview

3. **Receive the decision**
   - Processing times vary but typically take 8-12 weeks
   - If approved, you'll receive a Port of Entry (POE) Letter of Introduction

## Tips for Strengthening Your Application

### Demonstrating Ties to Nigeria

Visa officers need to be convinced you'll return to Nigeria after your studies:

- Employment letter indicating leave of absence or intent to return
- Property ownership documents
- Family responsibilities documentation
- Business ownership proof
- Career progression plan for returning to Nigeria

### Preparing for the Visa Interview

If selected for an interview:

- Review your application thoroughly
- Be prepared to discuss your study plans in detail
- Explain how your Canadian education fits into your long-term career goals
- Be clear about your plan to return to Nigeria
- Dress professionally and arrive early

### Common Reasons for Refusal

Avoid these common pitfalls:

- Insufficient funds or unclear source of funds
- Weak ties to Nigeria/high immigration risk
- Inconsistent study plans
- Poor academic performance history
- Incomplete or fraudulent documentation

## Post-Approval Steps

### Before Departure

1. **Book flights**
   - Aim to arrive 2-3 weeks before classes begin

2. **Secure accommodation**
   - On-campus housing (apply early as spaces fill quickly)
   - Off-campus alternatives

3. **Arrange airport pickup**
   - Many universities offer this service for new international students

4. **Purchase health insurance**
   - Required for all international students

### At the Canadian Port of Entry

1. **Present required documents**
   - Passport
   - POE Letter of Introduction
   - Proof of funds
   - Acceptance letter
   - Accommodation details

2. **Answer immigration officer questions truthfully**

3. **Receive your study permit**
   - Check all details for accuracy before leaving

## Conclusion

Applying for a Canadian study visa requires careful planning, thorough documentation, and patience. Start the process early—ideally 12 months before your intended program start date—to allow for unexpected delays. With proper preparation and attention to detail, you can increase your chances of a successful application and embark on your educational journey in Canada.

Remember that immigration rules and requirements can change. Always verify the latest information from the official Canadian immigration website or consult with a certified immigration consultant.
    `,
    excerpt: "A step-by-step guide to securing a Canadian study visa for Nigerian students looking to study abroad.",
    slug: "apply-canadian-study-visa-nigeria",
    status: "published",
    category_id: "", // Will be filled in after categories are inserted
    featured_image: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?q=80&w=2334&auto=format&fit=crop",
    published_at: new Date().toISOString(),
    view_count: 5100
  },
  {
    title: "Best Affordable Android Phones Under ₦100,000 in 2023",
    content: `
# Best Affordable Android Phones Under ₦100,000 in 2023

The smartphone market in Nigeria has grown increasingly competitive, with numerous options available even in the budget segment. If you're looking for a capable Android smartphone that won't break the bank, you're in luck. This guide explores the best Android phones available for under ₦100,000 in the Nigerian market in 2023.

## What to Expect in This Price Range

Before we dive into specific models, here's what you can generally expect from smartphones in the sub-₦100,000 category:

- **Processors**: MediaTek Helio or entry-level Qualcomm Snapdragon chipsets
- **RAM**: 3GB to 6GB
- **Storage**: 32GB to 128GB (often expandable)
- **Display**: 6-6.7 inch HD+ or Full HD screens
- **Camera**: Decent primary cameras, with additional sensors of varying quality
- **Battery**: Typically 4,000-5,000mAh
- **Software**: Android 11 or 12, sometimes with limited update support

While these phones won't compete with flagships costing five times more, they offer remarkable value and can handle everyday tasks smoothly.

## Top Android Phones Under ₦100,000

### 1. Xiaomi Redmi 10C

**Price Range**: ₦75,000 - ₦85,000

**Key Specifications**:
- 6.71-inch HD+ display
- Qualcomm Snapdragon 680 processor
- 4GB RAM with 64GB storage (expandable to 1TB)
- 50MP primary camera + depth sensor
- 5,000mAh battery with 18W fast charging
- Android 11 with MIUI 13

**Pros**:
- Excellent battery life
- Decent performance for everyday tasks
- Good build quality
- Reliable main camera in good lighting

**Cons**:
- Display limited to HD+ resolution
- Camera struggles in low light
- MIUI can be ad-heavy

### 2. Tecno Camon 19

**Price Range**: ₦90,000 - ₦99,000

**Key Specifications**:
- 6.8-inch Full HD+ display
- MediaTek Helio G85 processor
- 4GB RAM with 128GB storage
- 64MP primary camera + 2MP bokeh lens
- 5,000mAh battery
- Android 12 with HiOS 8.6

**Pros**:
- Attractive design with slim bezels
- Bright, vibrant display
- Generous storage
- Good photography capabilities for social media
- Solid battery life

**Cons**:
- Software experience includes bloatware
- Limited update support
- Average performance for gaming

### 3. Infinix Note 12

**Price Range**: ₦85,000 - ₦95,000

**Key Specifications**:
- 6.7-inch AMOLED Full HD+ display
- MediaTek Helio G88 processor
- 4GB/6GB RAM with 64GB/128GB storage
- 50MP primary camera + 2MP depth sensor + AI lens
- 5,000mAh battery with 33W fast charging
- Android 12 with XOS 10.6

**Pros**:
- Vibrant AMOLED display (rare at this price point)
- Fast charging capability
- Good multitasking with 6GB RAM variant
- Dedicated microSD slot + dual SIM
- Decent stereo speakers

**Cons**:
- Plastic build
- Camera performance inconsistent
- Heavy software skin with bloatware

### 4. Samsung Galaxy A13

**Price Range**: ₦87,000 - ₦97,000

**Key Specifications**:
- 6.6-inch Full HD+ display
- Exynos 850 processor
- 4GB RAM with 64GB/128GB storage
- Quad camera setup with 50MP primary lens
- 5,000mAh battery with 15W charging
- Android 12 with One UI 4.1

**Pros**:
- Samsung ecosystem and reliability
- Decent camera system
- Clean One UI experience
- Better update support than competitors
- Good battery life

**Cons**:
- Slower charging than competitors
- Not the most powerful processor at this price
- Average low-light photography

### 5. Nokia G21

**Price Range**: ₦75,000 - ₦85,000

**Key Specifications**:
- 6.5-inch HD+ display with 90Hz refresh rate
- Unisoc T606 processor
- 4GB RAM with 64GB/128GB storage
- 50MP primary camera + macro + depth sensors
- 5,050mAh battery with 18W charging
- Near-stock Android 12

**Pros**:
- 90Hz refresh rate for smoother scrolling
- Close to stock Android experience with minimal bloatware
- Promised 2 years of OS updates
- Excellent battery life (up to 3 days with moderate use)
- Durable build quality

**Cons**:
- Less powerful processor than some rivals
- Display limited to HD+ resolution
- Charging speed could be better

## Features to Prioritize in Budget Phones

When shopping in this price range, focus on these aspects:

### Battery Life

A phone with a 5,000mAh or larger battery will typically last a full day even with heavy use. Fast charging (18W+) is also valuable for quick top-ups.

### Storage

Opt for at least 64GB of storage, with 128GB being ideal. Ensure the phone has a dedicated microSD slot for expansion.

### Software Experience

Phones with cleaner Android implementations (like Nokia or Motorola) might offer a smoother experience than heavily customized UIs, though some custom interfaces offer useful additional features.

### Display Quality

If you consume a lot of media, prioritize a Full HD+ display. A higher refresh rate (90Hz+) provides a smoother experience when scrolling and using apps.

### Build Quality

Look for reinforced corners and Gorilla Glass protection if your budget allows, especially if you tend to use your phone without a case.

## Where to Buy

For the best prices and authentic products, consider:

- Authorized retail stores (Slot, 3C Hub)
- Official brand stores (e.g., Samsung Experience Stores)
- Reputable online retailers (Jumia, Konga)

Always check warranty information and verify that you're getting the Nigerian/African version of the phone, which typically includes better support for local networks.

## Conclusion

The sub-₦100,000 Android phone market in Nigeria offers impressive value in 2023. The Xiaomi Redmi 10C offers the best overall package for most users, while the Infinix Note 12 stands out for its AMOLED display. The Samsung Galaxy A13 provides the most reliable software experience, and the Nokia G21 offers exceptional battery life.

Consider your priorities—whether camera quality, battery life, display, or performance—and choose accordingly. Any of these phones will serve you well for everyday tasks without stretching your budget.
    `,
    excerpt: "Find the perfect balance of features and affordability with these top-rated Android smartphones under ₦100,000 in Nigeria.",
    slug: "affordable-android-phones-under-100000",
    status: "published",
    category_id: "", // Will be filled in after categories are inserted
    featured_image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=2340&auto=format&fit=crop",
    published_at: new Date().toISOString(),
    view_count: 3500
  },
  {
    title: "How to Make the Perfect Jollof Rice That Will Shame Ghanaians",
    content: `
# How to Make the Perfect Jollof Rice That Will Shame Ghanaians

In the friendly but fierce culinary rivalry between Nigeria and Ghana, jollof rice stands as the most contested dish. Nigerian jollof rice, with its distinctive smoky flavor and perfect texture, has earned admirers worldwide. This comprehensive guide will help you create authentic Nigerian jollof rice that's so delicious, even Ghanaians might (secretly) prefer it.

## The Perfect Ingredients

### For the Base (Serves 6-8)

- 4 cups long-grain parboiled rice
- 8-10 large ripe tomatoes
- 2 red bell peppers
- 3 medium-sized onions
- 2-3 scotch bonnet peppers (adjust to your heat preference)
- 1/4 cup vegetable oil
- 2 tablespoons tomato paste
- 3-4 cups chicken or vegetable stock
- 2 bay leaves
- 1 teaspoon dried thyme
- 1 teaspoon curry powder
- 1 teaspoon white pepper
- 2-3 cloves of garlic
- 1-inch piece of ginger
- 3 tablespoons butter (optional, for extra richness)
- Salt to taste
- 1 tablespoon Nigerian curry powder (different from Indian curry)

### For Party Jollof Enhancement

- 1 tablespoon smoked paprika (for that smoky flavor)
- 2-3 tablespoons butter
- 1 chicken or beef bouillon cube, crushed

## Preparation Steps

### 1. Preparing the Rice

The foundation of great jollof starts with properly prepared rice:

1. **Wash thoroughly**: Rinse the rice under cold water until the water runs clear, removing excess starch that could make your jollof sticky.

2. **Par-boil option**: For authentic party jollof, partially cook the rice in boiling water for 5-7 minutes, then rinse with cold water and drain. This ensures each grain cooks perfectly in the sauce.

3. **Alternative method**: If you're short on time, simply wash and drain the uncooked rice well.

### 2. Creating the Perfect Stew Base

The distinctive flavor of Nigerian jollof comes from its rich, flavorful base:

1. **Blend the vegetables**: Combine tomatoes, red bell peppers, 2 onions, scotch bonnet peppers, garlic, and ginger in a blender until smooth.

2. **Reduce the mixture**: Pour the blended mixture into a large pot and cook on medium heat for 15-20 minutes, allowing excess water to evaporate. This concentration of flavors is critical.

3. **Make the sauce**: In a separate large, heavy-bottomed pot, heat vegetable oil and sauté the remaining finely diced onion until translucent. Add tomato paste and fry for 2-3 minutes.

4. **Combine and season**: Add the reduced tomato mixture to the oil and tomato paste. Stir in thyme, curry powder, white pepper, bay leaves, and salt. Allow to simmer for 10-15 minutes until the oil slightly separates from the sauce.

### 3. The Rice-to-Sauce Magic

This stage determines the texture and flavor distribution of your jollof:

1. **Add the stock**: Pour in the chicken or vegetable stock and bring to a gentle boil. Taste and adjust seasoning - the liquid should be slightly saltier than you'd prefer the finished rice.

2. **Incorporate the rice**: Add the washed (or par-boiled) rice to the sauce, ensuring it's completely covered by the liquid. If using uncooked rice, the liquid should be about 1/2 inch above the rice.

3. **Perfect the cooking method**: Cover tightly with aluminum foil, then place the pot lid on. This dual-covering method traps steam and flavors, essential for authentic jollof.

4. **Cook to perfection**: Reduce heat to low and allow to cook for 30-35 minutes without stirring.

### 4. The Final Touch - Creating "Party Jollof"

The signature smoky flavor that distinguishes Nigerian jollof comes in this stage:

1. **Check doneness**: After 30 minutes, check if rice is cooked. Rice grains should be tender but separate.

2. **Create the burned bottom**: If you're brave (and traditional), increase heat for the last 3-5 minutes to create a slightly burned bottom layer called "bottom pot" - considered a delicacy by many Nigerians.

3. **Add butter**: Turn off the heat and dot the surface with butter pieces, which will melt into the hot rice.

4. **Rest and fluff**: Allow the rice to rest, covered, for 10 minutes. Then remove the foil and fluff gently with a fork, incorporating the melted butter.

## Serving Suggestions

### Traditional Accompaniments

Nigerian jollof is typically served with:

- Fried plantains (dodo)
- Grilled or fried chicken
- Moin moin (steamed bean pudding)
- Coleslaw or fresh salad
- Fried fish
- Nigerian beef or chicken stew

### Presentation Tips

For a truly impressive presentation:

1. Use a ring mold to shape the rice into perfect mounds on each plate
2. Garnish with thinly sliced fresh tomatoes and cucumbers
3. Sprinkle with finely chopped fresh parsley or cilantro
4. Serve with a wedge of lemon or lime for guests to squeeze over their portion

## Common Mistakes to Avoid

- **Too much water**: Soggy jollof is a cardinal sin - measure your liquid carefully
- **Insufficient seasoning**: Be generous with seasonings for that robust flavor
- **Stirring too frequently**: This breaks the rice grains and releases starch
- **Skipping the reduction step**: The concentrated tomato mixture is crucial for flavor depth
- **Using the wrong rice**: Long-grain parboiled rice gives the best results; avoid basmati or short-grain varieties for authentic jollof

## The Ghana vs. Nigeria Jollof Debate

While this remains a friendly rivalry, some key differences in the Nigerian approach include:

- **More complex seasoning**: Nigerian jollof typically incorporates more spices
- **The smoky flavor**: The coveted "party jollof" taste comes from that slight char
- **Rice variety**: Nigerians typically use long-grain rice, while some Ghanaian versions use local rice varieties
- **Color intensity**: Nigerian jollof tends to have a deeper red color from concentrated tomatoes

## Conclusion

Perfecting Nigerian jollof rice takes practice, but following these detailed steps will get you close to the authentic experience that has made this dish world-famous. Remember, great jollof isn't rushed - the patient cook is rewarded with the complex flavors and perfect texture that define this beloved Nigerian culinary treasure.

When served at your next gathering, don't be surprised if your Nigerian jollof rice becomes the talking point - and perhaps even converts some Ghanaian jollof loyalists. Just be gracious in your culinary victory!
    `,
    excerpt: "Master the art of cooking authentic Nigerian jollof rice with this detailed recipe and cooking techniques.",
    slug: "perfect-jollof-rice-recipe",
    status: "published",
    category_id: "", // Will be filled in after categories are inserted
    featured_image: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?q=80&w=2340&auto=format&fit=crop",
    published_at: new Date().toISOString(),
    view_count: 6200
  },
];

// Function to add the sample data
export async function addSampleData() {
  try {
    console.log('Starting to add sample data...');
    
    // First, clear any existing data
    console.log('Checking for existing categories...');
    const { data: existingCategories } = await supabase
      .from('categories')
      .select('id, name');
      
    if (existingCategories && existingCategories.length > 0) {
      console.log(`Found ${existingCategories.length} existing categories. No need to add sample data.`);
      return { success: false, message: 'Sample data already exists' };
    }
    
    console.log('Adding categories...');
    // Insert categories first
    const { data: categoryData, error: categoryError } = await supabase
      .from('categories')
      .insert(categories)
      .select();
      
    if (categoryError) {
      console.error('Error inserting categories:', categoryError);
      return { success: false, error: categoryError };
    }
    
    console.log(`Successfully added ${categoryData.length} categories`);
    
    // Create a map of category names to their IDs
    const categoryMap = {};
    categoryData.forEach(category => {
      categoryMap[category.name] = category.id;
    });
    
    // Assign category IDs to articles
    const articlesWithCategories = articles.map((article, index) => {
      const categoryName = Object.keys(categoryMap)[index % Object.keys(categoryMap).length];
      return {
        ...article,
        category_id: categoryMap[categoryName]
      };
    });
    
    console.log('Adding articles...');
    // Insert articles
    const { data: articleData, error: articleError } = await supabase
      .from('articles')
      .insert(articlesWithCategories)
      .select();
      
    if (articleError) {
      console.error('Error inserting articles:', articleError);
      return { success: false, error: articleError };
    }
    
    console.log(`Successfully added ${articleData.length} articles`);
    
    return { 
      success: true, 
      categories: categoryData.length,
      articles: articleData.length 
    };
  } catch (error) {
    console.error('Error in addSampleData function:', error);
    return { success: false, error };
  }
}

// Export a function to check if sample data already exists
export async function checkSampleData() {
  const { data } = await supabase
    .from('categories')
    .select('id')
    .limit(1);
    
  return data && data.length > 0;
}
