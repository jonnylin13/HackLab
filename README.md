# HackLab

## Check out the [live demo](https://hacklab4humanity.github.io)!

If the demo hangs when you submit a lab, it's because the free Heroku instance is being woken up! Please be patient.
## Inspiration

Programming can be a difficult field to enter, but it's extremely rewarding as you continue to grow. Lowering the barrier of entry by reducing possible overhead frustration can help push early-learners to continue. Underprivileged schools also don't have IT to set up development environments for students, and so web-application based IDEs can offer a direct solution.

## What it does

Allows instructors (or anyone) to host a "lab" on our web application. They can stub out test cases, then generate a short ID which students can use to join. Some use cases could be a teacher gauging the knowledge of the class by posing a question, or perhaps a daily coding question before class begins.

The teacher's dashboard after posting the lab will continually update with the number of connected students, to see who is still connected. In the future, I plan on adding metrics that the teacher can visualize.

## How I built it

- Backend is built with a normal HTTP server, and websockets to push events to the admin/instructor dashboard. Requests are authorized by the server, which signs initial requests and returns the signed tokens to be checked in the future (using JWT protocol). It's now 5 AM and I have no time to deploy anywhere else, so I went with Heroku
- Frontend is built with Angular, the code editor is VS Code's _Monaco Editor_. I deployed the static webpages to a GitHub pages repository.

## Challenges I ran into

- Getting the Angular application to route correctly without any gateway/nginx/apache configuration on Github Pages was pretty creative, had to use a fake 404.html to route endpoints to the base index
- I wasn't able to sandbox the code evaluation, and so all of that is done on the client and is therefore invalid. You can send the server any code eval results, and the server must believe you. 

## Accomplishments that I'm proud of

Actually completing a working MVP and deploying it!

## What I learned

Isn't so much what I've learned this time in particular, but that I'm improving in my ability to foresee the scope of a problem and gauge my own ability in achieving a solution.

## What's next for HackLab

- A leaderboard feature that ranks students based on their best runtime and success ratio
- Server-side sandboxed code evaluation
- Hidden test cases (assertions that the student cannot see)
