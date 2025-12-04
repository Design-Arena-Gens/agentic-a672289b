"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const agentArchetypes = [
  {
    name: "Coordinator",
    purpose: "Maintains global context and aligns agents with mission objectives.",
    strengths: ["Systemic awareness", "Conflict resolution", "Goal decomposition"],
    failureMode: "Bottlenecked centralization or stale global view."
  },
  {
    name: "Specialist",
    purpose: "Owns a bounded domain task with deep expertise and heuristics.",
    strengths: ["Depth of knowledge", "Optimized routines", "Fast local decisions"],
    failureMode: "Local optimum or tunnel vision."
  },
  {
    name: "Explorer",
    purpose: "Searches for novel options, outliers, or creative expansions.",
    strengths: ["Divergent thinking", "Hypothesis generation", "Risk tolerant"],
    failureMode: "Low precision or unchecked speculation."
  },
  {
    name: "Validator",
    purpose: "Audits artefacts, tests assumptions, and enforces constraints.",
    strengths: ["Quality assurance", "Policy compliance", "Regression detection"],
    failureMode: "False positives slowing iteration or overfitted checklists."
  }
];

const lifecyclePhases = [
  {
    title: "1 · Discovery & Scope",
    detail:
      "Frame the problem space, stakeholders, and measurable outcomes. Determine the portfolio of agents, supervision model, and decision latitude."
  },
  {
    title: "2 · Blueprinting",
    detail:
      "Define agent responsibilities, interfaces, shared memory schemas, and escalation triggers. Map communication topology and authority boundaries."
  },
  {
    title: "3 · Orchestration Design",
    detail:
      "Select coordination strategy (centralized planner, market, consensus). Stipulate protocols, data contracts, and cadence for synchronisation."
  },
  {
    title: "4 · Instrumentation",
    detail:
      "Instrument telemetry, evaluation harnesses, and success metrics. Establish lagging reports and leading signals for emergent behavior."
  },
  {
    title: "5 · Continuous Adaptation",
    detail:
      "Monitor feedback loops, retrain or swap agents, prune redundant roles, and apply reinforcement via success metrics."
  }
];

const orchestrationPatterns = [
  {
    name: "Directed Graph",
    when: "Clear task decomposition, hierarchical oversight, predictable flows.",
    mechanics:
      "Coordinator dispatches tasks downstream, collectors aggregate results upstream. Use for deterministic pipelines with serial dependencies.",
    tradeoffs: "High control, low resilience to coordinator failure."
  },
  {
    name: "Blackboard Workspace",
    when: "Shared context across agents with opportunistic contributions.",
    mechanics:
      "Agents read/write to a structured shared memory, subscribe to deltas, and post structured artefacts. Requires strong schema governance.",
    tradeoffs: "Promotes parallelism, demands rigorous arbitration to avoid thrashing."
  },
  {
    name: "Market Bidding",
    when: "Tasks arrive asynchronously and agent capabilities shift over time.",
    mechanics:
      "Tasks broadcast to a market, agents bid based on confidence/availability, auctioneer awards tasks. Encourages specialization and load balancing.",
    tradeoffs: "Increased messaging overhead, tricky incentive design."
  },
  {
    name: "Consensus Swarm",
    when: "Safety-critical decisions requiring peer validation.",
    mechanics:
      "Agents propose actions, peers vote or critique. Final decision emerges via quorum or weighted scoring. Useful for governance and code changes.",
    tradeoffs: "Slow throughput, but robust against single-agent failure."
  }
];

const telemetrySignals = [
  {
    name: "Coordination Load",
    description:
      "Ratio of cross-agent messages to completed deliverables. Rising volumes signal unclear contracts or agent overlap.",
    intervention: "Refine role definitions or instantiate a router agent."
  },
  {
    name: "Decision Latency",
    description:
      "Time from task instantiation to committed action. Spikes indicate arbitration bottlenecks or missing autonomy.",
    intervention: "Adjust escalation thresholds; permit local authority."
  },
  {
    name: "Divergence Index",
    description:
      "Measure of solution variance versus historical baselines. Low variance suggests stagnation; high variance implies chaotic drift.",
    intervention: "Tune exploration quotas or add validator coverage."
  },
  {
    name: "Quality Escapes",
    description:
      "Issues detected post-delivery. Tracks validator effectiveness and coverage gaps.",
    intervention: "Improve regression tests, add specialized review agents."
  }
];

