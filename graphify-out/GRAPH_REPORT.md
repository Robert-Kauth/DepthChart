# Graph Report - uv-deps-upgrade  (2026-10-12)

## Corpus Check
- 196 files · ~34,350 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 59 file(s) not represented in the graph (top: .css 45, (none) 9, .example 1)

## Summary
- 1097 nodes · 2168 edges · 87 communities (70 shown, 17 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 27 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `fa530aa9`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- LiveAvatarUpload.tsx
- useAppDispatch
- react
- servers.ts
- forms/__init__.py
- chats.ts
- Home.tsx
- DepthChart
- csrfFetch
- modal.ts
- models/__init__.py
- add_chat
- message_routes.py
- seeds/__init__.py
- MessageFeed.tsx
- compilerOptions
- src/types.ts
- inject_csrf_token
- SignupForm.tsx
- dependencies
- Friends.tsx
- --update incremental re-extraction
- create_server
- conftest.py
- Step 3 - Extract entities and relationships
- Chat.tsx
- joinServer
- messages.ts
- session.ts
- User
- Project CLAUDE.md graphify section
- Step 4 - Build graph, cluster, analyze, generate outputs
- env.py
- devDependencies
- Step 6 - Obsidian vault + HTML outputs
- useAppSelector
- sqlalchemy
- user_stories_wiki.md
- Part B - Semantic extraction (parallel subagents)
- compilerOptions
- container-test.sh
- / (Home) Page
- MessageThread.tsx
- 20220124_191614_removed_user_message_and_channel_message.py
- Demo User Feature
- Servers.tsx
- user_servers.ts
- users.ts
- NewMessageForm.tsx
- EditServerForm.tsx
- @mdi/js
- sign_up
- hideModal
- messages.py
- LiveEmailValidation.tsx
- flask-login==0.5.0
- flask-socketio==5.1.1
- link_api_endpoints.py
- route
- package.json
- create_channel
- test_app.py
- /graphify
- What You Must Do When Invoked
- store/index.ts
- https_redirect
- user_routes.py
- graphify reference: extra exports and benchmark
- react_root
- csrf_error
- graphify reference: query, path, explain
- username_exists
- graphify reference: add a URL and watch a folder
- graphify reference: commit hook and native CLAUDE.md integration
- graphify reference: incremental update and cluster-only
- user_exists
- graphify reference: GitHub clone and cross-repo merge
- graphify reference: transcribe video and audio
- CLAUDE.md
- .claude/CLAUDE.md
- extraction-spec.md
- depthchart

## God Nodes (most connected - your core abstractions)
1. `useAppDispatch` - 53 edges
2. `useAppSelector` - 45 edges
3. `csrfFetch()` - 44 edges
4. `react` - 36 edges
5. `User` - 25 edges
6. `hideModal()` - 21 edges
7. `/graphify` - 19 edges
8. `User` - 16 edges
9. `compilerOptions` - 16 edges
10. `@mdi/js` - 14 edges

## Surprising Connections (you probably didn't know these)
- `test_login_with_legacy_password_hash()` --calls--> `User`  [EXTRACTED]
  tests/test_auth.py → app/models/user.py
- `Open Graph Metadata` --references--> `DepthChart`  [INFERRED]
  frontend/index.html → README.md
- `boto3==1.20.7 (S3 asset storage)` --conceptually_related_to--> `Depthchart Overview`  [INFERRED]
  requirements.txt → README.md
- `psycopg2-binary==2.8.6` --shares_data_with--> `Backend Stack (Python, Flask, PostgreSQL, SQLAlchemy)`  [INFERRED]
  dev-requirements.txt → README.md
- `flask==2.0.1` --shares_data_with--> `Backend Stack (Python, Flask, PostgreSQL, SQLAlchemy)`  [INFERRED]
  requirements.txt → README.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Anti-hallucination / grounding design pattern in graphify** — claude_skills_graphify_skill_honesty_rules, claude_skills_graphify_references_query_vocab_expansion, claude_skills_graphify_references_query_answer_grounding [INFERRED 0.75]
- **Unauthenticated Entry Point Pages** — user_stories_wiki_signup_route, user_stories_wiki_login_route, user_stories_wiki_demo_user_feature [INFERRED 0.75]
- **DepthChart Heroku deployment pipeline** — github_workflows_main_heroku_deploy_workflow, readme_depthchart_heroku_app [INFERRED 0.85]
- **Resource CRUD User Story Pattern** — user_stories_wiki_servers_crud_user_stories, user_stories_wiki_channels_crud_user_stories, user_stories_wiki_messages_crud_user_stories, user_stories_wiki_chat_crud_user_stories [INFERRED 0.85]
- **Vite frontend bootstrap (index.html -> #root <- main.tsx)** — frontend_index_html, frontend_index_root, frontend_src_main, frontend_public_reset [INFERRED 0.85]

## Communities (87 total, 17 thin omitted)

### Community 0 - "LiveAvatarUpload.tsx"
Cohesion: 0.23
Nodes (12): frontend_src_components_formik_formik_module, Button, StyledIcon, LiveUsernameValidation(), validateLoginUsername(), validateSingupUsername(), MultiSelect(), FieldProps (+4 more)

### Community 1 - "useAppDispatch"
Cohesion: 0.17
Nodes (12): App(), frontend_src_app_module, Footer(), frontend_src_components_footer_footer_module, Home(), Modal(), frontend_src_components_modal_modal_module, SignupForm() (+4 more)

### Community 2 - "react"
Cohesion: 0.43
Nodes (4): useFocus(), useLocalStorage(), useToggle(), react

### Community 3 - "servers.ts"
Cohesion: 0.16
Nodes (14): CreateServerForm(), frontend_src_components_createserverform_createserverform_module, create(), createServer(), edit(), initialState, load(), loadOne() (+6 more)

### Community 4 - "forms/__init__.py"
Cohesion: 0.14
Nodes (18): ChannelForm, FlaskForm, ChatForm, FlaskForm, FollowForm, FlaskForm, LoginForm, FlaskForm (+10 more)

### Community 5 - "chats.ts"
Cohesion: 0.17
Nodes (15): add(), addChat(), ChatAction, ChatsState, destroy(), destroyChat(), edit(), editChat() (+7 more)

### Community 6 - "Home.tsx"
Cohesion: 0.31
Nodes (5): frontend_src_components_home_home_module, Main(), MainProps, frontend_src_components_main_main_module, Servers()

### Community 7 - "DepthChart"
Cohesion: 0.07
Nodes (31): psycopg2-binary==2.8.6, Vite index.html entry, Open Graph Metadata, #root mount div, Vite + React + TS entry point, reset.css, Heroku Container Registry (depthchart app), Push Container to Heroku workflow (+23 more)

### Community 9 - "csrfFetch"
Cohesion: 0.18
Nodes (16): ChannelAction, ChannelEdit, destroy(), destroyChannel(), edit(), editChannel(), initialState, load() (+8 more)

### Community 10 - "modal.ts"
Cohesion: 0.25
Nodes (9): Chat(), ChatButton(), frontend_src_components_chatbutton_chatbutton_module, frontend_src_components_nav_navbar_module, NavBar(), ModalAction, ModalState, setCurrentModal() (+1 more)

### Community 11 - "models/__init__.py"
Cohesion: 0.12
Nodes (15): load_user(), Channel, Chat, Server, User_server, datetime, email_validator, flask (+7 more)

### Community 12 - "add_chat"
Cohesion: 0.12
Nodes (20): DELETE /api/chats/{id}, GET /api/chats/{chat_id}, GET /api/chats/test, GET /api/chats/users/{user_id}, POST /api/chats/new, add_chat(), delete_chat(), load_chat() (+12 more)

### Community 13 - "message_routes.py"
Cohesion: 0.13
Nodes (22): GET /api/messages/channel/{channel_id}, GET /api/messages/{message_id}, GET /api/messages/test, GET /api/messages/users/DM/{user1_id}/{user2_id}, GET /api/messages/users/{user_id}, POST /api/messages/, create_message(), load_channel_messages() (+14 more)

### Community 14 - "seeds/__init__.py"
Cohesion: 0.21
Nodes (16): seed_channels(), undo_channels(), seed(), undo(), undo_channel_messages(), undo_user_messages(), seed_servers(), undo_servers() (+8 more)

### Community 15 - "MessageFeed.tsx"
Cohesion: 0.24
Nodes (8): MessageFeed(), frontend_src_components_messagefeed_messagefeed_module, MessageFeedCard(), frontend_src_components_messagefeedcard_messagefeedcard_module, MessagesState, UsersState, ById, Message

### Community 16 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, allowSyntheticDefaultImports, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx, lib (+10 more)

### Community 17 - "src/types.ts"
Cohesion: 0.14
Nodes (15): Avatar(), frontend_src_components_avatar_avatar_module, FeedTitleBar(), FeedTitleBarProps, frontend_src_components_feedtitlebar_feedtitlebar_module, FollowButton(), frontend_src_components_followbutton_followbutton_module, frontend_src_components_friendcard_friendcard_module (+7 more)

### Community 18 - "inject_csrf_token"
Cohesion: 0.50
Nodes (4): after_request, inject_csrf_token(), Injects csrf_token into response and sets CORS options in production, Injects csrf_token into response. The frontend reads it (so it is not httponly)…

### Community 19 - "SignupForm.tsx"
Cohesion: 0.18
Nodes (11): ProtectedRoute(), frontend_src_components_formik_index_liveemailvalidation, frontend_src_components_formik_index_liveusernamevalidation, frontend_src_components_formik_index_textinput, isValidUrl(), LiveAvatarUpload(), TextInput(), frontend_src_components_login_loginform_module (+3 more)

### Community 20 - "dependencies"
Cohesion: 0.12
Nodes (16): dependencies, formik, @mdi/js, @mdi/react, react, react-dom, react-icons, react-redux (+8 more)

### Community 21 - "Friends.tsx"
Cohesion: 0.22
Nodes (8): FriendCard(), Friends(), frontend_src_components_friends_friends_module, frontend_src_components_title_title_module, Title(), TitleProps, loadAll(), loadUsers()

### Community 22 - "--update incremental re-extraction"
Cohesion: 0.33
Nodes (5): graphify hook install (post-commit hook), --cluster-only, --update incremental re-extraction, graphify.detect.save_manifest(), Step 9 - Save manifest, update cost tracker, clean up

### Community 23 - "create_server"
Cohesion: 0.18
Nodes (15): DELETE /api/servers/{id}, GET /api/servers/, GET /api/servers/{id}, POST /api/servers/, PUT /api/servers/{id}, create_server(), destroyServer(), editServer() (+7 more)

### Community 24 - "conftest.py"
Cohesion: 0.05
Nodes (24): flask_testing, FlaskClient, pytest, app(), BrowserClient, channel(), client(), other_user() (+16 more)

### Community 25 - "Step 3 - Extract entities and relationships"
Cohesion: 0.25
Nodes (6): Video/audio transcription flow, Part A - Structural extraction for code files, Part C - Merge AST + semantic into final extraction, Step 2.5 - Video and audio, Part A - Structural (AST) extraction, Step 3 - Extract entities and relationships

### Community 26 - "Chat.tsx"
Cohesion: 0.17
Nodes (10): frontend_src_components_chat_chat_module, SocketChat, CreateChannelForm(), frontend_src_components_createchannelform_createchannelform_module, Errors(), frontend_src_components_errors_errors_module, create(), createChannel() (+2 more)

### Community 27 - "joinServer"
Cohesion: 0.25
Nodes (11): DELETE /api/user_servers/{server_id}, GET /api/user_servers/{user_id}, POST /api/user_servers/join, delete_user_server(), joinServer(), loadServerUsers(), loadUserServers(), login_required (+3 more)

### Community 29 - "messages.ts"
Cohesion: 0.15
Nodes (16): Messages(), frontend_src_components_messages_messages_module, NewMessageForm(), destroy(), destroyMessage(), edit(), editMessage(), initialState (+8 more)

### Community 30 - "session.ts"
Cohesion: 0.17
Nodes (14): LoginForm(), AppThunk, authenticate(), createSession(), demoLogin(), destroySession(), login(), LoginInfo (+6 more)

### Community 31 - "User"
Cohesion: 0.16
Nodes (3): User, setter, UserMixin

### Community 32 - "Project CLAUDE.md graphify section"
Cohesion: 0.27
Nodes (10): Project CLAUDE.md graphify section, graphify claude install (CLAUDE.md integration), Answer only from graph contents - no hallucination, graphify explain command, graphify path command, graphify query command + vocab expansion, graphify save-result / work-memory feedback loop, Constrained query expansion step (+2 more)

### Community 33 - "Step 4 - Build graph, cluster, analyze, generate outputs"
Cohesion: 0.31
Nodes (6): GRAPH_REPORT.md output, graphify.export.to_json(), graphify.report.generate(), Step 4.5 - Graph health check, Step 4 - Build graph, cluster, analyze, generate outputs, Step 5 - Label communities

### Community 34 - "env.py"
Cohesion: 0.20
Nodes (8): logging, logging_config, Run migrations in 'offline' mode. This configures the context with just a URL…, Run migrations in 'offline' mode. This configures the context with just a URL…, Run migrations in 'online' mode. In this scenario we need to create an Engine…, Run migrations in 'online' mode. In this scenario we need to create an Engine…, run_migrations_offline(), run_migrations_online()

### Community 35 - "devDependencies"
Cohesion: 0.22
Nodes (9): devDependencies, @types/react, @types/react-dom, @types/react-router-dom, @types/redux-logger, @types/styled-components, typescript, vite (+1 more)

### Community 36 - "Step 6 - Obsidian vault + HTML outputs"
Cohesion: 0.25
Nodes (8): graphify benchmark - token reduction, graphify export falkordb / --falkordb-push, graphify.serve MCP stdio server, graphify export neo4j / --neo4j-push, graphify export svg/graphml, graphify export wiki, Step 6 - Obsidian vault + HTML outputs, graphify-out/wiki/index.md

### Community 37 - "useAppSelector"
Cohesion: 0.18
Nodes (12): ChannelCard(), frontend_src_components_channelcard_channelcard_module, ChannelFeed(), Channels(), frontend_src_components_channels_channels_module, MessageCard(), frontend_src_components_messagecard_messagecard_module, frontend_src_components_server_server_module (+4 more)

### Community 39 - "user_stories_wiki.md"
Cohesion: 0.08
Nodes (25): Channels, Chat, Create Channels, Create Chat, Create Messages, Creating Servers, Delete Channel, Delete Chats (+17 more)

### Community 40 - "Part B - Semantic extraction (parallel subagents)"
Cohesion: 0.29
Nodes (5): Confidence score rubric, Node ID format rule, Extraction subagent prompt/schema, Gemini semantic extraction backend, Part B - Semantic extraction (parallel subagents)

### Community 41 - "compilerOptions"
Cohesion: 0.29
Nodes (6): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, include

### Community 43 - "/ (Home) Page"
Cohesion: 0.73
Nodes (6): Channels CRUD User Stories, Chat CRUD User Stories, / (Home) Page, Messages CRUD User Stories, /servers/:serverId Page, Servers CRUD User Stories

### Community 46 - "Demo User Feature"
Cohesion: 0.83
Nodes (4): Demo User Feature, /login Page, /signup Page, Users User Stories

### Community 47 - "Servers.tsx"
Cohesion: 0.18
Nodes (10): frontend_src_components_servers_servers_module, frontend_src_components_servertile_servertile_module, ServerTile(), Button, frontend_src_components_styledcomponents_styledbutton_styledbutton_module, StyledButton(), StyledButtonProps, StyledIcon (+2 more)

### Community 48 - "user_servers.ts"
Cohesion: 0.19
Nodes (13): add(), addUserServer(), destroy(), destroyUserServer(), get(), getUserServers(), initialState, load() (+5 more)

### Community 49 - "users.ts"
Cohesion: 0.23
Nodes (10): ChannelMessages(), frontend_src_components_channelmessages_channelmessages_module, destroyOne(), destroyUser(), initialState, loadOne(), loadUser(), upload() (+2 more)

### Community 50 - "NewMessageForm.tsx"
Cohesion: 0.19
Nodes (10): Button, CreateMessageBar(), CreateMessageBarProps, frontend_src_components_createmessagebar_createmessagebar_module, StyledIcon, Button, frontend_src_components_newmessageform_newmessageform_module, StyledIcon (+2 more)

### Community 51 - "EditServerForm.tsx"
Cohesion: 0.22
Nodes (9): Button, EditServerForm(), frontend_src_components_editserverform_editserverform_module, StyledIcon, frontend_src_components_serverdeletebutton_serverdeletebutton_module, ServerDeleteButton(), destroy(), destroyServer() (+1 more)

### Community 52 - "@mdi/js"
Cohesion: 0.20
Nodes (9): ErrorIcon, frontend_src_components_styledcomponents_stylederror_stylederror_module, StyledErrorMessage, CustomIcon, frontend_src_components_styledcomponents_styledicon_styledicon_module, @mdi/js, @mdi/react, react-icons (+1 more)

### Community 53 - "sign_up"
Cohesion: 0.22
Nodes (9): POST /api/auth/login, POST /api/auth/signup, login(), Creates a new user and logs them in, Creates a new user and logs them in, Creates a new user and logs them in, Simple function that turns the WTForms validation errors into a simple list, sign_up() (+1 more)

### Community 54 - "hideModal"
Cohesion: 0.39
Nodes (5): DeleteChannelButton(), frontend_src_components_deletechannelbutton_deletechannelbutton_module, EditChannelForm(), frontend_src_components_editchannelform_editchannelform_module, hideModal()

### Community 55 - "messages.py"
Cohesion: 0.38
Nodes (5): Message, Seeds channel_messages, Seeds channel_messages, seed_channel_messages(), seed_user_messages()

### Community 56 - "LiveEmailValidation.tsx"
Cohesion: 0.73
Nodes (3): LiveEmailValidation(), validateLoginEmail(), validateSignupEmail()

### Community 60 - "link_api_endpoints.py"
Cohesion: 0.12
Nodes (19): collections, json, pathlib, re, backend_sites(), display(), fetch_span(), frontend_sites() (+11 more)

### Community 61 - "route"
Cohesion: 0.06
Nodes (32): GET /api/auth/, GET /api/auth/logout, GET /api/auth/unauthorized, GET /api/auth/validate_login_email/{email}, GET /api/auth/validate_login_username/{username}, GET /api/auth/validate_signup_email/{email}, GET /api/auth/validate_signup_username/{username}, authenticate() (+24 more)

### Community 62 - "package.json"
Cohesion: 0.09
Nodes (22): name, @types/react, packageManager, pnpm, overrides, private, scripts, build (+14 more)

### Community 63 - "create_channel"
Cohesion: 0.18
Nodes (15): DELETE /api/channels/{id}, GET /api/channels/, GET /api/channels/{id}, POST /api/channels/, PUT /api/channels/{id}, create_channel(), destroyChannel(), editChannel() (+7 more)

### Community 64 - "test_app.py"
Cohesion: 0.25
Nodes (3): subprocess, run_flask(), test_migrations_upgrade_to_head()

### Community 65 - "/graphify"
Cohesion: 0.15
Nodes (12): /graphify Trigger Instruction, /graphify add <url>, --watch background watcher, graphify.watch module, For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only (+4 more)

### Community 66 - "What You Must Do When Invoked"
Cohesion: 0.17
Nodes (12): graphify clone <url>, graphify merge-graphs, Step 0 - GitHub repos and multi-path merge, Step 0 - GitHub repos and multi-path merge (only if a URL or several paths), Step 1 - Ensure graphify is installed, Step 2.5 - Video and audio (only if video files detected), Step 2 - Detect files, Step 4.5 - Graph health check (read-only integrity gate) (+4 more)

### Community 67 - "store/index.ts"
Cohesion: 0.14
Nodes (18): frontend_src_index, Root(), store, Window, AppDispatch, AppStore, configureStore(), MODAL_ACTIONS (+10 more)

### Community 68 - "https_redirect"
Cohesion: 0.50
Nodes (4): https_redirect(), Changes request made in production from http to https, Changes request made in production from http to https, before_request

### Community 69 - "user_routes.py"
Cohesion: 0.07
Nodes (36): DELETE /api/users/{id}, GET /api/users/, GET /api/users/{id}, POST /api/users/follow/{user_id}, POST /api/users/{id}, POST /api/users/unfollow/{user_id}, SOCKET chat, SOCKET join (+28 more)

### Community 70 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 72 - "react_root"
Cohesion: 0.50
Nodes (4): route, Sends favicon if requested and react app otherwise, Sends favicon if requested and react app otherwise, react_root()

### Community 73 - "csrf_error"
Cohesion: 0.67
Nodes (3): csrf_error(), Returns CSRF failures as JSON errors like the API's form errors, errorhandler

### Community 74 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 75 - "username_exists"
Cohesion: 0.67
Nodes (3): Checks if username already exists in database, Checks if username already exists in database, username_exists()

### Community 76 - "graphify reference: add a URL and watch a folder"
Cohesion: 0.50
Nodes (3): For /graphify add, For --watch, graphify reference: add a URL and watch a folder

### Community 77 - "graphify reference: commit hook and native CLAUDE.md integration"
Cohesion: 0.50
Nodes (3): For git commit hook, For native CLAUDE.md integration, graphify reference: commit hook and native CLAUDE.md integration

### Community 78 - "graphify reference: incremental update and cluster-only"
Cohesion: 0.50
Nodes (3): For --cluster-only, For --update (incremental re-extraction), graphify reference: incremental update and cluster-only

### Community 79 - "user_exists"
Cohesion: 0.67
Nodes (3): Checks if user email already exists in database, Checks if user email already exists in database, user_exists()

## Knowledge Gaps
- **226 isolated node(s):** `name`, `private`, `version`, `type`, `packageManager` (+221 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 491 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `LiveAvatarUpload.tsx`, `useAppDispatch`, `servers.ts`, `Home.tsx`, `modal.ts`, `src/types.ts`, `SignupForm.tsx`, `Friends.tsx`, `Chat.tsx`, `messages.ts`, `useAppSelector`, `Servers.tsx`, `users.ts`, `NewMessageForm.tsx`, `EditServerForm.tsx`, `hideModal`, `LiveEmailValidation.tsx`, `package.json`, `store/index.ts`?**
  _High betweenness centrality (0.034) - this node is a cross-community bridge._
- **Why does `User` connect `User` to `test_app.py`, `forms/__init__.py`, `user_routes.py`, `models/__init__.py`, `message_routes.py`, `seeds/__init__.py`, `sign_up`, `conftest.py`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **Why does `csrfFetch()` connect `csrfFetch` to `servers.ts`, `useAppSelector`, `chats.ts`, `user_servers.ts`, `users.ts`, `NewMessageForm.tsx`, `EditServerForm.tsx`, `Friends.tsx`, `Chat.tsx`, `messages.ts`, `session.ts`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _226 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `forms/__init__.py` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._
- **Should `DepthChart` be split into smaller, more focused modules?**
  _Cohesion score 0.07459677419354839 - nodes in this community are weakly interconnected._
- **Should `models/__init__.py` be split into smaller, more focused modules?**
  _Cohesion score 0.12436974789915967 - nodes in this community are weakly interconnected._