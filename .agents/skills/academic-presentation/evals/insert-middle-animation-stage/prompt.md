---
tags: [skill-creator]
max_turns: 40
timeout_seconds: 1200
allowed_tools: [Read, Glob, Grep, Skill, Write, Edit, Bash]
---

On slide 3, the evaluation animation, insert a stage between substitution and
computation. After the marker reaches “2 + 1”, the next advance should reveal an
arrow from that box to the “3” box, but leave the marker at “2 + 1” and leave the
result box unhighlighted. The following advance should perform the existing
computation animation. Back should undo those stages separately. Keep the other
slides, existing notes, and slide URLs unchanged. Build and check the change in a
browser, including a reload directly into the new middle stage.