const personaBlueprints = [
  {
    label: "Strategic Research Lab",
    composition: ["Navigator coordinator", "Two specialists", "Explorer", "Validator"],
    cadence: "Weekly retrospectives; daily async sync via knowledge graph.",
    distinctive:
      "Co-creation on shared research canvas, active hypothesis pruning, emphasis on insight lineage."
  },
  {
    label: "Product Development Pod",
    composition: ["Product owner agent", "Design expert", "Build engineer", "QA validator", "Ops sentinel"],
    cadence: "Two-day sprint loops with automated release gatekeeping.",
    distinctive:
      "Continuous integration hooks into orchestration layer, progressive rollout guardrails."
  },
  {
    label: "Incident Response Cell",
    composition: ["Commander coordinator", "Diagnostics specialist", "Communications agent", "Remediation engineer"],
    cadence: "Minute-by-minute timeline with slack cutoff policies.",
    distinctive:
      "Escalation trees baked into protocol, real-time telemetry overlay, post-incident self-healing analysis."
  }
];

function FlowDiagram() {
  return (
    <div className="flow-chart">
      <div className="flow-row">
        <div className="flow-node">
          <div className="flow-title">Signal</div>
          <div className="flow-detail">New mission, change request, or trigger event enters the system.</div>
        </div>
      </div>
      <div className="flow-row">
        <div className="flow-node">
          <div className="flow-title">Intake Router</div>
          <div className="flow-detail">
            Classifies intent, attaches metadata, and picks an orchestration template.
          </div>
        </div>
        <div className="flow-node">
          <div className="flow-title">Mission Brief</div>
          <div className="flow-detail">
            Coordinator creates shared brief, scopes objectives, defines evaluation contract.
          </div>
        </div>
      </div>
      <div className="flow-row">
        <div className="flow-node">
          <div className="flow-title">Agent Loop</div>
          <div className="flow-detail">
            Specialists and explorers iterate on artefacts, logging state deltas to shared memory.
          </div>
        </div>
        <div className="flow-node">
          <div className="flow-title">Peer Validation</div>
          <div className="flow-detail">
            Validators execute checks, run synthetic tests, escalate discrepancies to coordinator.
          </div>
        </div>
        <div className="flow-node">
          <div className="flow-title">Decision Gate</div>
          <div className="flow-detail">
            Coordinator or consensus group approves, defers, or redirects effort based on metrics.
          </div>
        </div>
      </div>
      <div className="flow-row">
        <div className="flow-node">
          <div className="flow-title">Delivery</div>
          <div className="flow-detail">
            Artefacts deployed to target environment with attachable provenance trail for auditing.
          </div>
        </div>
        <div className="flow-node">
          <div className="flow-title">Telemetry Loop</div>
          <div className="flow-detail">
            Observes outcomes, feeds success signals back into agent tuning and knowledge base.
          </div>
        </div>
      </div>
    </div>
  );
}

const principleHighlights = [
  {
    title: "Composable Roles",
    detail:
      "Design agents as modular capabilities with explicit inputs, outputs, and handoff contracts. Promote reuse across missions."
  },
  {
    title: "Tunable Autonomy",
    detail:
      "Embed guardrails that adjust the decision latitude of each agent based on risk, trust, and feedback loops."
  },
  {
    title: "Transparent Memory",
    detail:
      "Maintain traceable state: structured workspaces, timeline logs, and artefact provenance. Visibility reduces coordination debt."
  },
  {
    title: "Multi-layer Evaluation",
    detail:
      "Combine automatic checks, peer reviews, and human spot audits. Diverse evaluators catch blind spots."
  }
];

const strategyMatrix = [
  {
    lever: "Coordination Topology",
    low: "Broadcast updates without routing; minimal oversight.",
    medium: "Coordinator-led dispatch with periodic sync.",
    high: "Dynamic topology with role-based routing and backpressure."
  },
  {
    lever: "Knowledge Management",
    low: "Ad-hoc notes, limited retrieval.",
    medium: "Structured summaries with manual tagging.",
    high: "Automated knowledge graph, embeddings, lineage tracking."
  },
  {
    lever: "Evaluation Depth",
    low: "Single validator, basic heuristics.",
    medium: "Scenario tests plus reviewer rotation.",
    high: "Adaptive evaluation harness with self-play stress tests."
  },
  {
    lever: "Safety & Governance",
    low: "Manual oversight; reactive audits.",
    medium: "Policy guards with escalation workflows.",
    high: "Runtime policy engine, kill switches, compliance agents."
  }
];

