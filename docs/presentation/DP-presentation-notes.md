Same principle. New reality.
- How I came into experimenting with AI is a story in itself
- However, quickly came to saw it’s potential and flaws
- Ultimately, the ideas and approaches are very similar
- But need to be recontexualized
- What works as layered human context, doesn’t always work optimally for AI

The 50 First Dates Problem
- Every session, the AI agent starts fresh
    - No memory of yesterday's decisions
    - No natural awareness of the token relationships you established last week
    - LLMs know tokens exist as an idea, but no idea how to apply them 
- You need to perpetually onboard a brilliant collaborator who forgets everything overnight.
    - That also gets VERY expensive
- If AI agents are going to be genuine collaborators — not just ephemeral code generators — the system itself needs to be built for machine consumption.
    - Not retrofitted
    - Built from the ground up around constructs optimal for machines
    - These models also need to be understood by humans
- To make matters more complicated, even IF you make the learnings stick, there’s a context cap
- The industry is trying to get around this with 1 million token context caps and memory, but these are session-oriented solution — not institutionally sustainable
The Thesis
- I made three attempts about building a design system, and failed three times.
    - I used everything method I had previously learned
    - I experimented with every best practice I’d developed
- On my forth attempt, I needed a new approach
- I didn’t need to build my system with AI; I needed to build my system for AI
- I identified these three learnings from those failures

The Framing
- AI Agents had three essential needs
    - An abundance of understanding that humans take for granted 
    - To have their work reviewed
    - A way to recall what they already accomplished
- At Venmo, I invested heavily in onboarding; but minimized documentation because it served minimal value — no one ever read it.
- In a complete 180,  the key to making DesignerPunk possible was documentation 
    - Documentation is as foundational as tokens and components
    - It’s also undeniably be more essential
    - What differentiates humans from other animals isn’t our thumbs; it’s our ability to on generational information.
        - I needed to develop the same construct for AI

The Architecture
- This is my solution: DesignerPunk – an ecosystem of three complex systems that allow AI agents to build, maintain, and (eventually) create with a design system.
- DesignerPunk takes a traditional layering of tokens, components, and documentation and enhances it with a combination of inferable infrastructure and collaborative systems.
- Rosetta — a tokens validation and generation system that acts like a fully integrated Token Studio
- Stemma – the component system that manages native components through universal contracts to coordinate their development across Web, iOS, and Android
- Civitas – the governance and documentation layer that coordinates spec-driven development

Inferable infrastructure
- Math is the foundation for all machines, so leveraging naming conventions that leaned into mathematical logic would provide the intuitive understanding and scale necessary an adaptive token system
    - Based on REMs where you define a base value, and all values are relative to that base value. Infinitely scalable
    - Even my governance agent can guess at token names and their value without having to look them up
- These primitive values are supplemented by a semantic layer whose names are based on the Nathan Curtis model for intent-driven naming that allow tokens to be more self-documenting for AI to interpret and naturally align with prompt requests
    - “Tighten the spacing”
    - “Make the background color subtle” 
- I built a pipeline that translates all these tokens to their native platform language
    - I noticed in earlier attempts, agents would tend to hallucinate token values to the platform format 
        - Casing and units of measure were consistent inconsistencies
        - Made sense since it was surrounded by native code
        - Rather than fight this instinct, I embraced it
- I also wasn’t enough to an Agent to query an answer
    - It needed context leverage the answer
        - How it was intended to be used
        - What platform(s) it applied to
        - The Application MCP extracts this context into a YAML schema to cost-effectively communicate this context to agents
        - You’re welcome to play “Stump My Agent” during the Q&A

Collaboration systems
- Speaking of the Application MCP…
- I needed a method of communicating behaviors across platforms agnostically
    - Systems like IBM’s Carbon use contracts to accomplish this
    - 10 categories of contracts contain over 200 different contracts for primitive and semantic components
    - Govern everything from hover interactions to accessibility
    - Provides clear direction for AI agents with flexibility for platform-specific implementation 
- When I initially created documentation, I’d manually feed it into the chat at the start of each session.
    - Eventually, moving to Kiro automated this process
    - As the documentation layer grew, the context load grew to where I couldn’t even execute tasks
    - I built an Documentation MCP to manage the content and facilitate the agent’s ability to call what it needed, when it needed it
        - This allowed:
            - Reduce the context burden
            - Documentation to continue to grow
            - Also resulted in significant token savings as agents were no longer loading context it didn’t need for a given task
- AI Agents are known for being both aggressive actors and confirmation echo chambers to appease their humans
    - I designed documentation and practices for soliciting honest feedback and alternative perspectives that I hadn’t considered
    - I also implemented practices like design-outlines (kinda like a PRD) in our spec-driven development process to capture the vision a spec to capture free-form ideas before moving to specs
        - Also ballot measures to allow agents to self-author and edit steering documentation, but not without explicit approval from a human
            - This helps to facilitate turning lessons learned into action more rapidly but with review

Agent design + experience
- This has been the most fun part of the work so far!
- I moved from an IDE to a CLI just to leverage custom agents
- The Doc MCP was the first stage of resolving the context cap problem
- Custom agents was the second
- The goal being to distribute the load across systems and knowledge bases
    - An agent for Rosetta, Ada
    - An agent for Stemma, Lina
    - An agent for Civitas, Thurgood
- Pre-MCP the general agent had a 65% context load
    - Post-MCP, context load was 35%
    - Initial token load cost reduced 87%
- After moving to the CLI and developing the agents around intent, the context load for each agent was between 3 and 8%
- Fun fact: I have an entirely separate presentation on how this came about
- As I’ve explored expanding the scope of work, I added four additional agents
    - Leonardo and Stacy for managing the product system
    - Sarah, Kenya, and Data for implementation
        - Kenya and Data provide additional value by reviewing iOS and Android implementations of components

The Result
- Putting in perspective numbers wise, this is what I’ve created in this 4th design system iteration
- Beginning this iteration in October last year
- It’s a healthy, stable system that has room to improve and infrastructure to expand or reduce.

The Trajectory
- I’ve achieved what I originally sought to accomplish: a sustainable design system from scratch using AI 
- Meets my standards of sustainability and accessibility
- Making it available for anyone and everyone to make the industry more competitive, raise the floor for all
- Expanded the scope of the work several times 
    - Inclusion of A2UI spec
    - Alignment with DTGC spec
    - Integration with Console MCP
    - Current phase is using AI to build with the system and execute on design
    - Aspiring to bring the Jem Gold-AirBnb demo to the daily norm

Final Slide
- Something I’ve learned over the course of development of this work I’ve:
    - Developed a deeper understanding and confidence in the technical layers of systems
    - How to work and build with AI sustainably
- As I explore applying systems with AI, I should be aiming for is predictable outcomes
    - Teaching it to build intelligently build with the system 
    - Finding opportunities to go outside it deliberately.
    - Deliberate choices are what gives the system create character.
- Building with the system is what AI can do. Human value is in the discernment of knowing when and how to deviate — and that, to me, is the taste and craft our industry is aiming for.
- Thank you for listening
- Happy to take questions or demo
- Also, you should know, this presentation is the first project I’ve built using DesignerPunk.