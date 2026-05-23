const bank = {
  "Software Developer": {
    Technical: {
      Beginner: `1. What is object-oriented programming?
2. What is the difference between an array and a linked list?
3. What is a function and why is it used?
4. What is the difference between frontend and backend?
5. Explain what debugging means.`,
      Intermediate: `1. Explain time and space complexity with an example.
2. What is the difference between REST API and GraphQL?
3. How do you handle errors in an application?
4. Explain authentication and authorization.
5. Describe how you would design a simple CRUD application.`,
      Advanced: `1. How would you design a scalable backend system?
2. Explain caching and where you would use it.
3. How would you handle concurrency in an application?
4. Explain microservices vs monolithic architecture.
5. How would you optimize a slow API?`,
    },
    HR: {
      Beginner: `1. Tell me about yourself.
2. Why do you want to become a Software Developer?
3. What are your strengths?
4. What is one weakness you are improving?
5. Describe one project you built.`,
      Intermediate: `1. Describe a coding challenge you solved.
2. How do you handle project deadlines?
3. Tell me about a time you worked in a team.
4. How do you keep learning new technologies?
5. Why should we hire you?`,
      Advanced: `1. Describe a time you took ownership of a project.
2. How do you handle conflicting technical opinions?
3. How would you mentor a junior developer?
4. Tell me about a failure and what you learned.
5. How do you balance speed and code quality?`,
    },
    Behavioral: {
      Beginner: `1. Tell me about a time you learned something new.
2. Describe a time you asked for help.
3. Tell me about a mistake you made.
4. How do you manage your tasks?
5. Describe a time you worked with others.`,
      Intermediate: `1. Tell me about a time you handled pressure.
2. Describe a team conflict and how you solved it.
3. Tell me about unclear requirements you handled.
4. Describe a time you improved your work process.
5. Tell me about difficult feedback you received.`,
      Advanced: `1. Tell me about a high-impact decision you made.
2. Describe a time you challenged a decision respectfully.
3. Tell me about taking responsibility for a failure.
4. Describe managing multiple priorities.
5. Tell me about influencing a team outcome.`,
    },
  },

  "Frontend Developer": {
    Technical: {
      Beginner: `1. What are HTML, CSS, and JavaScript?
2. What is React used for?
3. What are props in React?
4. How do you make a webpage responsive?
5. What is the difference between id and class in CSS?`,
      Intermediate: `1. Explain the virtual DOM in React.
2. What are React hooks?
3. How do you manage state in a React app?
4. How would you optimize a slow webpage?
5. What is the difference between controlled and uncontrolled components?`,
      Advanced: `1. Explain code splitting and lazy loading in React.
2. How would you improve Core Web Vitals?
3. Explain memoization in React.
4. How do you handle large-scale frontend architecture?
5. Explain server-side rendering vs client-side rendering.`,
    },
    HR: {
      Beginner: `1. Tell me about yourself as a Frontend Developer.
2. Why are you interested in frontend development?
3. Describe a UI project you built.
4. How do you handle feedback on design?
5. What are your strengths?`,
      Intermediate: `1. Describe a challenging UI bug you fixed.
2. How do you work with designers?
3. How do you handle deadlines?
4. Tell me about a time you improved user experience.
5. How do you keep learning frontend tools?`,
      Advanced: `1. How would you lead frontend decisions in a team?
2. Describe handling conflicting product and design feedback.
3. How do you balance performance and design?
4. How would you mentor a junior frontend developer?
5. What makes a frontend product successful?`,
    },
    Behavioral: {
      Beginner: `1. Tell me about a time you learned a new tool.
2. Describe a time you asked for help.
3. Tell me about a mistake in a UI project.
4. Describe teamwork in a project.
5. How do you organize tasks?`,
      Intermediate: `1. Tell me about unclear UI requirements you handled.
2. Describe a conflict with a teammate.
3. Tell me about improving a design based on feedback.
4. Describe a stressful deadline.
5. Tell me about difficult feedback on your work.`,
      Advanced: `1. Describe a time you influenced a product decision.
2. Tell me about taking ownership of a failed feature.
3. Describe handling multiple stakeholders.
4. Tell me about challenging a design decision respectfully.
5. Describe a high-impact frontend decision you made.`,
    },
  },

  "Android Developer": {
    Technical: {
      Beginner: `1. What is Android Studio?
2. What is an Activity in Android?
3. What is the difference between XML UI and Jetpack Compose?
4. What is an APK?
5. What is the purpose of permissions in Android?`,
      Intermediate: `1. Explain the Android Activity lifecycle.
2. What is ViewModel in Android?
3. How does Room Database work?
4. What is MVVM architecture?
5. Explain State in Jetpack Compose.`,
      Advanced: `1. How would you design an offline-first Android app?
2. Explain dependency injection in Android.
3. How do you optimize app performance?
4. How would you handle background tasks?
5. Explain clean architecture in Android.`,
    },
    HR: {
      Beginner: `1. Tell me about yourself as an Android Developer.
2. Why did you choose Android development?
3. Describe an Android app you built.
4. What tools do you use for Android development?
5. What are your strengths?`,
      Intermediate: `1. Describe a bug you faced in Android Studio.
2. How do you test an Android app?
3. How do you improve mobile user experience?
4. Tell me about a project deadline you handled.
5. How do you learn new Android concepts?`,
      Advanced: `1. How would you lead an Android app project?
2. How do you balance UI, performance, and architecture?
3. Describe a complex app feature you designed.
4. How would you mentor a beginner Android developer?
5. How do you handle app scalability?`,
    },
    Behavioral: {
      Beginner: `1. Tell me about learning a new Android concept.
2. Describe a time you fixed a small mistake.
3. Tell me about teamwork in a project.
4. How do you manage your study and project work?
5. Describe a time you asked for help.`,
      Intermediate: `1. Tell me about handling an emulator or build issue.
2. Describe a conflict during project work.
3. Tell me about working under a deadline.
4. Describe improving your app after feedback.
5. Tell me about solving a confusing technical issue.`,
      Advanced: `1. Describe taking ownership of an app feature.
2. Tell me about a major technical decision you made.
3. How do you handle conflicting feedback?
4. Describe managing multiple app modules.
5. Tell me about learning from a project failure.`,
    },
  },

  "Data Analyst": {
    Technical: {
      Beginner: `1. What is data analysis?
2. What is the difference between rows and columns?
3. What is data cleaning?
4. What is SQL used for?
5. What is a chart or dashboard?`,
      Intermediate: `1. Explain joins in SQL.
2. What is the difference between mean, median, and mode?
3. How do you handle missing data?
4. What is data visualization?
5. How would you find trends in sales data?`,
      Advanced: `1. How would you design a KPI dashboard?
2. Explain correlation vs causation.
3. How would you analyze user churn?
4. Explain A/B testing from a data perspective.
5. How do you communicate insights to business teams?`,
    },
    HR: {
      Beginner: `1. Tell me about yourself as a Data Analyst.
2. Why are you interested in data analysis?
3. What tools are you learning?
4. Describe a data-related project.
5. What are your strengths?`,
      Intermediate: `1. How do you explain insights to non-technical people?
2. Describe a time you worked with messy data.
3. How do you handle deadlines?
4. Tell me about a project where you used data.
5. Why should we hire you?`,
      Advanced: `1. How would you influence business decisions using data?
2. Describe a time your analysis changed an outcome.
3. How do you handle stakeholder expectations?
4. How would you prioritize analysis requests?
5. What makes a good data analyst?`,
    },
    Behavioral: {
      Beginner: `1. Tell me about a time you learned a new tool.
2. Describe a time you made a mistake.
3. Tell me about working in a team.
4. How do you organize your work?
5. Describe a time you asked for feedback.`,
      Intermediate: `1. Tell me about handling incomplete information.
2. Describe solving a problem using data.
3. Tell me about a stressful deadline.
4. Describe a conflict in teamwork.
5. Tell me about explaining something complex simply.`,
      Advanced: `1. Describe influencing a decision using analysis.
2. Tell me about handling conflicting stakeholder needs.
3. Describe taking ownership of an important report.
4. Tell me about challenging an assumption with data.
5. Describe a high-impact insight you found.`,
    },
  },

  "Product Analyst": {
    Technical: {
      Beginner: `1. What does a Product Analyst do?
2. What is user retention?
3. What is conversion rate?
4. What is churn?
5. Why are product metrics important?`,
      Intermediate: `1. Explain A/B testing.
2. How would you analyze a drop in active users?
3. What metrics would you track for a mobile app?
4. How do funnels help in product analysis?
5. How would you measure feature success?`,
      Advanced: `1. How would you design an experiment for a new feature?
2. Explain cohort analysis.
3. How would you identify product-market fit using data?
4. How do you balance business goals and user experience?
5. How would you analyze retention for a subscription product?`,
    },
    HR: {
      Beginner: `1. Tell me about yourself as a Product Analyst.
2. Why are you interested in product analytics?
3. Describe a product you like.
4. What are your strengths?
5. Why should we hire you?`,
      Intermediate: `1. Describe a product you would improve.
2. How do you work with developers and designers?
3. How do you handle unclear requirements?
4. Tell me about using data for a decision.
5. How do you learn about users?`,
      Advanced: `1. How would you influence a product roadmap?
2. Describe handling disagreement between product and engineering.
3. How do you prioritize product problems?
4. Tell me about balancing user needs and business goals.
5. What makes a product successful?`,
    },
    Behavioral: {
      Beginner: `1. Tell me about learning a new product.
2. Describe working in a team.
3. Tell me about a time you gave feedback.
4. How do you solve problems?
5. Describe a mistake you learned from.`,
      Intermediate: `1. Tell me about handling unclear product requirements.
2. Describe a time you used data to support your point.
3. Tell me about managing deadlines.
4. Describe a conflict in a team.
5. Tell me about improving something based on feedback.`,
      Advanced: `1. Describe influencing a product decision.
2. Tell me about challenging an assumption.
3. Describe handling multiple stakeholders.
4. Tell me about taking ownership of a product problem.
5. Describe a time you balanced user and business needs.`,
    },
  },

  "HR Interview": {
    HR: {
      Beginner: `1. Tell me about yourself.
2. Why should we hire you?
3. What are your strengths?
4. What is one weakness you are improving?
5. What are your career goals?`,
      Intermediate: `1. Describe a time you worked in a team.
2. Tell me about a challenge you faced.
3. How do you handle pressure?
4. Why do you want this company?
5. Where do you see yourself in 5 years?`,
      Advanced: `1. Describe a time you handled conflict professionally.
2. Tell me about a failure and what you learned.
3. How do you handle criticism?
4. How do you prioritize when everything feels urgent?
5. What value can you bring to our team?`,
    },
    Behavioral: {
      Beginner: `1. Tell me about a time you helped someone.
2. Describe a time you learned from a mistake.
3. Tell me about working with a team.
4. Describe a time you completed a task on time.
5. Tell me about receiving feedback.`,
      Intermediate: `1. Tell me about handling pressure.
2. Describe resolving a misunderstanding.
3. Tell me about adapting to change.
4. Describe a time you took initiative.
5. Tell me about managing multiple tasks.`,
      Advanced: `1. Describe handling a difficult conversation.
2. Tell me about influencing others positively.
3. Describe a time you took responsibility for failure.
4. Tell me about making a tough decision.
5. Describe a time you showed leadership.`,
    },
  },
}

