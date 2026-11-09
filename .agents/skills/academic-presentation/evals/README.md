# Authoring trial cases

Run each case in its own fresh copy of the repository's original four-slide
starter, not in this working tree and not on another case's output. The third
case intentionally targets that starter's slide 3. Copy the same repository
snapshot for with-skill and without-skill runs. No paper files are required;
the paper excerpt is embedded in its prompt.

For the baseline, omit this skill's directory from the copied project and do not
pass its instructions to the author. Resolve symlinks and check all repository
skill roots (`.agents/skills`, `.claude/skills`, and `.opencode/skills`): excluding
one alias is not enough if another contains the same skill. Assert that no copy
of this skill remains in the baseline before launching it. Keep the same
`AGENTS.md` and other project files in both configurations. That compares the
skill's authoring guidance against the same technical foundation, not against a
different repository. Record any isolation deviations explicitly; completed tool
traces can establish non-consultation but are not filesystem isolation.

Root the baseline agent's actual session in that isolated project before it
reads the task, not just its shell commands. Otherwise a parent-scoped skill may
remain discoverable even when the copied files are clean. Audit skill loads in
the completed trace. If the runtime still requires consulting the skill, stop or
exclude the attempt rather than counting it as a no-skill baseline.

These folders contain task prompts and concrete technical/fidelity graders;
results live separately. Visual clarity, appropriate mathematical detail, and
the absence of decorative presentation tropes also need human review rather
than proxy scores such as word counts. Browser-capable tools must be made
available to both configurations for a fair comparison. The `allowed_tools`
settings are the portable skill-creator template; shell-driven headless
Playwright is suitable when browser connector tools are unavailable. If no
browser can run, report that limitation rather than claiming browser checks.

After prompt approval, run with-skill and baseline pairs, draft concrete graders
while they run, capture available timing data without inventing missing metrics,
and generate the skill-creator review viewer. Use a sibling
`academic-presentation-workspace/iteration-N/` results directory outside the
distributed template, so trial decks and review outputs are not copied into new
presentations by `nix flake init`.
