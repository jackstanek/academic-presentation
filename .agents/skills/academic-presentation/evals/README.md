# Authoring trial cases

Run each case in its own fresh copy of the repository's original four-slide
starter, not in this working tree and not on another case's output. The third
case intentionally targets that starter's slide 3. Copy the same repository
snapshot for with-skill and without-skill runs. No paper files are required;
the paper excerpt is embedded in its prompt.

For the baseline, omit this skill's directory from the copied project and do not
pass its instructions to the author. Keep the same `AGENTS.md` and other project
files in both configurations. That compares the skill's authoring guidance
against the same technical foundation, not against a different repository.

These folders currently contain proposed prompts and placeholder graders, not
completed evaluations. Browser-capable tools must be made available to both
configurations for a fair browser-verification comparison. The `allowed_tools`
settings are the portable skill-creator template; if a CLI runner cannot expose
browser tools, report that limitation rather than claiming browser checks.

After prompt approval, run with-skill and baseline pairs, draft concrete graders
while they run, capture available timing data without inventing missing metrics,
and generate the skill-creator review viewer. Use a sibling
`academic-presentation-workspace/iteration-N/` results directory outside the
distributed template, so trial decks and review outputs are not copied into new
presentations by `nix flake init`.
