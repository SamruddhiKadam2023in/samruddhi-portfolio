import type { CaseStudy } from '../types/project';

// Case-study content for individual projects, keyed by project id.
// Every statement is taken from the project's own README, docs or source code.
// Sections without documented material are left out rather than invented.

export const caseStudies: Record<string, CaseStudy> = {
  propai: {
    overview: [
      'PropAI is a full-stack property management platform with three roles — Tenant, Owner and Manager — each with its own dashboard and permissions.',
      'Its focus is the money side of renting: it reads utility bills, tracks rent and expenses, forecasts next month’s costs, and compares a rent with similar properties in the market.',
    ],
    problem: [
      'Rental finances are scattered across paper and PDF bills, payment records and agreements. Tenants have no simple way to see what they actually spend or whether their rent is fair, and owners and managers track applications, payments and maintenance by hand.',
      'Many utility bills in Maharashtra are in Marathi, so a reader that only understands English misses a large share of real documents.',
    ],
    solution: [
      'A tenant uploads a bill and a background pipeline reads it in English and Marathi, classifies it, and extracts the vendor, amount, bill and due dates, billing period and address. A recognised electricity, water or gas bill becomes an expense on the tenant’s property, so the cost-analysis charts and the forecast fill themselves.',
      'Anything the reader is unsure about is left empty and the document is flagged for the user to correct — a value is never guessed.',
      'Around that sits the full rental workflow: property listings, applications and approvals, agreements, payments with receipts, maintenance requests, messaging, notifications, and PDF and Excel reports.',
    ],
    architecture: [
      { label: 'Upload', detail: 'Tenant uploads a bill as a photo or PDF' },
      {
        label: 'Read',
        detail:
          'PDF text layer if present, otherwise Tesseract OCR on cleaned-up copies (English + Marathi)',
      },
      {
        label: 'Extract',
        detail:
          'Rules and NLP pull out type, vendor, amount, dates and address; unsure fields stay empty',
      },
      { label: 'Store', detail: 'FastAPI saves the document; a confident bill becomes an expense' },
      { label: 'Analyse', detail: 'Expense trends, next-month forecast and KNN rent comparison' },
    ],
    features: [
      {
        title: 'Bills read in two languages',
        description:
          'English and Marathi utility bills are read with Tesseract. PDFs that already contain text are read directly, with no OCR and no misread digits.',
      },
      {
        title: 'Bills feed the cost analysis',
        description:
          'Each confidently read bill becomes an expense. Correcting a bill updates its expense, and deleting it removes it.',
      },
      {
        title: 'KNN rent comparison',
        description:
          'Compares a property’s rent with its nearest neighbours in the market and shows how far above or below it sits.',
      },
      {
        title: 'Three role-based dashboards',
        description:
          'Tenants, owners and managers each get their own pages: payments and documents, portfolio and applications, or platform-wide administration.',
      },
      {
        title: 'End-to-end rental flow',
        description:
          'A tenant applies, the owner and manager are notified, either can approve or reject, the tenant is notified, and an approved property is marked occupied.',
      },
      {
        title: 'Reports and account security',
        description:
          'PDF and Excel financial reports; sign-up with emailed one-time codes, rotating refresh tokens and rate-limited sign-in.',
      },
    ],
    techGroups: [
      {
        label: 'Frontend',
        items: ['React 18', 'Vite', 'Tailwind CSS', 'Recharts', 'TanStack Query'],
      },
      { label: 'Backend', items: ['Python', 'FastAPI', 'SQLAlchemy', 'Pydantic', 'Alembic'] },
      { label: 'Database', items: ['PostgreSQL', 'MongoDB', 'Redis'] },
      {
        label: 'AI / ML',
        items: [
          'Tesseract OCR',
          'OpenCV',
          'spaCy (NLP)',
          'KNN rent model',
          'Regression forecasting',
        ],
      },
      { label: 'APIs', items: ['REST', 'JWT auth', 'SMTP / Brevo email'] },
      { label: 'Tools', items: ['Docker Compose', 'Nginx', 'Caddy', 'ReportLab', 'openpyxl'] },
    ],
    challenges: [
      {
        title: 'Reading Marathi bills reliably',
        description:
          'Tesseract runs on several cleaned-up copies of each image and stops as soon as it is confident, within 60 seconds. If the newer reader finds nothing, the older pipeline is used as a fallback.',
      },
      {
        title: 'OCR on a 512 MB free host',
        description:
          'On a small free host the full reader hit the memory limit and took over two minutes per bill. A lite mode reads one pass at a time on a smaller image and loads no spaCy model, peaking around 260–290 MB.',
      },
      {
        title: 'Hosts that wipe their disk',
        description:
          'Free web hosts lose files on restart and block email ports, so uploads are mirrored into MongoDB and restored, and one-time codes are sent through Brevo’s web API instead of SMTP.',
      },
    ],
    decisions: [
      {
        context:
          'A wrong amount on a bill is worse than a missing one: it silently corrupts expenses and forecasts.',
        decision:
          'Never guess. Uncertain fields stay empty and the document is flagged for review.',
        reason: 'Every number in the cost analysis can be trusted.',
        tradeoff: 'Users sometimes type in a value the reader could not confirm.',
      },
      {
        context: 'Most bills downloaded from a utility’s portal already contain selectable text.',
        decision:
          'Read the PDF text layer directly, and only run OCR on scanned or photographed bills.',
        reason: 'Exact text, even in Marathi, usually in under a second.',
        tradeoff:
          'A second reading path to maintain, with OCR as the fallback when the text does not look like a bill.',
      },
      {
        context: 'The full reader does not fit on a 512 MB host.',
        decision: 'In lite mode, accept an amount only if it was seen twice next to a label.',
        reason: 'A wrong amount is never shown, even with less processing.',
        tradeoff: 'Marathi bills in lite mode often need the user to type the amount once.',
      },
    ],
  },

  tracelayer: {
    overview: [
      'TraceLayer is an API reliability and observability platform. It runs scheduled checks against APIs, records every result, and turns them into metrics, health status, alerts and incidents.',
      'It is a pnpm monorepo with three apps — a React frontend, an Express API and a BullMQ worker — backed by PostgreSQL and Redis, with shared packages for types, validation and request execution.',
    ],
    problem: [
      'Most API tools answer “what did this one request return?”. Teams running APIs in production need different answers: is the API up right now, is it getting slower, when did it start failing, and why?',
      'Answering those questions needs a history of checks rather than single requests, and a way to turn threshold breaches into incidents that a team can work through together.',
    ],
    solution: [
      'Monitors are scheduled checks that run in a separate worker, never inside the API. Every check is stored as a run, and uptime, error rate and latency percentiles are computed from those runs in SQL.',
      'Alert rules are evaluated after every check. A breach that lasts long enough fires an alert and emails the chosen channels; a firing alert opens an incident with a timeline, and the incident resolves itself when the API recovers.',
      'Every step publishes a live event, so dashboards, monitor pages and incident timelines update in the browser without refreshing.',
    ],
    architecture: [
      {
        label: 'React app',
        detail: 'Single-page UI; REST for data, one WebSocket for live events',
      },
      {
        label: 'Express API',
        detail: 'Authentication, validation and permissions; routes → controllers → services',
      },
      {
        label: 'Redis + BullMQ',
        detail: 'Schedules and job queues, rate limits, live-event channel',
      },
      {
        label: 'Worker',
        detail: 'Runs SSRF-protected checks, evaluates alerts, opens incidents, sends email',
      },
      { label: 'PostgreSQL', detail: 'Every run, alert and incident; metrics computed in SQL' },
      { label: 'Socket.IO', detail: 'Pushes each change to every browser watching the workspace' },
    ],
    features: [
      {
        title: 'Scheduled monitors',
        description:
          'Availability, expected status, response time and JSON-path validation checks, from every minute to every hour, with run-now, pause and resume.',
      },
      {
        title: 'Metrics from raw runs',
        description:
          'Uptime, error rate and P50 / P95 / P99 latency for a workspace, project, endpoint or monitor, from 1 hour to 30 days.',
      },
      {
        title: 'Alerts and incidents',
        description:
          'Rules on latency, error rate, uptime, status codes or consecutive failures fire and resolve on their own; incidents have assignees, comments and a full timeline.',
      },
      {
        title: 'Live dashboard',
        description:
          'Monitor status, incidents, alerts and the dashboard update over Socket.IO, with in-app notifications.',
      },
      {
        title: 'Request builder',
        description:
          'Saved endpoints with environments, {{VARIABLES}} and encrypted, write-only secrets; send any request and search the history.',
      },
      {
        title: 'Teams and dependency map',
        description:
          'Workspaces with owner, admin, member and viewer roles, and an editable map of a project’s services showing live health.',
      },
    ],
    techGroups: [
      {
        label: 'Frontend',
        items: [
          'React 19',
          'TypeScript',
          'Vite',
          'Tailwind CSS',
          'Zustand',
          'Recharts',
          'React Flow',
        ],
      },
      { label: 'Backend', items: ['Node.js', 'Express 5', 'TypeScript', 'Zod', 'pino', 'BullMQ'] },
      { label: 'Database', items: ['PostgreSQL 16', 'Prisma', 'Redis 7'] },
      {
        label: 'APIs',
        items: ['REST', 'Socket.IO (WebSockets)', 'JWT with rotating refresh tokens'],
      },
      {
        label: 'Tools',
        items: [
          'pnpm workspaces',
          'Docker Compose',
          'GitHub Actions',
          'Jest',
          'Vitest',
          'Playwright',
          'axe-core',
        ],
      },
    ],
    challenges: [
      {
        title: 'Server-side request forgery',
        description:
          'TraceLayer sends requests to URLs its users choose. Private, loopback, link-local and cloud-metadata addresses are blocked, and the check runs on the address actually connected to — so DNS rebinding cannot bypass it — and again on every redirect.',
      },
      {
        title: 'Alerts firing twice',
        description:
          'Concurrent checks could fire the same alert twice. Each rule is a state machine (OK, PENDING, FIRING) re-evaluated inside a row lock after every check, and tests force the race to prove it holds.',
      },
      {
        title: 'Honest latency numbers',
        description:
          'A timed-out run’s duration is just the timeout; one 5 s timeout among ~300 ms responses would move the average from 301 ms to 889 ms. Latency uses only runs that got a response, while timeouts still count fully in uptime and error rate.',
      },
    ],
    decisions: [
      {
        context: 'Checks call external APIs that can be slow or hang.',
        decision:
          'Never run checks in the API: a separate BullMQ worker runs them with bounded concurrency.',
        reason:
          'A slow API ties up a worker slot, never an HTTP request, and more workers can be added.',
        tradeoff: 'Another process, plus Redis, to deploy and keep healthy.',
      },
      {
        context: 'Dashboards need uptime and percentiles over many time ranges.',
        decision: 'Store every check as one row and compute metrics in SQL on demand.',
        reason: 'The numbers are always consistent with the recorded history.',
        tradeoff: 'Runs are kept for 30 days; longer history would need roll-ups.',
      },
      {
        context: 'Browsers can miss live events while disconnected.',
        decision:
          'Treat live events as a fan-out, not a source of truth; pages re-fetch after a reconnect.',
        reason: 'A missed event can never leave a page showing the wrong state.',
        tradeoff: 'Extra requests after every reconnect.',
      },
    ],
  },

  urbanpuls: {
    overview: [
      'UrbanPuls is a traffic and parking management system built for Mumbai. It serves five roles — drivers, parking partners, gate attendants, field officers and admins — each with its own menu and home page.',
      'The whole app is available in English, Hindi and Marathi.',
    ],
    problem: [
      'Parking in a dense city means circling in the hope of a free spot, and often paying up front for time you may not use. Lot operators run their gates and payments by hand.',
      'Illegal parking blocks roads, and citizens have no simple way to report it to someone who can act on it.',
    ],
    solution: [
      'Drivers see live availability on a map, reserve a car or two-wheeler slot for a time window and get a QR code — nothing is paid online. At the gate, staff scan the QR to check the car in; at checkout the fee is worked out for the time actually parked and shown as a UPI QR for the exact amount, paid straight to the lot owner.',
      'Citizens report problems with GPS location and a photo. Admins verify them, field officers resolve them on a map, and reporters follow a status timeline. A YOLO model checks camera photos for vehicles standing in no-parking areas and sends staff a live alert.',
    ],
    architecture: [
      { label: 'Browser', detail: 'React + Redux Toolkit, Leaflet map, i18next translations' },
      { label: 'nginx', detail: 'Serves the app and proxies the API and WebSocket' },
      { label: 'FastAPI', detail: 'Bookings, gate, complaints, detection and live events' },
      { label: 'Detection', detail: 'YOLO11n exported to ONNX, run through OpenCV on the CPU' },
      { label: 'PostgreSQL + Redis', detail: 'Application data, and rate-limit counters' },
    ],
    features: [
      {
        title: 'Reserve now, pay at the gate',
        description:
          'Bookings come with a QR code. The fee covers actual time parked — at least one hour, then 30-minute steps — at the rate locked in when booking, minus reward points.',
      },
      {
        title: 'Gate screen for partners',
        description:
          'Scan the QR or type the code or vehicle number, check cars in and out, handle walk-ins, and show a UPI QR for the exact amount.',
      },
      {
        title: 'Live parking map',
        description:
          'Free car and two-wheeler slots, prices, ratings and reviews for each lot, with near-me sorting and one-tap directions.',
      },
      {
        title: 'Complaints and enforcement',
        description:
          'Reports with GPS and a photo, admin verification, a field-officer map, a status timeline for reporters, and a generated fine PDF.',
      },
      {
        title: 'Violation detection',
        description:
          'Staff draw no-parking areas on a camera’s reference photo; a vehicle whose ground point falls inside one is flagged as a violation.',
      },
      {
        title: 'Three languages, live updates',
        description:
          'English, Hindi and Marathi throughout, with availability, notifications and violation alerts pushed over a WebSocket.',
      },
    ],
    techGroups: [
      {
        label: 'Frontend',
        items: [
          'React 18',
          'Vite',
          'Redux Toolkit',
          'React Router',
          'Leaflet',
          'Recharts',
          'i18next',
          'Tailwind CSS',
        ],
      },
      {
        label: 'Backend',
        items: ['Python', 'FastAPI', 'SQLAlchemy 2', 'Alembic', 'Pydantic 2', 'ReportLab'],
      },
      { label: 'Database', items: ['PostgreSQL 16', 'SQLite (local development)', 'Redis 7'] },
      { label: 'AI / ML', items: ['YOLO11n (Ultralytics)', 'ONNX', 'OpenCV DNN'] },
      { label: 'APIs', items: ['REST', 'WebSockets', 'JWT', 'slowapi rate limiting'] },
      { label: 'Tools', items: ['Docker Compose', 'nginx', 'pytest'] },
    ],
    challenges: [
      {
        title: 'A parked car isn’t illegal by itself',
        description:
          'Whether a vehicle is a violation depends on where it stands. Staff add a camera with a reference photo and draw its no-parking areas; a vehicle counts as a violation only if the bottom-centre of its box falls inside one.',
      },
      {
        title: 'Overstaying cars',
        description:
          'If the booked slot is still occupied when a driver arrives because the previous car overstayed, check-in moves them to another free slot of the same vehicle type.',
      },
      {
        title: 'Keeping three languages in sync',
        description:
          'English text lives in the code and Hindi and Marathi in locale files; a checker fails the build if either misses a key or a {{placeholder}}.',
      },
    ],
    decisions: [
      {
        context: 'Detection has to run on ordinary servers.',
        decision: 'Export YOLO11n to ONNX and run it through OpenCV on the CPU.',
        reason: 'No GPU or PyTorch is needed at runtime.',
        tradeoff:
          'Detection covers the pre-trained vehicle classes; anything else needs retraining with the included script.',
      },
      {
        context: 'Drivers often don’t know exactly how long they will stay.',
        decision:
          'No online payment: pay at the gate, in cash or UPI, for the time actually parked.',
        reason: 'Nobody pays for time they did not use, and money goes straight to the lot owner.',
        tradeoff:
          'No-shows can’t be charged, so a slot is released after 15 minutes and booking pauses after 3 no-shows in 30 days.',
      },
      {
        context: 'The project should be easy to run locally.',
        decision: 'SQLite for local development, PostgreSQL in Docker, with tests on both.',
        reason: 'No database server is needed to start developing.',
        tradeoff:
          'Two databases to keep compatible; a test fails if a model changes without a migration.',
      },
    ],
  },
};
