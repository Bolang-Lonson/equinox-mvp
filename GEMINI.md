# Project Equinox README

This is a comprehensive README file for the "Project Equinox" project, designed to be used with an AI agent like Cursor to assist with development.

## Project Overview

Project Equinox is a legal tech application designed to manage intellectual property portfolios, specifically focusing on trademark records and associated tasks. The goal is to create a minimum viable product (MVP) with core features that can be expanded upon in the future.

The MVP will include:

  * **Trademark portfolio records and dossiers:** Manage cases, owners, status, and documents.
  * **Docketing and deadlines:** Automatic reminders for important dates.
  * **Document management:** Support for PDFs and other document types.
  * **Reporting and dashboards:** User-specific dashboards and roles (partner, attorney, paralegal).
  * **(Optional) AI helpers:** For drafting goods & services or reviewing search results.

## Tech Stack

The recommended tech stack is based on pragmatic choices for a local iMac server and Cursor-assisted development.

  * **Frontend:** React, TypeScript, and Tailwind CSS for a component-driven, fast-to-iterate user interface.
  * **Backend:** Node.js with TypeScript, using either Express or NestJS for a good ecosystem and easy scaffolding.
  * **Database:** PostgreSQL.
  * **Caching:** Redis.
  * **Worker/Task Queue:** BullMQ.
  * **Deployment:** Docker.

## Folder Structure

While the exact folder structure can be project-dependent, a logical and scalable structure is crucial for collaboration and maintainability. A good starting point would be:

```
/project-equinox
├── .vscode/
├── docs/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── types/
│   │   └── App.tsx
│   ├── package.json
│   └── tsconfig.json
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
├── docker-compose.yml
├── .gitignore
├── package.json
├── README.md
└── LICENSE
```

## Getting Started

To get the project up and running, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/project-equinox.git
    cd project-equinox
    ```
2.  **Set up the environment:** The project uses Docker to manage the database and other services. Ensure you have Docker installed.
    ```bash
    docker-compose up -d
    ```
3.  **Install dependencies and run the application:**
    ```bash
    # For the frontend
    cd frontend
    npm install
    npm start

    # For the backend
    cd ../backend
    npm install
    npm start
    ```

## Milestones and Acceptance Criteria

The following is a suggested checklist of deliverables for the MVP:

  * Repo initialized with development documentation and Docker Compose.
  * Authentication and user roles implemented, with a basic dashboard.
  * CRUD (Create, Read, Update, Delete) functionality for trademarks, including document upload and a viewer.
  * Docketing, a reminder engine, and a worker process.
  * USPTO integration for status and documents.
  * A basic "watch" feature.
  * Tests and CI checks using GitHub Actions or local pre-commit hooks.
  * A README and runbook for the iMac server.

## How to use Cursor

Cursor is a powerful AI-assisted development tool that can help with various tasks. Here are some example prompts:

  * "Create a React TS component `TrademarkForm` with fields: `mark_text`, `owner`, `classes`, `filing_date`, `country`, and integrate form submit to `POST /api/trademarks`".
  * "Write a Jest integration test that creates a trademark, attaches a document, then fetches the trademark and asserts the document appears".
  * "Make me a migration that adds a `docket_entries` table".

Cursor can also be used for multi-file edits, making complex changes more manageable.

## Contributing

We welcome contributions to Project Equinox. Please refer to the `CONTRIBUTING.md` file (to be created) for guidelines on how to submit pull requests and report issues.

## License

This project is licensed under the MIT License - see the `LICENSE` file for details.