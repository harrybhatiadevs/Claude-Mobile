/*
 * data.js
 * -------
 * The complete learning path for the Skill Tracker.
 *
 * The order of categories and the order of items inside each category
 * defines the recommended learning sequence (first -> last). This order is
 * used by the "What should I do next?" feature and "Focus Mode", so it should
 * not be reordered casually.
 *
 * Each item has:
 *   - task:       short description of the skill/task
 *   - difficulty: "Beginner" | "Intermediate" | "Advanced"
 *
 * "type" on a category:
 *   - "skills"   : normal learn-and-track items
 *   - "project"  : a portfolio project (items are required features)
 *   - "weekly"   : recurring weekly discipline checklist
 *
 * Item IDs are generated from category + item index at runtime (see app.js),
 * so saved progress stays stable as long as the order here is preserved.
 */

const LEARNING_PATH = [
  {
    name: "1. Coding Fundamentals",
    goal: "Become comfortable solving problems and writing code without relying on AI.",
    type: "skills",
    items: [
      { task: "Python basics: variables, functions, loops, conditionals", difficulty: "Beginner" },
      { task: "Data structures: lists, dictionaries, sets, tuples", difficulty: "Beginner" },
      { task: "String manipulation", difficulty: "Beginner" },
      { task: "File handling", difficulty: "Beginner" },
      { task: "Error handling with try/except", difficulty: "Beginner" },
      { task: "Classes and objects", difficulty: "Intermediate" },
      { task: "Modules and packages", difficulty: "Intermediate" },
      { task: "Virtual environments", difficulty: "Beginner" },
      { task: "Reading documentation", difficulty: "Beginner" },
      { task: "Debugging without AI", difficulty: "Intermediate" },
      { task: "Writing clean functions", difficulty: "Intermediate" },
      { task: "Explaining code out loud", difficulty: "Beginner" },
      { task: "Git basics: add, commit, push, branch, merge", difficulty: "Beginner" },
      { task: "GitHub basics", difficulty: "Beginner" },
      { task: "Basic terminal commands", difficulty: "Beginner" },
      { task: "Big O basics", difficulty: "Intermediate" },
      { task: "Arrays/lists problems", difficulty: "Intermediate" },
      { task: "Hash map problems", difficulty: "Intermediate" },
      { task: "Two pointers problems", difficulty: "Intermediate" },
      { task: "Stack and queue problems", difficulty: "Intermediate" },
      { task: "Binary search basics", difficulty: "Intermediate" },
      { task: "Recursion basics", difficulty: "Intermediate" },
      { task: "Tree basics", difficulty: "Advanced" },
      { task: "Graph basics", difficulty: "Advanced" }
    ]
  },
  {
    name: "2. SQL and Databases",
    goal: "Understand how real applications store and retrieve data.",
    type: "skills",
    items: [
      { task: "What relational databases are", difficulty: "Beginner" },
      { task: "Tables, rows, columns", difficulty: "Beginner" },
      { task: "Primary keys and foreign keys", difficulty: "Beginner" },
      { task: "SELECT queries", difficulty: "Beginner" },
      { task: "WHERE filters", difficulty: "Beginner" },
      { task: "ORDER BY and LIMIT", difficulty: "Beginner" },
      { task: "INSERT, UPDATE, DELETE", difficulty: "Beginner" },
      { task: "JOINs", difficulty: "Intermediate" },
      { task: "GROUP BY and aggregation", difficulty: "Intermediate" },
      { task: "Database schema design", difficulty: "Intermediate" },
      { task: "Index basics", difficulty: "Intermediate" },
      { task: "PostgreSQL setup", difficulty: "Beginner" },
      { task: "Connecting app code to PostgreSQL", difficulty: "Intermediate" },
      { task: "Basic database migrations", difficulty: "Intermediate" },
      { task: "Preventing SQL injection", difficulty: "Intermediate" },
      { task: "Designing a schema for a real app", difficulty: "Advanced" }
    ]
  },
  {
    name: "3. Backend Engineering",
    goal: "Build real APIs that can power applications.",
    type: "skills",
    items: [
      { task: "REST API basics", difficulty: "Beginner" },
      { task: "HTTP methods: GET, POST, PUT, PATCH, DELETE", difficulty: "Beginner" },
      { task: "HTTP status codes", difficulty: "Beginner" },
      { task: "Request and response structure", difficulty: "Beginner" },
      { task: "JSON", difficulty: "Beginner" },
      { task: "FastAPI or Express basics", difficulty: "Intermediate" },
      { task: "Routing", difficulty: "Beginner" },
      { task: "Controllers/services structure", difficulty: "Intermediate" },
      { task: "Input validation", difficulty: "Intermediate" },
      { task: "Error handling", difficulty: "Intermediate" },
      { task: "Authentication basics", difficulty: "Intermediate" },
      { task: "Password hashing", difficulty: "Intermediate" },
      { task: "JWT authentication", difficulty: "Advanced" },
      { task: "Environment variables", difficulty: "Beginner" },
      { task: "Logging", difficulty: "Intermediate" },
      { task: "API testing with Postman/Insomnia", difficulty: "Beginner" },
      { task: "Unit testing", difficulty: "Intermediate" },
      { task: "Integration testing", difficulty: "Advanced" },
      { task: "CRUD app backend", difficulty: "Intermediate" },
      { task: "Pagination", difficulty: "Intermediate" },
      { task: "Search and filtering", difficulty: "Intermediate" },
      { task: "Rate limiting basics", difficulty: "Advanced" },
      { task: "Background jobs basics", difficulty: "Advanced" },
      { task: "Caching basics with Redis", difficulty: "Advanced" }
    ]
  },
  {
    name: "4. Full-Stack Development",
    goal: "Connect a frontend to a real backend.",
    type: "skills",
    items: [
      { task: "TypeScript basics", difficulty: "Intermediate" },
      { task: "React basics", difficulty: "Intermediate" },
      { task: "Components and props", difficulty: "Beginner" },
      { task: "State management", difficulty: "Intermediate" },
      { task: "Forms", difficulty: "Intermediate" },
      { task: "API calls from frontend", difficulty: "Intermediate" },
      { task: "Loading states", difficulty: "Beginner" },
      { task: "Error states", difficulty: "Beginner" },
      { task: "Authentication flow in frontend", difficulty: "Advanced" },
      { task: "Protected routes", difficulty: "Intermediate" },
      { task: "Tailwind CSS basics", difficulty: "Beginner" },
      { task: "Clean UI layout", difficulty: "Intermediate" },
      { task: "Connecting frontend to backend", difficulty: "Intermediate" },
      { task: "Deploying frontend", difficulty: "Intermediate" },
      { task: "Handling environment variables in frontend", difficulty: "Intermediate" },
      { task: "Building a full-stack CRUD app", difficulty: "Advanced" }
    ]
  },
  {
    name: "5. Cloud and Deployment",
    goal: "Ship projects properly instead of only running them locally.",
    type: "skills",
    items: [
      { task: "Cloud basics", difficulty: "Beginner" },
      { task: "Linux basics", difficulty: "Beginner" },
      { task: "SSH basics", difficulty: "Beginner" },
      { task: "Environment variables in production", difficulty: "Intermediate" },
      { task: "Docker basics", difficulty: "Intermediate" },
      { task: "Dockerfile", difficulty: "Intermediate" },
      { task: "Docker Compose", difficulty: "Intermediate" },
      { task: "Containerising a backend app", difficulty: "Advanced" },
      { task: "Deploying a backend app", difficulty: "Advanced" },
      { task: "Deploying a frontend app", difficulty: "Intermediate" },
      { task: "Managed database basics", difficulty: "Intermediate" },
      { task: "AWS account setup", difficulty: "Beginner" },
      { task: "AWS IAM basics", difficulty: "Intermediate" },
      { task: "AWS EC2 basics", difficulty: "Intermediate" },
      { task: "AWS S3 basics", difficulty: "Beginner" },
      { task: "AWS RDS basics", difficulty: "Intermediate" },
      { task: "AWS Lambda basics", difficulty: "Advanced" },
      { task: "AWS CloudWatch basics", difficulty: "Intermediate" },
      { task: "Domain/DNS basics", difficulty: "Intermediate" },
      { task: "HTTPS basics", difficulty: "Intermediate" },
      { task: "Production logs", difficulty: "Intermediate" },
      { task: "Health check endpoint", difficulty: "Beginner" },
      { task: "Monitoring basics", difficulty: "Intermediate" }
    ]
  },
  {
    name: "6. DevOps and Platform Skills",
    goal: "Learn how professional teams build, test, deploy, and monitor software.",
    type: "skills",
    items: [
      { task: "CI/CD basics", difficulty: "Intermediate" },
      { task: "GitHub Actions basics", difficulty: "Intermediate" },
      { task: "Running tests in CI", difficulty: "Intermediate" },
      { task: "Linting in CI", difficulty: "Intermediate" },
      { task: "Building Docker images in CI", difficulty: "Advanced" },
      { task: "Deployment pipeline basics", difficulty: "Advanced" },
      { task: "Staging vs production", difficulty: "Intermediate" },
      { task: "Secrets management", difficulty: "Advanced" },
      { task: "Rollbacks", difficulty: "Advanced" },
      { task: "Infrastructure as Code basics", difficulty: "Advanced" },
      { task: "Terraform basics", difficulty: "Advanced" },
      { task: "Writing simple Terraform config", difficulty: "Advanced" },
      { task: "Provisioning cloud infrastructure", difficulty: "Advanced" },
      { task: "Monitoring and alerting basics", difficulty: "Intermediate" },
      { task: "Reading production logs", difficulty: "Intermediate" },
      { task: "Incident/debugging mindset", difficulty: "Intermediate" },
      { task: "Writing technical documentation", difficulty: "Beginner" },
      { task: "Architecture diagrams", difficulty: "Intermediate" }
    ]
  },
  {
    name: "7. Practical AI Engineering",
    goal: "Build useful AI features into real software.",
    type: "skills",
    items: [
      { task: "How LLM APIs work", difficulty: "Beginner" },
      { task: "Prompt engineering basics", difficulty: "Beginner" },
      { task: "Structured outputs", difficulty: "Intermediate" },
      { task: "JSON mode/schema outputs", difficulty: "Intermediate" },
      { task: "Tool calling/function calling", difficulty: "Advanced" },
      { task: "Embeddings", difficulty: "Intermediate" },
      { task: "Vector databases", difficulty: "Intermediate" },
      { task: "Semantic search", difficulty: "Intermediate" },
      { task: "RAG basics", difficulty: "Advanced" },
      { task: "Document chunking", difficulty: "Intermediate" },
      { task: "Retrieval quality", difficulty: "Advanced" },
      { task: "Answer generation with citations", difficulty: "Advanced" },
      { task: "AI evaluation basics", difficulty: "Advanced" },
      { task: "Creating test cases for AI outputs", difficulty: "Intermediate" },
      { task: "Hallucination handling", difficulty: "Advanced" },
      { task: "Cost tracking", difficulty: "Intermediate" },
      { task: "Rate limiting AI calls", difficulty: "Intermediate" },
      { task: "Human-in-the-loop review", difficulty: "Intermediate" },
      { task: "AI safety/guardrails basics", difficulty: "Advanced" },
      { task: "Building an AI feature into a real app", difficulty: "Advanced" }
    ]
  },
  {
    name: "8. Portfolio Projects",
    goal: "Build proof that I can code, deploy, and explain systems.",
    type: "skills",
    items: [
      // Project 1: Full-stack Job Application Tracker
      { task: "Project 1 — Job Tracker: User signup/login", difficulty: "Intermediate" },
      { task: "Project 1 — Job Tracker: PostgreSQL database", difficulty: "Intermediate" },
      { task: "Project 1 — Job Tracker: CRUD job applications", difficulty: "Intermediate" },
      { task: "Project 1 — Job Tracker: Status tracking", difficulty: "Intermediate" },
      { task: "Project 1 — Job Tracker: Notes", difficulty: "Beginner" },
      { task: "Project 1 — Job Tracker: Search/filter", difficulty: "Intermediate" },
      { task: "Project 1 — Job Tracker: Dashboard stats", difficulty: "Intermediate" },
      { task: "Project 1 — Job Tracker: Frontend", difficulty: "Intermediate" },
      { task: "Project 1 — Job Tracker: Backend API", difficulty: "Intermediate" },
      { task: "Project 1 — Job Tracker: Tests", difficulty: "Advanced" },
      { task: "Project 1 — Job Tracker: Docker", difficulty: "Advanced" },
      { task: "Project 1 — Job Tracker: Deployed version", difficulty: "Advanced" },
      { task: "Project 1 — Job Tracker: README with screenshots", difficulty: "Beginner" },
      { task: "Project 1 — Job Tracker: Architecture diagram", difficulty: "Intermediate" },
      // Project 2: Cloud/DevOps Deployment Pipeline
      { task: "Project 2 — DevOps Pipeline: Dockerised app", difficulty: "Intermediate" },
      { task: "Project 2 — DevOps Pipeline: GitHub Actions CI/CD", difficulty: "Advanced" },
      { task: "Project 2 — DevOps Pipeline: Automated tests", difficulty: "Intermediate" },
      { task: "Project 2 — DevOps Pipeline: Cloud deployment", difficulty: "Advanced" },
      { task: "Project 2 — DevOps Pipeline: Environment variables", difficulty: "Intermediate" },
      { task: "Project 2 — DevOps Pipeline: Logging", difficulty: "Intermediate" },
      { task: "Project 2 — DevOps Pipeline: Health check endpoint", difficulty: "Beginner" },
      { task: "Project 2 — DevOps Pipeline: Basic monitoring", difficulty: "Intermediate" },
      { task: "Project 2 — DevOps Pipeline: Terraform if possible", difficulty: "Advanced" },
      { task: "Project 2 — DevOps Pipeline: README explaining deployment architecture", difficulty: "Intermediate" },
      // Project 3: AI Study Assistant / RAG App
      { task: "Project 3 — RAG App: Upload documents", difficulty: "Intermediate" },
      { task: "Project 3 — RAG App: Chunk documents", difficulty: "Intermediate" },
      { task: "Project 3 — RAG App: Generate embeddings", difficulty: "Intermediate" },
      { task: "Project 3 — RAG App: Store in vector database", difficulty: "Intermediate" },
      { task: "Project 3 — RAG App: Ask questions", difficulty: "Intermediate" },
      { task: "Project 3 — RAG App: Retrieve relevant chunks", difficulty: "Advanced" },
      { task: "Project 3 — RAG App: Answer with citations", difficulty: "Advanced" },
      { task: "Project 3 — RAG App: Show limitations", difficulty: "Intermediate" },
      { task: "Project 3 — RAG App: Evaluation test cases", difficulty: "Advanced" },
      { task: "Project 3 — RAG App: Deployed version", difficulty: "Advanced" },
      { task: "Project 3 — RAG App: README explaining AI pipeline", difficulty: "Intermediate" }
    ]
  },
  {
    name: "9. Interview Preparation",
    goal: "Be ready for graduate/junior technical interviews.",
    type: "skills",
    items: [
      { task: "Explain every project clearly", difficulty: "Intermediate" },
      { task: "Explain auth flow", difficulty: "Intermediate" },
      { task: "Explain database schema", difficulty: "Intermediate" },
      { task: "Explain API design", difficulty: "Intermediate" },
      { task: "Explain deployment process", difficulty: "Intermediate" },
      { task: "Explain one hard bug and how it was fixed", difficulty: "Intermediate" },
      { task: "Explain trade-offs", difficulty: "Advanced" },
      { task: "Explain where AI was used and how outputs were verified", difficulty: "Intermediate" },
      { task: "50 easy/medium coding problems", difficulty: "Advanced" },
      { task: "Arrays pattern", difficulty: "Intermediate" },
      { task: "Hash map pattern", difficulty: "Intermediate" },
      { task: "Two pointers pattern", difficulty: "Intermediate" },
      { task: "Stack/queue pattern", difficulty: "Intermediate" },
      { task: "Binary search pattern", difficulty: "Intermediate" },
      { task: "Recursion pattern", difficulty: "Advanced" },
      { task: "Trees basics", difficulty: "Advanced" },
      { task: "Graph basics", difficulty: "Advanced" },
      { task: "Behavioural story: leadership", difficulty: "Beginner" },
      { task: "Behavioural story: conflict", difficulty: "Beginner" },
      { task: "Behavioural story: failure/mistake", difficulty: "Beginner" },
      { task: "Behavioural story: learning fast", difficulty: "Beginner" },
      { task: "Behavioural story: debugging under pressure", difficulty: "Beginner" }
    ]
  },
  {
    name: "10. Weekly Discipline Tracker",
    goal: "Build consistency. Reset these each week using the button below.",
    type: "weekly",
    items: [
      { task: "Solve at least 5 coding problems", difficulty: "Beginner" },
      { task: "Make at least 5 GitHub commits", difficulty: "Beginner" },
      { task: "Build or improve one project feature", difficulty: "Intermediate" },
      { task: "Write one technical note in my own words", difficulty: "Beginner" },
      { task: "Apply to at least 10 roles", difficulty: "Beginner" },
      { task: "Post one LinkedIn update or project progress post", difficulty: "Beginner" },
      { task: "Review what I learned this week", difficulty: "Beginner" },
      { task: "Choose next week's focus", difficulty: "Beginner" }
    ]
  }
];

// Expose for app.js (works when loaded via <script> in the browser).
if (typeof window !== "undefined") {
  window.LEARNING_PATH = LEARNING_PATH;
}