const roadmapSteps = [
  {
    title: "Prototype Playground",
    actions: [
      "Build a sandbox using Next.js API routes or serverless functions to host agent endpoints.",
      "Mock agent personas with prompt templates; log interactions to a lightweight vector store.",
      "Instrument Observability: capture message counts, latency, artefact diffs."
    ]
  },
  {
    title: "Operational Hardening",
    actions: [
      "Introduce validation harnesses using scriptable checks and simulation suites.",
      "Add approval workflows (Slack/Email) for high-impact decisions.",
      "Integrate telemetry dashboards to visualize throughput, variance, and QoS."
    ]
  },
  {
    title: "Scale & Optimization",
    actions: [
      "Experiment with self-directed planning agents for dynamic task allocation.",
      "Adopt incentive schemes (scorecards, reputation) to reinforce desired behavior.",
      "Codify upgrade paths: retraining pipeline, offline evaluation, canary agents."
    ]
  }
];

const maturationChecklist = [
  "Every agent lists inputs, outputs, and failure modes.",
  "Shared memory schema includes versioning and governance policy.",
  "Coordination load under 1.6 messages per completed task.",
  "Decision latency SLA defined and monitored.",
  "Validators own regression harness with automated triggers.",
  "Post-mission retrospectives produce learnings fed into knowledge base."
];

