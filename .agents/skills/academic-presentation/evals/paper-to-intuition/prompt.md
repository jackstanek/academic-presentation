---
tags: [skill-creator]
max_turns: 40
timeout_seconds: 1200
allowed_tools: [Read, Glob, Grep, Skill, Write, Edit, Bash]
---

Turn this draft excerpt into four slides for a mixed systems seminar. I want to
explain the intuition, not walk through the notation. Start from the template in
this repository and verify the result in a browser. Don't write speaker notes or
references; I'll handle those.

Draft excerpt: We assign each key to a worker by hashing the pair (key, worker)
and taking the worker with the highest score. For a key k and active worker set
W, this is a(k,W) = argmax over w in W of h(k,w). A deterministic hash makes the
assignment reproducible. Removing a worker reassigns only keys previously owned
by that worker; keys owned by the remaining workers keep their assignments.
This locality property does not imply perfect balance for a small number of
keys. The paper also defines the assignment matrix A_kw = 1[a(k,W)=w], expected
load E[L_w] = n/|W| under idealized uniform independent scores, and a load variance
bound, whose proof is omitted here. We have not yet run experiments.

Show a concrete set of keys and three workers, then remove one worker. Make the
unchanged assignments easy to distinguish from the reassigned ones. Use no math
unless it helps the audience understand this example.
