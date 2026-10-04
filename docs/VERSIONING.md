# Versioning & Contribution Workflow

## Branches
- `main`: stable deliverables only.
- `develop`: integration branch for research, curriculum data, visuals and web implementation.
- `feature/*`: optional isolated branches for substantial modules.

## Commit convention
Use Conventional Commit-style prefixes:
- `feat:` new learning/web capability
- `docs:` research or documentation
- `content:` curriculum/taxonomy content
- `style:` visual styling changes
- `fix:` defect correction
- `refactor:` structural change without behavior change
- `chore:` repository/tooling maintenance

## Release flow
1. Work lands on `develop`.
2. Validate content structure, accessibility and visual consistency.
3. Open a Pull Request: `develop → main`.
4. Merge only milestone-ready versions.

## Planned milestones
- v0.1 Repository Foundation
- v0.2 Research & Taxonomy
- v0.3 Curriculum Data Model
- v0.4 Visual Examples
- v0.5 Interactive HTML Prototype
- v1.0 Complete Learning Map