function StrategyMatrix() {
  return (
    <div className="matrix">
      <table>
        <thead>
          <tr>
            <th>Design Lever</th>
            <th>Baseline</th>
            <th>Intentional</th>
            <th>Agentic</th>
          </tr>
        </thead>
        <tbody>
          {strategyMatrix.map((row) => (
            <tr key={row.lever}>
              <td>{row.lever}</td>
              <td>{row.low}</td>
              <td>{row.medium}</td>
              <td>{row.high}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PersonaSelector() {
  const [active, setActive] = useState(0);

  return (
    <section className="section">
      <header>
        <h2>Reference Blueprints</h2>
        <p>
          Three sample multi-agent pods illustrating different missions. Toggle to inspect the composition, operating
          cadence, and distinctive behaviors.
        </p>
      </header>
      <div className="section-grid">
        <div className="card">
          <h3>Blueprint Selector</h3>
          <p>Switch between blueprints to understand how roles and rituals adapt to mission context.</p>
          <div className="signals">
            {personaBlueprints.map((persona, idx) => (
              <button
                key={persona.label}
                type="button"
                onClick={() => setActive(idx)}
                className={`signal ${idx === active ? "active" : ""}`}
                style={{
                  borderColor: idx === active ? "var(--accent)" : "var(--border)",
                  background: idx === active ? "rgba(37, 99, 235, 0.08)" : "var(--bg-primary)"
                }}
              >
                <h4>{persona.label}</h4>
                <p>{persona.distinctive}</p>
              </button>
            ))}
          </div>
        </div>
        <div className="card">
          <AnimatePresence mode="wait">
            <motion.div
              key={personaBlueprints[active].label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <h3>{personaBlueprints[active].label}</h3>
              <p>
                <strong>Composition: </strong>
                {personaBlueprints[active].composition.join(", ")}
              </p>
              <p>
                <strong>Cadence: </strong>
                {personaBlueprints[active].cadence}
              </p>
              <p>{personaBlueprints[active].distinctive}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Roadmap() {
  return (
    <section className="section">
      <header>
        <h2>Adoption Roadmap</h2>
        <p>Stage your rollout and harden the system iteratively. Each phase builds compounding capabilities.</p>
      </header>
      <div className="section-grid">
        {roadmapSteps.map((step) => (
          <div className="card" key={step.title}>
            <h3>{step.title}</h3>
            <ul>
              {step.actions.map((action) => (
                <li key={action}>{action}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function Checklist() {
  return (
    <section className="section">
      <header>
        <h2>Maturation Checklist</h2>
        <p>Use this as a recurring review to ensure your multi-agent program remains resilient and responsive.</p>
      </header>
      <div className="section-grid">
        <div className="card">
          <ul>
            {maturationChecklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function ArchetypeExplorer() {
  const [selected, setSelected] = useState(agentArchetypes[0].name);
  const active = useMemo(
    () => agentArchetypes.find((archetype) => archetype.name === selected) ?? agentArchetypes[0],
    [selected]
  );

  return (
    <section className="section">
      <header>
        <h2>Agent Archetypes</h2>
        <p>Combine archetypes with clear guardrails to unlock complementary strengths and avoid systemic blind spots.</p>
      </header>
      <div className="section-grid two">
        <div className="signals">
          {agentArchetypes.map((archetype) => (
            <button
              key={archetype.name}
              type="button"
              className="signal"
              onClick={() => setSelected(archetype.name)}
              style={{
                borderColor: archetype.name === selected ? "var(--accent)" : "var(--border)",
                background: archetype.name === selected ? "rgba(37, 99, 235, 0.08)" : "var(--bg-primary)"
              }}
            >
              <h4>{archetype.name}</h4>
              <p>{archetype.purpose}</p>
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={active.name}
            className="card"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            <h3>{active.name}</h3>
            <p>{active.purpose}</p>
            <p>
              <strong>Strengths</strong>
            </p>
            <ul>
              {active.strengths.map((strength) => (
                <li key={strength}>{strength}</li>
              ))}
            </ul>
            <p>
              <strong>Failure Mode:</strong> {active.failureMode}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function Lifecycle() {
  return (
    <section className="section">
      <header>
        <h2>Lifecycle Playbook</h2>
        <p>Iterate through these phases to launch, manage, and evolve your multi-agent system with confidence.</p>
      </header>
      <div className="section-grid">
        {lifecyclePhases.map((phase) => (
          <div className="card" key={phase.title}>
            <h3>{phase.title}</h3>
            <p>{phase.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function OrchestrationPatterns() {
  return (
    <section className="section">
      <header>
        <h2>Orchestration Patterns</h2>
        <p>Choose the coordination model that best suits your mission, constraints, and organizational appetite.</p>
      </header>
      <div className="section-grid">
        {orchestrationPatterns.map((pattern) => (
          <div className="card" key={pattern.name}>
            <h3>{pattern.name}</h3>
            <p>
              <strong>Use When:</strong> {pattern.when}
            </p>
            <p>
              <strong>Mechanics:</strong> {pattern.mechanics}
            </p>
            <p>
              <strong>Trade-offs:</strong> {pattern.tradeoffs}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function KeyPrinciples() {
  return (
    <section className="section">
      <header>
        <h2>Guiding Principles</h2>
        <p>Anchor your design decisions against evergreen principles that keep multi-agent ecosystems healthy.</p>
      </header>
      <div className="principle-list">
        {principleHighlights.map((principle) => (
          <div className="principle" key={principle.title}>
            <div className="principle-title">{principle.title}</div>
            <div className="principle-detail">{principle.detail}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function TelemetrySignals() {
  return (
    <section className="section">
      <header>
        <h2>Telemetry Signals</h2>
        <p>Instrument these leading indicators to detect drift early and calibrate agent incentives.</p>
      </header>
      <div className="section-grid two">
        {telemetrySignals.map((signal) => (
          <div className="card" key={signal.name}>
            <h3>{signal.name}</h3>
            <p>{signal.description}</p>
            <p>
              <strong>Intervene With:</strong> {signal.intervention}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FlowSection() {
  return (
    <section className="section">
      <header>
        <h2>Operational Flow</h2>
        <p>Visualize a default mission pipeline. Adapt it with branching logic or custom gatekeepers as your system matures.</p>
      </header>
      <FlowDiagram />
    </section>
  );
}

function CallToAction() {
  return (
    <section className="section">
      <div className="cta">
        <h3>Ready to Operationalize Your Agentic Strategy?</h3>
        <p>
          Start with a pilot mission, gather telemetry, and iterate. Share learnings with your organization to scale impact
          responsibly.
        </p>
        <div className="cta-actions">
          <a className="primary" href="https://nextjs.org/docs" target="_blank" rel="noreferrer">
            Launch Pilot
          </a>
          <a href="https://platform.openai.com/docs/assistants" target="_blank" rel="noreferrer">
            Explore Tooling
          </a>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div className="page">
      <section className="section">
        <header>
          <h2>Architecting Agentic Collaboration</h2>
          <p>
            Effective multi-agent design balances autonomy with alignment. Treat each agent as a service with explicit
            contracts, incentives, and observability. The sections below walk through archetypes, orchestration models,
            telemetry, and operational playbooks for resilient collaboration.
          </p>
        </header>
        <div className="section-grid two">
          <div className="card">
            <h3>Design North Star</h3>
            <p>
              Anchor decisions on human intent. Every agent should progress mission objectives while maintaining traceable
              reasoning. Build in feedback loops that make it easy to course-correct when context shifts.
            </p>
          </div>
          <div className="card">
            <h3>Core Equation</h3>
            <p>
              <code>Outcome = (Alignment × Capability × Coordination) ÷ Drag</code>. Wide alignment keeps agents pointed at
              the same goals. Capability ensures deep domain execution. Coordination minimizes drag from handoffs, briefings,
              and arbitration.
            </p>
          </div>
        </div>
      </section>
      <ArchetypeExplorer />
      <Lifecycle />
      <OrchestrationPatterns />
      <KeyPrinciples />
      <StrategyMatrix />
      <FlowSection />
      <TelemetrySignals />
      <PersonaSelector />
      <Roadmap />
      <Checklist />
      <CallToAction />
    </div>
  );
}
