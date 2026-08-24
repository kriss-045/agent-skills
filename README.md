# Agent Skills

Agent Skills are folders of markdown instructions that give an AI agent (like Claude) a repeatable way to do a specific kind of work: what to ask, what order to do things in, what reference material to pull in, and what the finished output should look like.

This repo holds the skills Kriss Patel actually runs day to day.

## Categories

- **skill-craft**: Building and judging Agent Skills themselves.
- **writing**: Voice, drafting, and de-slopping prose.
- **knowledge**: Research ingestion and reviewing a system over time.
- **career**: Job-search deliverables, resumes and case studies.

A browsable version with file previews is at https://www.krisspatel.com/skill-repo.

## Using a skill

Drop the skill's folder into `~/.claude/skills/` (create that folder if it does not exist), for example:

```
cp -R skills/skill-builder ~/.claude/skills/skill-builder
```

Claude Code picks up skills placed there automatically.