function mixedQuestions(role, difficulty) {
  if (difficulty === "Beginner") {
    return `1. Tell me about yourself and your interest in ${role}.
2. Explain one basic concept important for a ${role}.
3. Describe one project or task related to ${role}.
4. Tell me about a time you worked in a team.
5. Why do you want to grow in this role?`
  }

  if (difficulty === "Intermediate") {
    return `1. Introduce yourself for a ${role} position.
2. Explain one important technical skill required for this role.
3. Describe a challenging project you worked on.
4. Tell me about a time you handled feedback.
5. How would you improve your performance in this role?`
  }

  return `1. Give a strong professional introduction for a ${role} role.
2. Explain a complex concept related to this role clearly.
3. Describe a high-impact project or decision you contributed to.
4. Tell me about handling conflict or pressure in a team.
5. How would you bring value to a company in this role?`
}

function getFallbackQuestions(role, type, difficulty) {
  if (type === "Mixed") {
    return mixedQuestions(role, difficulty)
  }

  return (
    bank[role]?.[type]?.[difficulty] ||
    bank[role]?.HR?.[difficulty] ||
    bank["Software Developer"].Technical.Beginner
  )
}

export async function generateInterviewQuestions(role, type, difficulty) {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Generate exactly 5 ${difficulty} level ${type} interview questions for a ${role} role. Questions must clearly match the selected role, interview type, and difficulty. Return only numbered questions.`,
                },
              ],
            },
          ],
        }),
      }
    )

    const data = await response.json()

    if (data.error) throw new Error(data.error.message)

    return data.candidates[0].content.parts[0].text
  } catch (error) {
    console.error("Gemini Failed:", error)
    return getFallbackQuestions(role, type, difficulty)
  }
}